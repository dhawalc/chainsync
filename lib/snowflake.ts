import snowflake from 'snowflake-sdk';

/**
 * Initialize a Snowflake connection
 */
export function initializeSnowflake() {
  console.log("Initializing Snowflake connection with account:", process.env.SNOWFLAKE_ACCOUNT);
  
  // Create connection object
  const connection = snowflake.createConnection({
    account: process.env.SNOWFLAKE_ACCOUNT || '',
    username: process.env.SNOWFLAKE_USERNAME || '',
    password: process.env.SNOWFLAKE_PASSWORD || '',
    database: process.env.SNOWFLAKE_DATABASE || '',
    schema: process.env.SNOWFLAKE_SCHEMA || '',
    warehouse: process.env.SNOWFLAKE_WAREHOUSE || '',
    role: process.env.SNOWFLAKE_ROLE || '',
    region: process.env.SNOWFLAKE_REGION || '',
  });
  
  return connection;
}

/**
 * Connect to Snowflake
 */
export function connectSnowflake(connection: any): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.connect((err: any, conn: any) => {
      if (err) {
        console.error("Error connecting to Snowflake:", err);
        reject(err);
      } else {
        console.log("Successfully connected to Snowflake");
        resolve(conn);
      }
    });
  });
}

/**
 * Execute a query on Snowflake
 */
export function executeQuery(connection: any, query: string): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.execute({
      sqlText: query,
      complete: (err: any, stmt: any, rows: any) => {
        if (err) {
          console.error("Error executing query:", err);
          reject(err);
        } else {
          console.log(`Query executed successfully, returned ${rows?.length || 0} rows`);
          resolve(rows);
        }
      }
    });
  });
}

/**
 * Close Snowflake connection
 * This function doesn't actually need any parameters according to the Snowflake SDK
 */
export function closeConnection(connection: any): void {
  if (connection) {
    try {
      connection.destroy((err: any) => {
        if (err) {
          console.error("Error closing Snowflake connection:", err);
        } else {
          console.log("Snowflake connection closed successfully");
        }
      });
    } catch (error) {
      console.error("Error while trying to close Snowflake connection:", error);
    }
  }
} 