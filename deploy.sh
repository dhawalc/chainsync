#!/bin/bash
set -e

# Load environment variables from .env.local
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
fi

# (Optional) Push your code to GitHub if that's part of your process.
echo "Pushing code to GitHub..."
git add .
git commit -m "Deploy update" || echo "No changes to commit"
git push origin main

# Set your variables
PROJECT_ID=${GCP_PROJECT_ID:-chainsync-demo}
SERVICE_NAME="chainsync"
REGION="us-central1"

echo "Building Docker image..."
docker build \
  --build-arg OPENAI_API_KEY="${OPENAI_API_KEY}" \
  --build-arg DATABASE_URL="${DATABASE_URL}" \
  --build-arg SNOWFLAKE_ACCOUNT="${SNOWFLAKE_ACCOUNT}" \
  --build-arg SNOWFLAKE_USERNAME="${SNOWFLAKE_USERNAME}" \
  --build-arg SNOWFLAKE_PASSWORD="${SNOWFLAKE_PASSWORD}" \
  --build-arg SNOWFLAKE_WAREHOUSE="${SNOWFLAKE_WAREHOUSE}" \
  --build-arg SNOWFLAKE_DATABASE="${SNOWFLAKE_DATABASE}" \
  --build-arg SNOWFLAKE_SCHEMA="${SNOWFLAKE_SCHEMA}" \
  --build-arg SNOWFLAKE_ROLE="${SNOWFLAKE_ROLE}" \
  --build-arg SNOWFLAKE_REGION="${SNOWFLAKE_REGION}" \
  --build-arg FRONTEND_URL="${FRONTEND_URL}" \
  -t gcr.io/${PROJECT_ID}/${SERVICE_NAME}:latest .

echo "Pushing Docker image..."
docker push gcr.io/${PROJECT_ID}/${SERVICE_NAME}:latest

echo "Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
  --image gcr.io/${PROJECT_ID}/${SERVICE_NAME}:latest \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --memory 1Gi \
  --set-env-vars="OPENAI_API_KEY=${OPENAI_API_KEY}" \
  --set-env-vars="DATABASE_URL=${DATABASE_URL}" \
  --set-env-vars="SNOWFLAKE_ACCOUNT=${SNOWFLAKE_ACCOUNT}" \
  --set-env-vars="SNOWFLAKE_USERNAME=${SNOWFLAKE_USERNAME}" \
  --set-env-vars="SNOWFLAKE_PASSWORD=${SNOWFLAKE_PASSWORD}" \
  --set-env-vars="SNOWFLAKE_WAREHOUSE=${SNOWFLAKE_WAREHOUSE}" \
  --set-env-vars="SNOWFLAKE_DATABASE=${SNOWFLAKE_DATABASE}" \
  --set-env-vars="SNOWFLAKE_SCHEMA=${SNOWFLAKE_SCHEMA}" \
  --set-env-vars="SNOWFLAKE_ROLE=${SNOWFLAKE_ROLE}" \
  --set-env-vars="SNOWFLAKE_REGION=${SNOWFLAKE_REGION}" \
  --set-env-vars="FRONTEND_URL=${FRONTEND_URL}"

echo "Deployment complete. Retrieving Cloud Run URL..."
URL=$(gcloud run services describe ${SERVICE_NAME} --platform managed --region ${REGION} --format 'value(status.url)')
echo "Cloud Run service URL: $URL"
