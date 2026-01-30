# Almadar Python Shell

FastAPI server backend for Almadar applications with PyTorch support.

## Overview

The Python shell provides a server-side implementation of the Almadar execution model. It processes events from the React client, executes server-side effects (fetch, persist, call_service, PyTorch operations), and returns responses with data and client effects.

## Architecture

```
React Client (TypeScript)     Python Server (FastAPI)
       │                              │
       │  POST /api/{orbital}/{event} │
       │─────────────────────────────▶│
       │  Authorization: Bearer <token>│
       │                              │ 1. Verify Firebase token (@user)
       │                              │ 2. Evaluate guard
       │                              │ 3. Execute server effects
       │                              │    - fetch (query DB)
       │                              │    - persist (write DB)
       │                              │    - PyTorch ops (NN inference)
       │◀─────────────────────────────│
       │  { data, clientEffects }     │
       │                              │
       │ 4. Execute clientEffects     │
       │    - render_ui               │
       │    - navigate                │
       │    - notify                  │
```

## Quick Start

### Local Development

1. **Create virtual environment:**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -e ".[dev]"
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run the server:**
   ```bash
   python -m orbital_app.main
   # Or with uvicorn directly:
   uvicorn orbital_app.main:app --reload --port 8000
   ```

5. **Access the API:**
   - Health check: http://localhost:8000/health
   - API docs: http://localhost:8000/docs

### Using Firebase Emulator

For local development without Firebase credentials:

```bash
# Start Firebase emulator
firebase emulators:start --only firestore

# Set environment variable (or add to .env.development)
export FIRESTORE_EMULATOR_HOST=localhost:8080

# Run the server
python -m orbital_app.main
```

## Deployment

### Deploy to Cloud Run

1. **Prerequisites:**
   - Google Cloud SDK (`gcloud`) installed
   - Docker installed
   - Project configured: `gcloud config set project YOUR_PROJECT_ID`

2. **Deploy:**
   ```bash
   ./scripts/deploy.sh orbital-app us-central1
   ```

3. **Set up secrets (for Firebase credentials):**
   ```bash
   ./scripts/setup-secrets.sh orbital-app us-central1
   ```

### Deployment Methods

The deploy script supports three methods:

```bash
# Cloud Build (recommended for CI/CD)
./scripts/deploy.sh orbital-app us-central1 cloud-build

# Direct (faster for development)
./scripts/deploy.sh orbital-app us-central1 direct

# From source (simplest, but slowest)
./scripts/deploy.sh orbital-app us-central1 source
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 8000) | No |
| `ENVIRONMENT` | `development` or `production` | No |
| `FIREBASE_PROJECT_ID` | Firebase project ID | Yes* |
| `FIREBASE_CLIENT_EMAIL` | Service account email | For production |
| `FIREBASE_PRIVATE_KEY` | Service account private key | For production |
| `FIRESTORE_EMULATOR_HOST` | Emulator host (e.g., `localhost:8080`) | For local dev |
| `CORS_ORIGINS` | Comma-separated allowed origins | No |

*Required for authentication. Falls back to `demo-project` for emulator mode.

### Cloud Run with Secrets

For production deployment with Firebase credentials:

```bash
gcloud run services update orbital-app \
  --region us-central1 \
  --set-secrets=FIREBASE_PROJECT_ID=orbital-app-FIREBASE_PROJECT_ID:latest \
  --set-secrets=FIREBASE_CLIENT_EMAIL=orbital-app-FIREBASE_CLIENT_EMAIL:latest \
  --set-secrets=FIREBASE_PRIVATE_KEY=orbital-app-FIREBASE_PRIVATE_KEY:latest
```

## Project Structure

```
src/orbital_app/
├── __init__.py
├── main.py              # FastAPI app entry point
├── core/                # Framework code
│   ├── settings.py      # Environment configuration
│   ├── event_router.py  # Request/Response models
│   ├── effect_executor.py # Server-side effect execution
│   ├── repository.py    # Database abstraction (InMemory, Firestore)
│   ├── bindings.py      # @entity, @payload, @user resolution
│   └── firebase.py      # Firebase Admin SDK initialization
├── middleware/          # FastAPI middleware
│   └── auth.py          # Firebase authentication (@user context)
├── nn/                  # PyTorch neural network runtime
│   ├── builder.py       # S-expr → PyTorch module
│   ├── forward.py       # nn/forward inference
│   ├── training.py      # train/loop training
│   └── constraints.py   # Weight/gradient constraints
├── tensor/              # Tensor operations
│   ├── ops.py           # tensor/* operations
│   └── contracts.py     # Input/output contracts
└── generated/           # ← COMPILER OUTPUT
    ├── entities/        # Pydantic models
    ├── traits/          # State machines
    └── routes/          # Event handlers
```

## Authentication

Include Firebase ID token in Authorization header:

```
Authorization: Bearer <firebase-id-token>
```

The `@user` context is then available in guards:

```python
# Guard: (or (= @user.role "admin") (= @entity.owner_id @user.uid))
guard_expr = [
    "or",
    ["=", "@user.role", "admin"],
    ["=", "@entity.owner_id", "@user.uid"],
]
```

## API Contract

### Event Endpoint

```
POST /api/{orbital}/{event}

Request:
{
  "payload": { ... },
  "entityId": "optional-id"
}

Response:
{
  "success": true,
  "newState": "listing",
  "data": {
    "Task": [{ "id": "1", "title": "..." }]
  },
  "clientEffects": [
    ["render_ui", "main", { "type": "entity-table" }],
    ["notify", { "type": "success", "message": "Saved" }]
  ],
  "effectResults": [
    { "effect": "persist", "action": "create", "data": { "id": "new" } }
  ]
}
```

## Compilation Workflow

1. **TypeScript Compiler** generates React client (pages, components)
2. **Python Shell** generates FastAPI server (event handlers, effects)
3. Both use the same `.orb` schema

```bash
# Compile both targets
almadar compile app.orb --target typescript  # React client
almadar compile app.orb --target python      # FastAPI server
```

## Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=orbital_app

# Run specific test file
pytest tests/test_repository.py
```

## Development with React Client

```bash
# Terminal 1: Python server
python -m orbital_app.main
# → http://localhost:8000

# Terminal 2: React client (from TypeScript shell)
npm run dev
# → http://localhost:3000
# → Calls Python server at :8000
```
