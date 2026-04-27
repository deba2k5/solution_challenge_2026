import os
import hashlib
import json
from datetime import datetime
from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

from agents.watchtower import WatchtowerAgent
from agents.auditor import AuditorAgent
from agents.treasurer import TreasurerAgent

load_dotenv()

app = FastAPI(title="AegisNet-X API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize MongoDB
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
mongo_client = AsyncIOMotorClient(MONGODB_URI)
db = mongo_client["aegisnet_x"]
assets_collection = db["assets"]

# Initialize Agents
watchtower = WatchtowerAgent()
auditor = AuditorAgent()
treasurer = TreasurerAgent()

class AssetRequest(BaseModel):
    content: str
    is_image: bool = False
    league_id: Optional[str] = "N/A"
    event_type: Optional[str] = "General"
    original_source: Optional[str] = "Unknown"

@app.get("/")
def read_root():
    return {"message": "Welcome to AegisNet-X: Digital Asset Protection Framework"}

@app.post("/analyze")
async def analyze_asset(
    content: str = Form(...),
    is_image: bool = Form(False),
    league_id: str = Form("N/A"),
    event_type: str = Form("General"),
    original_source: str = Form("Unknown"),
    file: Optional[UploadFile] = File(None)
):
    """
    Orchestration Flow:
    1. Receive Asset
    2. Watchtower Analyzes
    3. Auditor Validates
    4. Orchestrator Decides
    5. Treasurer Registers (if approved)
    """
    asset_content = ""
    is_image = False
    
    if file:
        file_bytes = await file.read()
        asset_hash = hashlib.sha256(file_bytes).hexdigest()
        asset_content = f"Filename: {file.filename}, Hash: {asset_hash}, Type: {file.content_type}"
        is_image = file.content_type.startswith("image/")
    elif content:
        asset_hash = hashlib.sha256(content.encode()).hexdigest()
        asset_content = content
    else:
        raise HTTPException(status_code=400, detail="No asset provided")

    # 1. Watchtower Analysis
    context = f"League: {league_id}, Event: {event_type}, Source: {original_source}"
    full_content = f"{asset_content} | Context: {context}"
    
    wt_result_str = watchtower.analyze_asset(full_content, is_image)
    wt_result = json.loads(wt_result_str)

    # 2. Auditor Validation
    auditor_result_str = auditor.validate_analysis(wt_result_str)
    auditor_result = json.loads(auditor_result_str)

    # 3. Decision Logic (Advanced Provenance Scoring)
    # Weights: Authenticity (40%), Auditor Consensus (40%), Source Verification (20%)
    source_trust = 1.0 if original_source.lower() in ["official", "partner", "verified"] else 0.5
    
    trust_score = (wt_result.get("authenticity_score", 0) * 0.4 + 
                   auditor_result.get("verified_score", 0) * 0.4 + 
                   source_trust * 0.2)
    
    status = "REJECTED"
    blockchain_receipt = None

    if trust_score > 0.65 and auditor_result.get("status") == "verified":
        status = "APPROVED"
        # 4. Treasurer Registration (Minting NFT)
        # Use filename or league/event as asset name
        asset_name = file.filename if file else f"AEGIS-{asset_hash[:8]}"
        asset_unit = league_id[:8].upper() if league_id != "N/A" else "AEGIS"
        
        blockchain_receipt = treasurer.register_asset_on_chain(asset_name, asset_unit, {
            "trust_score": round(trust_score, 4),
            "league_id": league_id,
            "event_type": event_type,
            "asset_hash": asset_hash
        })

    # Save record to MongoDB
    record = {
        "asset_hash": asset_hash,
        "league_id": league_id,
        "event_type": event_type,
        "trust_score": round(trust_score, 4),
        "status": status,
        "watchtower": wt_result,
        "auditor": auditor_result,
        "blockchain": blockchain_receipt,
        "timestamp": datetime.utcnow().isoformat()
    }
    
    try:
        await assets_collection.insert_one(record)
    except Exception as e:
        print(f"Failed to save to MongoDB: {e}")

    # Remove the MongoDB _id from the response
    record.pop("_id", None)
    return record

@app.get("/assets")
async def get_assets():
    """
    Returns all protected assets from the database.
    """
    cursor = assets_collection.find().sort("timestamp", -1)
    assets = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        assets.append(doc)
    return assets

@app.get("/blockchain/status")
async def blockchain_status():
    """
    Returns live Algorand wallet + node status.
    """
    return treasurer.get_status()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
