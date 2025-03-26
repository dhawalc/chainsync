import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

let secretManagerClient: SecretManagerServiceClient | null = null;

export async function getSecret(secretName: string): Promise<string | null> {
  try {
    if (!secretManagerClient) {
      secretManagerClient = new SecretManagerServiceClient();
    }

    const projectId = process.env.GOOGLE_CLOUD_PROJECT;
    if (!projectId) {
      console.warn('GOOGLE_CLOUD_PROJECT environment variable not set');
      return null;
    }

    const name = `projects/${projectId}/secrets/${secretName}/versions/latest`;
    const [version] = await secretManagerClient.accessSecretVersion({ name });
    
    if (!version.payload?.data) {
      console.warn(`No data found for secret ${secretName}`);
      return null;
    }

    return version.payload.data.toString();
  } catch (error) {
    console.error(`Error fetching secret ${secretName}:`, error);
    return null;
  }
} 