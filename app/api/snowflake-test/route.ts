import { NextResponse } from 'next/server';
import { initializeSnowflake, connectSnowflake, executeQuery } from '@/lib/snowflake';

export async function GET() {
  console.log("API /snowflake-test: Starting connection test");
  
  // Log all environment variables for debugging (excluding password)
  console.log("API /snowflake-test: Environment variables:");
  console.log("  SNOWFLAKE_ACCOUNT:", process.env.SNOWFLAKE_ACCOUNT);
  console.log("  SNOWFLAKE_USERNAME:", process.env.SNOWFLAKE_USERNAME);
  console.log("  SNOWFLAKE_DATABASE:", process.env.SNOWFLAKE_DATABASE);
  console.log("  SNOWFLAKE_SCHEMA:", process.env.SNOWFLAKE_SCHEMA);
  console.log("  SNOWFLAKE_WAREHOUSE:", process.env.SNOWFLAKE_WAREHOUSE);
  console.log("  SNOWFLAKE_ROLE:", process.env.SNOWFLAKE_ROLE);
  console.log("  SNOWFLAKE_REGION:", process.env.SNOWFLAKE_REGION);
  
  try {
    console.log("API /snowflake-test: Creating connection");
    const connection = initializeSnowflake();

    console.log("API /snowflake-test: Attempting to connect");
    await connectSnowflake(connection);

    // Execute a simple test query
    console.log("API /snowflake-test: Executing simple test query");
    const results = await executeQuery(
      connection, 
      "SELECT current_version() as VERSION, current_account() as ACCOUNT, current_user() as USER"
    );

    // List available tables
    console.log("API /snowflake-test: Listing available tables");
    const tables = await executeQuery(
      connection,
      `SELECT TABLE_NAME 
       FROM INFORMATION_SCHEMA.TABLES 
       WHERE TABLE_SCHEMA = '${process.env.SNOWFLAKE_SCHEMA}'`
    );

    console.log("API /snowflake-test: Available tables:", tables);

    // Destroy the connection
    connection.destroy();
    console.log("API /snowflake-test: Connection destroyed");
    
    return NextResponse.json({
      status: "success",
      message: "Successfully connected to Snowflake",
      data: results,
      tables: tables
    });
  } catch (error) {
    console.error("API /snowflake-test: Error:", error);
    return NextResponse.json(
      { 
        status: "error", 
        message: "Failed to connect to Snowflake", 
        error: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
} 