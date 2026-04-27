# AegisNet-X Backend (AlgoKit Structure)

This backend is organized according to the **AlgoKit Project Structure** to ensure scalability and compatibility with Algorand development tools.

## Directory Structure

- `agents/`: Multi-agent AI orchestration logic.
  - `watchtower.py`: AI Forensic Analysis (Llama 4 Scout via Groq).
  - `auditor.py`: Validation and Consensus logic.
  - `treasurer.py`: Algorand transaction and registration logic.
- `smart_contracts/`: Algorand Smart Contracts (PyTeal/TEAL).
  - `aegis_net_x/`: Core contract for asset provenance.
- `scripts/`: Deployment and management scripts.
- `tests/`: Automated tests for agents and contracts.
- `utils/`: Common utility functions.
- `main.py`: FastAPI entry point and Orchestrator engine.
- `.env`: Environment variables (API keys, Wallet addresses).
- `requirements.txt`: Python dependencies.

## Setup

1. Install dependencies: `pip install -r requirements.txt`
2. Configure `.env` with your `GROQ_API_KEY` and `ALGORAND_WALLET_ADDRESS`.
3. Run the orchestrator: `python main.py`

## Features

- **Agentic Orchestration**: Automated workflow between forensic, auditor, and treasurer agents.
- **On-Chain Provenance**: Asset hashes are recorded on the Algorand Testnet.
- **Neo-Brutalist UI**: Premium, high-contrast dashboard for real-time monitoring.
