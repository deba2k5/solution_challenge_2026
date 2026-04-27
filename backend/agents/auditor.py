import os
from groq import Groq
from dotenv import load_dotenv
import json

load_dotenv()

class AuditorAgent:
    def __init__(self):
        self.client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        self.model = "llama-3.1-8b-instant"

    def validate_analysis(self, watchtower_output: str):
        """
        Validates the Watchtower's findings against Official Sports Broadcast Rights guidelines.
        """
        prompt = f"""
        As the Chief Sports Rights Auditor, review the forensic analysis provided by the Watchtower.
        
        Watchtower Forensic Data: {watchtower_output}

        Audit Objectives:
        1. Confirm if the 'violation_type' identified is consistent with official broadcast rights.
        2. Evaluate the confidence of the authenticity score.
        3. Flag any potential "Fair Use" edge cases (e.g., short news snippets vs. full match piracy).
        4. Provide a final consensus on whether to register this asset on the blockchain.

        Provide a JSON response with:
        - verified_score (0.0 to 1.0)
        - confidence (0.0 to 1.0)
        - status (verified/flagged)
        - auditor_notes (detailed reasoning for the decision)
        """

        try:
            chat_completion = self.client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": "You are AegisNet-X Sports Rights Auditor, an expert in global sports media licensing and intellectual property protection."
                    },
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ],
                model=self.model,
                response_format={"type": "json_object"}
            )
            return chat_completion.choices[0].message.content
        except Exception as e:
            return json.dumps({
                "error": str(e),
                "verified_score": 0.0,
                "confidence": 0.0,
                "status": "flagged",
                "auditor_notes": "Validation failed."
            })
