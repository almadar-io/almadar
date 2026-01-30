#!/bin/bash
# ===========================================
# Setup Cloud Run Secrets
# ===========================================
# Creates secrets in Secret Manager and configures Cloud Run to use them
#
# Usage: ./scripts/setup-secrets.sh [service-name] [region]
#
# Prerequisites:
#   - gcloud CLI installed and authenticated
#   - Secret Manager API enabled
#   - .env file with your secrets

set -e

SERVICE_NAME="${1:-orbital-app}"
REGION="${2:-us-central1}"
PROJECT_ID=$(gcloud config get-value project)

if [ -z "$PROJECT_ID" ]; then
    echo "Error: No project ID set. Run: gcloud config set project YOUR_PROJECT_ID"
    exit 1
fi

echo "=========================================="
echo "Setting up secrets for $SERVICE_NAME"
echo "=========================================="

# Enable Secret Manager API
echo "Enabling Secret Manager API..."
gcloud services enable secretmanager.googleapis.com

# Function to create or update a secret
create_secret() {
    local SECRET_NAME=$1
    local SECRET_VALUE=$2

    if [ -z "$SECRET_VALUE" ]; then
        echo "Skipping $SECRET_NAME (empty value)"
        return
    fi

    echo "Creating/updating secret: $SECRET_NAME"

    # Check if secret exists
    if gcloud secrets describe "$SECRET_NAME" &>/dev/null; then
        # Add new version
        echo -n "$SECRET_VALUE" | gcloud secrets versions add "$SECRET_NAME" --data-file=-
    else
        # Create new secret
        echo -n "$SECRET_VALUE" | gcloud secrets create "$SECRET_NAME" --data-file=-
    fi
}

# Load environment variables from .env file
if [ -f ".env" ]; then
    echo "Loading secrets from .env file..."

    # Read .env file and create secrets
    while IFS='=' read -r key value; do
        # Skip comments and empty lines
        [[ $key =~ ^#.*$ ]] && continue
        [[ -z "$key" ]] && continue

        # Remove quotes from value
        value=$(echo "$value" | sed 's/^["'"'"']//;s/["'"'"']$//')

        # Create secret with service name prefix
        SECRET_NAME="${SERVICE_NAME}-${key}"
        create_secret "$SECRET_NAME" "$value"
    done < .env

    echo ""
    echo "Secrets created. To use them in Cloud Run, update your service:"
    echo ""
    echo "gcloud run services update $SERVICE_NAME \\"
    echo "  --region $REGION \\"
    echo "  --set-secrets=FIREBASE_PROJECT_ID=${SERVICE_NAME}-FIREBASE_PROJECT_ID:latest \\"
    echo "  --set-secrets=FIREBASE_CLIENT_EMAIL=${SERVICE_NAME}-FIREBASE_CLIENT_EMAIL:latest \\"
    echo "  --set-secrets=FIREBASE_PRIVATE_KEY=${SERVICE_NAME}-FIREBASE_PRIVATE_KEY:latest"
else
    echo "No .env file found. Creating secrets interactively..."

    # Interactive secret creation
    read -p "Firebase Project ID: " FB_PROJECT_ID
    create_secret "${SERVICE_NAME}-FIREBASE_PROJECT_ID" "$FB_PROJECT_ID"

    read -p "Firebase Client Email: " FB_CLIENT_EMAIL
    create_secret "${SERVICE_NAME}-FIREBASE_CLIENT_EMAIL" "$FB_CLIENT_EMAIL"

    echo "Enter Firebase Private Key (paste and press Ctrl+D):"
    FB_PRIVATE_KEY=$(cat)
    create_secret "${SERVICE_NAME}-FIREBASE_PRIVATE_KEY" "$FB_PRIVATE_KEY"
fi

echo ""
echo "=========================================="
echo "Secrets setup complete!"
echo "=========================================="
echo ""
echo "Grant Cloud Run access to secrets:"
echo ""
echo "SERVICE_ACCOUNT=\$(gcloud run services describe $SERVICE_NAME --region $REGION --format='value(spec.template.spec.serviceAccountName)')"
echo "gcloud secrets add-iam-policy-binding ${SERVICE_NAME}-FIREBASE_PROJECT_ID --member=\"serviceAccount:\$SERVICE_ACCOUNT\" --role=\"roles/secretmanager.secretAccessor\""
