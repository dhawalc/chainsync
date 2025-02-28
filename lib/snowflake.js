// lib/snowflake.js
import fs from 'fs';
import path from 'path';
import snowflake from 'snowflake-sdk';
import { fileURLToPath } from 'url';

export function initializeSnowflake() {
  try {
    // Path to your private key file - adjust this path as needed
    const privateKeyPath = path.resolve(process.cwd(), 'rsa_private_key.p8');
    
    // Read the private key file
    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
    
    // Create a connection using JWT authentication
    const connection = snowflake.createConnection({
      account: process.env.SNOWFLAKE_ACCOUNT,
      username: process.env.SNOWFLAKE_USERNAME,
      privateKey: privateKey,
      warehouse: process.env.SNOWFLAKE_WAREHOUSE,
      database: process.env.SNOWFLAKE_DATABASE,
      schema: process.env.SNOWFLAKE_SCHEMA,
      role: process.env.SNOWFLAKE_ROLE,
      region: process.env.SNOWFLAKE_REGION,
      authenticator: 'SNOWFLAKE_JWT',
      clientSessionKeepAlive: true
    });
    
    console.log('Snowflake connection initialized');
    return connection;
  } catch (error) {
    console.error('Error initializing Snowflake connection:', error);
    throw error;
  }
}

export function connectSnowflake(connection) {
  return new Promise((resolve, reject) => {
    connection.connect((err, conn) => {
      if (err) {
        console.error('Unable to connect to Snowflake:', err);
        reject(err);
      } else {
        console.log('Successfully connected to Snowflake');
        resolve(conn);
      }
    });
  });
}

export async function executeQuery(connection, sqlText) {
  return new Promise((resolve, reject) => {
    connection.execute({
      sqlText,
      complete: (err, stmt, rows) => {
        if (err) {
          console.error('Error executing query:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      }
    });
  });
}
