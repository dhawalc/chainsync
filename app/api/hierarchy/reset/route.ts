import { NextResponse } from 'next/server';
import { initializeSnowflake, connectSnowflake, executeQuery } from '@/lib/snowflake';

export async function POST() {
  try {
    const connection = initializeSnowflake();
    await connectSnowflake(connection);

    // Set session context
    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA}`);

    // Just clear the existing data
    const clearTableQuery = `
      DELETE FROM HIERARCHY_TREE
    `;
    
    await executeQuery(connection, clearTableQuery);
    
    // Insert sample data using the existing column structure
    const sampleDataQuery = `
      INSERT INTO HIERARCHY_TREE (NODE_NAME, PARENT_NODE_ID, ENTITY_TYPE) VALUES
      ('Electronics', NULL, 'BUSINESS_UNIT'),
      ('Computers', 1, 'PRODUCT_CATEGORY'),
      ('Smartphones', 1, 'PRODUCT_CATEGORY'),
      ('Laptops', 2, 'PRODUCT_LINE'),
      ('Desktops', 2, 'PRODUCT_LINE'),
      ('iPhone', 3, 'PRODUCT_LINE'),
      ('Android', 3, 'PRODUCT_LINE'),
      ('MacBook Pro', 4, 'PRODUCT'),
      ('ThinkPad X1', 4, 'PRODUCT'),
      ('iMac', 5, 'PRODUCT'),
      ('iPhone 13', 6, 'PRODUCT'),
      ('Samsung Galaxy S21', 7, 'PRODUCT')
    `;
    
    await executeQuery(connection, sampleDataQuery);
    
    return NextResponse.json({ 
      success: true,
      message: 'Hierarchy data reset successfully'
    });
  } catch (error: any) {
    console.error('Error resetting hierarchy data:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message
    }, { status: 500 });
  }
} 