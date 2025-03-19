#!/bin/bash
set -e

# (Optional) Push your code to GitHub if that's part of your process.
echo "Pushing code to GitHub..."
git add .
git commit -m "Deploy update" || echo "No changes to commit"
git push origin main

# Set your variables (adjust these as needed)
PROJECT_ID=${GCP_PROJECT_ID:-chainsync-demo}
SERVICE_NAME="chainsync"
REGION="us-central1"

# Set up database URL for Cloud SQL
DATABASE_URL="postgresql://chainsync:power123@/chainsync?host=/cloudsql/${PROJECT_ID}:${REGION}:chainsync-db"

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
  --add-cloudsql-instances ${PROJECT_ID}:${REGION}:chainsync-db \
  --set-env-vars DATABASE_URL="${DATABASE_URL}"

echo "Deployment complete. Retrieving Cloud Run URL..."
URL=$(gcloud run services describe ${SERVICE_NAME} --platform managed --region ${REGION} --format 'value(status.url)')
echo "Cloud Run service URL: $URL"
