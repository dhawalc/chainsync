#!/bin/bash
set -e

# Load environment variables from .env.local if it exists
if [ -f .env.local ]; then
  set -a
  source .env.local
  set +a
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

# Create Secret Manager secret for OpenAI API key
echo "Setting up OpenAI API key in Secret Manager..."
if [ ! -z "${OPENAI_API_KEY}" ]; then
  echo "Creating/updating OpenAI API key secret..."
  echo "${OPENAI_API_KEY}" | gcloud secrets create "OPENAI_API_KEY" \
    --data-file=- \
    --replication-policy="automatic" || \
  echo "${OPENAI_API_KEY}" | gcloud secrets versions add "OPENAI_API_KEY" --data-file=-
fi

echo "Building Docker image..."
docker build \
  --build-arg OPENAI_API_KEY="${OPENAI_API_KEY}" \
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
  --set-env-vars="FRONTEND_URL=${FRONTEND_URL}" \
  --set-secrets="OPENAI_API_KEY=OPENAI_API_KEY:latest" \
  --update-secrets="OPENAI_API_KEY=OPENAI_API_KEY:latest"

echo "Deployment complete. Retrieving Cloud Run URL..."
URL=$(gcloud run services describe ${SERVICE_NAME} --platform managed --region ${REGION} --format 'value(status.url)')
echo "Cloud Run service URL: $URL"

# Print deployment summary
echo "
Deployment Summary:
------------------
Service Name: ${SERVICE_NAME}
Region: ${REGION}
URL: ${URL}
Environment: Production
Memory: 1Gi

Next Steps:
1. Visit ${URL} to verify the deployment
2. Check Cloud Run logs for any issues
3. Monitor application performance
"
