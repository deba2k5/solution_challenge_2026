import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

class WatchtowerAgent:
    def __init__(self):
        self.client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        self.model = "llama-3.1-8b-instant"

    def analyze_asset(self, content: str, is_image: bool = False):
        """
        Analyzes the asset for sports media authenticity, broadcast overlays, and digital fingerprinting.
        """
        prompt = f"""
        Analyze the following SPORTS MEDIA asset for authenticity and provenance.
        
        Asset Data: {content}
        Is Visual Media: {is_image}

        Forensic Checklist:
        1. Look for unauthorized removal of official broadcast watermarks.
        2. Check for inconsistent overlays or logo tampering.
        3. Identify if the metadata suggests a "leaked" or unauthorized source.
        4. Evaluate if the content matches known official broadcast patterns.

        Provide a JSON response with the following fields:
        - authenticity_score (0.0 to 1.0)
        - tamper_flag (boolean)
        - violation_type (string: 'None', 'Logo Tamper', 'Watermark Removal', 'Unauthorized Source')
        - reasoning (string)
        """

        try:
            chat_completion = self.client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": "You are AegisNet-X Sports Watchtower, a digital forensic expert specializing in sports media rights and broadcast authenticity. ALWAYS return valid JSON."
                    },
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ],
                model=self.model,
                response_format={"type": "json_object"}
            )
            content = chat_completion.choices[0].message.content
            # Basic validation to ensure it's JSON
            import json
            json.loads(content)
            return content
        except Exception as e:
            import json
            return json.dumps({
                "authenticity_score": 0.0,
                "tamper_flag": True,
                "violation_type": "Analysis Error",
                "reasoning": f"Forensic engine failed: {str(e)}"
            })
