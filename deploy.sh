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
  --set-env-vars "SNOWFLAKE_ACCOUNT=OU87598,SNOWFLAKE_USERNAME=APP_SCDATA,SNOWFLAKE_PASSWORD=LaPxg9pgf2czyYw7btyNaJadGD7TrGw,SNOWFLAKE_WAREHOUSE=COMPUTE_WH,SNOWFLAKE_DATABASE=chainsyncdb,SNOWFLAKE_SCHEMA=scm,SNOWFLAKE_ROLE=APP_SCDATA_ROLE,SNOWFLAKE_REGION=west-us-2.azure,FRONTEND_URL=http://localhost:3000" \
  --set-secrets RSA_PRIVATE_KEY=projects/340970450219/secrets/rsa_private_key:latest

echo "Deployment complete. Retrieving Cloud Run URL..."
URL=$(gcloud run services describe ${SERVICE_NAME} --platform managed --region ${REGION} --format 'value(status.url)')
echo "Cloud Run service URL: $URL"
