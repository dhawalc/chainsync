import snowflake from 'snowflake-sdk';
import { shouldUseMockData } from './mock-data';

let connection: any = null;

/**
 * Initialize a Snowflake connection
 */
export const initializeSnowflake = async () => {
  if (shouldUseMockData()) {
    console.log('Using mock data instead of Snowflake connection');
    return null;
  }

  try {
    const account = process.env.SNOWFLAKE_ACCOUNT;
    const username = process.env.SNOWFLAKE_USERNAME;
    const database = process.env.SNOWFLAKE_DATABASE;
    const schema = process.env.SNOWFLAKE_SCHEMA;
    const warehouse = process.env.SNOWFLAKE_WAREHOUSE;
    const role = process.env.SNOWFLAKE_ROLE;
    const region = process.env.SNOWFLAKE_REGION;
    const password = process.env.SNOWFLAKE_PASSWORD;

    if (!account || !username || !database || !schema || !warehouse || !role || !password) {
      console.log('Missing required Snowflake configuration');
      return null;
    }

    const usePasswordAuth = process.env.SNOWFLAKE_AUTH_TYPE === 'password';
    console.log(`Using ${usePasswordAuth ? 'password' : 'key pair'} authentication for Snowflake.`);

    const connectionConfig: any = {
      account,
      username,
      database,
      schema,
      warehouse,
      role,
      region,
    };

    if (usePasswordAuth) {
      connectionConfig.password = password;
    } else {
      // Add OAuth or key pair auth configuration here when ready
      console.log('Non-password authentication not yet configured');
      return null;
    }

    connection = snowflake.createConnection(connectionConfig);
    console.log('Snowflake connection initialized with password auth');
    return connection;
  } catch (error) {
    console.error('Error initializing Snowflake connection:', error);
    return null;
  }
};

/**
 * Connect to Snowflake
 */
export const connectSnowflake = async () => {
  if (!connection) {
    console.log('No Snowflake connection to connect to');
    return false;
  }

  try {
    console.log('Connecting to Snowflake...');
    await new Promise((resolve, reject) => {
      connection.connect((err: any, conn: any) => {
        if (err) {
          console.error('Unable to connect to Snowflake:', err);
          reject(err);
        } else {
          console.log('Connected to Snowflake successfully');
          resolve(conn);
        }
      });
    });
    return true;
  } catch (error) {
    console.error('Error connecting to Snowflake:', error);
    return false;
  }
};

/**
 * Execute a query on Snowflake
 */
export const executeQuery = async (query: string) => {
  if (shouldUseMockData() || !connection) {
    console.log('Using mock data instead of executing Snowflake query');
    return [];
  }

  try {
    const result = await new Promise((resolve, reject) => {
      connection.execute({
        sqlText: query,
        complete: (err: any, stmt: any, rows: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      });
    });
    return result;
  } catch (error) {
    console.error('Error executing Snowflake query:', error);
    return [];
  }
};

/**
 * Close Snowflake connection
 * This function doesn't actually need any parameters according to the Snowflake SDK
 */
export const closeSnowflake = async () => {
  if (!connection) {
    return;
  }

  try {
    await new Promise((resolve, reject) => {
      connection.destroy((err: any) => {
        if (err) {
          console.error('Error closing Snowflake connection:', err);
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  } catch (error) {
    console.error('Error closing Snowflake connection:', error);
  } finally {
    connection = null;
  }
};

export async function getSnowflakeConnection() {
  if (connection) {
    return connection;
  }

  const account = process.env.SNOWFLAKE_ACCOUNT;
  const username = process.env.SNOWFLAKE_USERNAME;
  const database = process.env.SNOWFLAKE_DATABASE;
  const schema = process.env.SNOWFLAKE_SCHEMA;
  const warehouse = process.env.SNOWFLAKE_WAREHOUSE;
  const role = process.env.SNOWFLAKE_ROLE;
  const region = process.env.SNOWFLAKE_REGION;
  const privateKey = process.env.SNOWFLAKE_PRIVATE_KEY;

  if (!account || !username || !database || !schema || !warehouse || !role || !region || !privateKey) {
    throw new Error('Missing required Snowflake configuration');
  }

  const config = {
    account,
    username,
    database,
    schema,
    warehouse,
    role,
    region,
    authenticator: 'SNOWFLAKE_JWT' as const,
    privateKey
  };

  connection = snowflake.createConnection(config);

  return new Promise((resolve, reject) => {
    connection.connect((err: any) => {
      if (err) {
        console.error('Failed to connect to Snowflake:', err);
        reject(err);
      } else {
        console.log('Successfully connected to Snowflake');
        resolve(connection);
      }
    });
  });
}

export function closeSnowflakeConnection() {
  if (connection) {
    connection.destroy((err: any) => {
      if (err) {
        console.error('Error closing Snowflake connection:', err);
      } else {
        console.log('Snowflake connection closed successfully');
      }
    });
    connection = null;
  }
} 