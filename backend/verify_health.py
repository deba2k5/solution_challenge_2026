import os
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from algosdk.v2client import algod
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

async def verify_mongodb():
    print("\n--- Verifying MongoDB ---")
    uri = os.getenv("MONGODB_URI")
    if not uri:
        print("[!] MONGODB_URI not found in .env")
        return
    
    try:
        client = AsyncIOMotorClient(uri)
        # Force a connection check
        await client.admin.command('ping')
        print("[OK] MongoDB Connection Successful")
        
        db = client["aegisnet_x"]
        count = await db["assets"].count_documents({})
        print(f"[DATA] Document count in 'assets': {count}")
    except Exception as e:
        print(f"[ERR] MongoDB Error: {e}")

def verify_algorand():
    print("\n--- Verifying Algorand ---")
    address = os.getenv("ALGOD_ADDRESS")
    token = os.getenv("ALGOD_TOKEN", "")
    
    if not address:
        print("[!] ALGOD_ADDRESS not found in .env")
        return
        
    try:
        client = algod.AlgodClient(token, address)
        status = client.status()
        print(f"[OK] Algorand Node Connection Successful")
        print(f"[INFO] Last round: {status.get('last-round')}")
    except Exception as e:
        print(f"[ERR] Algorand Error: {e}")

if __name__ == "__main__":
    asyncio.run(verify_mongodb())
    verify_algorand()
