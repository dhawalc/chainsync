#!/bin/bash
set -e

# Read OPENAI_API_KEY from .env.local if not set in environment
if [ -z "${OPENAI_API_KEY}" ]; then
    export OPENAI_API_KEY=$(grep OPENAI_API_KEY .env.local | cut -d '=' -f2)
fi

# Verify we have the key
if [ -z "${OPENAI_API_KEY}" ]; then
    echo "Error: Could not find OPENAI_API_KEY in environment or .env.local"
    exit 1
fi

# (Optional) Push your code to GitHub if that's part of your process.
echo "Pushing code to GitHub..."
git add .
git commit -m "Deploy update" || echo "No changes to commit"
git push origin main

# Set your variables (adjust these as needed)
PROJECT_ID=${GCP_PROJECT_ID:-chainsync-demo}
SERVICE_NAME="chainsync"
REGION="us-central1"

echo "Building Docker image..."
docker build -t gcr.io/${PROJECT_ID}/${SERVICE_NAME}:latest .

echo "Pushing Docker image..."
docker push gcr.io/${PROJECT_ID}/${SERVICE_NAME}:latest

echo "Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
  --image gcr.io/${PROJECT_ID}/${SERVICE_NAME}:latest \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --memory 1Gi \
  --set-env-vars "OPENAI_API_KEY=${OPENAI_API_KEY}"
echo "Deployment complete. Retrieving Cloud Run URL..."
URL=$(gcloud run services describe ${SERVICE_NAME} --platform managed --region ${REGION} --format 'value(status.url)')
echo "Cloud Run service URL: $URL"
