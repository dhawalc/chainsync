import dotenv from 'dotenv';
import { initializeSnowflake, connectSnowflake, executeQuery } from '../lib/snowflake.js';

dotenv.config();

async function exploreTimePhaseTables() {
  try {
    console.log("Initializing Snowflake connection...");
    const connection = initializeSnowflake();
    
    console.log("Connecting to Snowflake...");
    await connectSnowflake(connection);
    console.log("Connected to Snowflake successfully");

    // Set session context
    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA}`);

    // 1. Explore TIME_PHASED_CYCLETIME table
    console.log("\n--- TIME_PHASED_CYCLETIME Table Structure ---");
    const cycleTimeStructure = await executeQuery(connection, "DESCRIBE TABLE TIME_PHASED_CYCLETIME");
    console.log(cycleTimeStructure);

    console.log("\n--- TIME_PHASED_CYCLETIME Sample Data ---");
    const cycleTimeSample = await executeQuery(connection, "SELECT * FROM TIME_PHASED_CYCLETIME LIMIT 10");
    console.log(cycleTimeSample);

    console.log("\n--- Unique BUCKET_TYPE values ---");
    const bucketTypes = await executeQuery(connection, "SELECT DISTINCT BUCKET_TYPE FROM TIME_PHASED_CYCLETIME");
    console.log(bucketTypes);

    // 2. Explore PRODUCT_MASTER table
    console.log("\n--- PRODUCT_MASTER Table Structure ---");
    const productStructure = await executeQuery(connection, "DESCRIBE TABLE PRODUCT_MASTER");
    console.log(productStructure);

    // 3. Look for hierarchy tables
    console.log("\n--- Hierarchy Tables ---");
    const hierarchyTables = await executeQuery(connection, 
      "SHOW TABLES LIKE '%HIERARCHY%' OR '%TREE%' OR '%CLOSURE%'");
    console.log(hierarchyTables);

    // If hierarchy tables exist, explore them
    if (hierarchyTables && hierarchyTables.length > 0) {
      for (const table of hierarchyTables) {
        console.log(`\n--- ${table.name} Table Structure ---`);
        const tableStructure = await executeQuery(connection, `DESCRIBE TABLE ${table.name}`);
        console.log(tableStructure);
        
        console.log(`\n--- ${table.name} Sample Data ---`);
        const sampleData = await executeQuery(connection, `SELECT * FROM ${table.name} LIMIT 5`);
        console.log(sampleData);
      }
    }

    // 4. Check for relationships between products and hierarchies
    console.log("\n--- Checking for product hierarchy relationships ---");
    // This is a generic query - adjust based on actual table structures
    const hierarchyQuery = `
      SELECT column_name, table_name 
      FROM information_schema.columns 
      WHERE table_schema = '${process.env.SNOWFLAKE_SCHEMA}'
      AND column_name LIKE '%HIERARCHY%' OR column_name LIKE '%PARENT%' OR column_name LIKE '%CHILD%'
    `;
    const hierarchyColumns = await executeQuery(connection, hierarchyQuery);
    console.log(hierarchyColumns);

    // 5. Check for time bucket/phase related tables
    console.log("\n--- Time Bucket/Phase Related Tables ---");
    const timeTables = await executeQuery(connection, 
      "SHOW TABLES LIKE '%TIME%' OR '%BUCKET%' OR '%PHASE%' OR '%PERIOD%'");
    console.log(timeTables);

  } catch (error) {
    console.error('Error exploring time-phase tables:', error);
  }
}

exploreTimePhaseTables(); 