require('dotenv').config();
const { initializeSnowflake, connectSnowflake, executeQuery } = require('../lib/snowflake');

async function exploreCycleTimeData() {
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

    // Get table structure
    console.log("\n--- TIME_PHASED_CYCLETIME Table Structure ---");
    const structure = await executeQuery(connection, "DESCRIBE TABLE TIME_PHASED_CYCLETIME");
    console.log(structure);

    // Get count by bucket type
    console.log("\n--- Count by BUCKET_TYPE ---");
    const bucketCounts = await executeQuery(connection, 
      "SELECT BUCKET_TYPE, COUNT(*) as COUNT FROM TIME_PHASED_CYCLETIME GROUP BY BUCKET_TYPE");
    console.log(bucketCounts);

    // Get sample data for each bucket type
    const bucketTypes = await executeQuery(connection, "SELECT DISTINCT BUCKET_TYPE FROM TIME_PHASED_CYCLETIME");
    
    for (const bucket of bucketTypes) {
      const bucketType = bucket.BUCKET_TYPE;
      console.log(`\n--- Sample data for BUCKET_TYPE: ${bucketType} ---`);
      const sampleData = await executeQuery(connection, 
        `SELECT * FROM TIME_PHASED_CYCLETIME WHERE BUCKET_TYPE = '${bucketType}' LIMIT 5`);
      console.log(sampleData);
    }

    // Check date ranges
    console.log("\n--- Date ranges in TIME_PHASED_CYCLETIME ---");
    const dateRanges = await executeQuery(connection, 
      "SELECT BUCKET_TYPE, MIN(START_DATE) as MIN_START_DATE, MAX(END_DATE) as MAX_END_DATE FROM TIME_PHASED_CYCLETIME GROUP BY BUCKET_TYPE");
    console.log(dateRanges);

    // Check for product relationships
    console.log("\n--- Product relationships ---");
    const productJoin = await executeQuery(connection, `
      SELECT tpc.PRODUCT_ID, pm.DESCRIPTION, tpc.BUCKET_TYPE, COUNT(*) as RECORD_COUNT
      FROM TIME_PHASED_CYCLETIME tpc
      JOIN PRODUCT_MASTER pm ON tpc.PRODUCT_ID = pm.PRODUCT_ID
      GROUP BY tpc.PRODUCT_ID, pm.DESCRIPTION, tpc.BUCKET_TYPE
      LIMIT 10
    `);
    console.log(productJoin);

  } catch (error) {
    console.error('Error exploring cycle time data:', error);
  }
}

exploreCycleTimeData(); 