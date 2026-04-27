import requests
import json

url = "http://localhost:8000/analyze"

# Test Case 1: Official Source (Should be APPROVED)
payload_official = {
    "content": "Official match highlight of Goal by Player X in League Y.",
    "is_image": "false",
    "league_id": "LIGA_001",
    "event_type": "Match Highlight",
    "original_source": "Official"
}

# Test Case 2: Unauthorized Source (Should be REJECTED)
payload_unauthorized = {
    "content": "Leaked locker room footage from Match Z.",
    "is_image": "false",
    "league_id": "LIGA_001",
    "event_type": "BTS",
    "original_source": "Unknown_Twitter_User"
}

def test_analyze(payload, label):
    print(f"\n--- Testing: {label} ---")
    try:
        # Send as form data
        files = {'file': (None, '')}
        response = requests.post(url, data=payload, files=files)
        print(f"Status: {response.status_code}")
        print(json.dumps(response.json(), indent=2))
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_analyze(payload_official, "Official Source")
    test_analyze(payload_unauthorized, "Unauthorized Source")
