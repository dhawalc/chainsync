# Docker Usage for ChainSync

## Local Development with Docker

1. Build the Docker image:
   ```bash
   npm run docker:build
   ```

2. Run the container:
   ```bash
   npm run docker:run
   ```

3. Or use the combined script:
   ```bash
   npm run docker:dev
   ```

## CI/CD Pipeline

This project uses GitHub Actions to automatically build and deploy the application to Google Cloud Run whenever code is pushed to the main branch.

### Prerequisites for CI/CD

1. Create a Google Cloud Project
2. Enable the following APIs:
   - Cloud Run API
   - Container Registry API
   - Cloud Build API

3. Create a Service Account with the following roles:
   - Cloud Run Admin
   - Storage Admin
   - Service Account User

4. Generate a JSON key for the service account

5. Add the following secrets to your GitHub repository:
   - `GCP_PROJECT_ID`: Your Google Cloud Project ID
   - `GCP_SA_KEY`: The content of the service account JSON key file

### Deployment

The application will be automatically deployed to Cloud Run when you push to the main branch. The deployment URL will be available in the GitHub Actions logs.

## Manual Deployment

If you need to deploy manually:

1. Build the Docker image:
   ```bash
   docker build -t gcr.io/[PROJECT_ID]/chainsync:latest .
   ```

2. Push to Google Container Registry:
   ```bash
   docker push gcr.io/[PROJECT_ID]/chainsync:latest
   ```

3. Deploy to Cloud Run:
   ```bash
   gcloud run deploy chainsync \
     --image gcr.io/[PROJECT_ID]/chainsync:latest \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ``` 