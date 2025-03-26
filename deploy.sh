#!/bin/bash
set -e

echo "Pushing code to GitHub..."
git add .
git commit -m "Deploy update" || echo "No changes to commit"
git push origin main

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
  --set-secrets "OPENAI_API_KEY=OPENAI_API_KEY:latest" \
  --set-env-vars "NEXT_PUBLIC_API_URL=https://chainsync.info"

echo "Deployment complete."
URL=$(gcloud run services describe ${SERVICE_NAME} --platform managed --region ${REGION} --format 'value(status.url)')
echo "Cloud Run service URL: $URL"

