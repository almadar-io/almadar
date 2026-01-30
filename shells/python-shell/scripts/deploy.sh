#!/bin/bash
# ===========================================
# Deploy to Cloud Run
# ===========================================
# Usage: ./scripts/deploy.sh [service-name] [region]
#
# Prerequisites:
#   - gcloud CLI installed and authenticated
#   - Docker installed (for local builds)
#   - Project ID set: gcloud config set project YOUR_PROJECT_ID

set -e

# Configuration
SERVICE_NAME="${1:-orbital-app}"
REGION="${2:-us-central1}"
PROJECT_ID=$(gcloud config get-value project)

if [ -z "$PROJECT_ID" ]; then
    echo "Error: No project ID set. Run: gcloud config set project YOUR_PROJECT_ID"
    exit 1
fi

echo "=========================================="
echo "Deploying $SERVICE_NAME to Cloud Run"
echo "=========================================="
echo "Project: $PROJECT_ID"
echo "Region:  $REGION"
echo "=========================================="

# Option 1: Deploy using Cloud Build (recommended for CI/CD)
deploy_with_cloud_build() {
    echo "Deploying with Cloud Build..."
    gcloud builds submit \
        --config cloudbuild.yaml \
        --substitutions="_SERVICE_NAME=$SERVICE_NAME,_REGION=$REGION"
}

# Option 2: Deploy directly (faster for development)
deploy_direct() {
    echo "Building and deploying directly..."

    IMAGE="gcr.io/$PROJECT_ID/$SERVICE_NAME"

    # Build
    echo "Building Docker image..."
    docker build -t "$IMAGE" .

    # Push
    echo "Pushing to Container Registry..."
    docker push "$IMAGE"

    # Deploy
    echo "Deploying to Cloud Run..."
    gcloud run deploy "$SERVICE_NAME" \
        --image "$IMAGE" \
        --region "$REGION" \
        --platform managed \
        --allow-unauthenticated \
        --memory 1Gi \
        --cpu 1 \
        --min-instances 0 \
        --max-instances 10 \
        --set-env-vars "ENVIRONMENT=production"
}

# Option 3: Deploy from source (simplest, but slowest)
deploy_from_source() {
    echo "Deploying from source..."
    gcloud run deploy "$SERVICE_NAME" \
        --source . \
        --region "$REGION" \
        --platform managed \
        --allow-unauthenticated \
        --memory 1Gi \
        --cpu 1
}

# Parse deployment method
METHOD="${3:-cloud-build}"

case "$METHOD" in
    cloud-build)
        deploy_with_cloud_build
        ;;
    direct)
        deploy_direct
        ;;
    source)
        deploy_from_source
        ;;
    *)
        echo "Unknown method: $METHOD"
        echo "Usage: $0 [service-name] [region] [cloud-build|direct|source]"
        exit 1
        ;;
esac

# Get the service URL
echo ""
echo "=========================================="
echo "Deployment complete!"
echo "=========================================="
SERVICE_URL=$(gcloud run services describe "$SERVICE_NAME" --region="$REGION" --format='value(status.url)' 2>/dev/null || echo "")
if [ -n "$SERVICE_URL" ]; then
    echo "Service URL: $SERVICE_URL"
    echo "Health check: $SERVICE_URL/health"
fi
