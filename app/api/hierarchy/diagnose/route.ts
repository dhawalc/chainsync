import { NextResponse } from 'next/server';
import { initializeSnowflake, connectSnowflake, executeQuery } from '@/lib/snowflake';

// Define the column structure type
interface TableColumn {
  COLUMN_NAME: string;
  DATA_TYPE: string;
  IS_NULLABLE: string;
  COLUMN_DEFAULT: string | null;
}

export async function GET() {
  try {
    const connection = initializeSnowflake();
    await connectSnowflake(connection);

    // Set session context
    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA}`);

    // Check if the hierarchy table exists
    const checkTableQuery = `
      SELECT COUNT(*) as TABLE_EXISTS 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'HIERARCHY_TREE'
    `;
    
    const tableCheck = await executeQuery(connection, checkTableQuery);
    
    if (tableCheck[0].TABLE_EXISTS === 0) {
      return NextResponse.json({ 
        success: false,
        message: 'Hierarchy table does not exist.',
        recommendation: 'Please use the reset endpoint to create the table.'
      });
    }

    // Get the table structure
    const tableStructureQuery = `
      SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = 'HIERARCHY_TREE'
      ORDER BY ORDINAL_POSITION
    `;
    
    const tableStructure = await executeQuery(connection, tableStructureQuery);
    
    // Try to get a sample of data
    let sampleData = [];
    try {
      const sampleDataQuery = `
        SELECT * FROM HIERARCHY_TREE LIMIT 5
      `;
      sampleData = await executeQuery(connection, sampleDataQuery);
    } catch (error) {
      console.error('Error fetching sample data:', error);
    }
    
    // Check for required columns
    const columnNames = tableStructure.map((col: TableColumn) => col.COLUMN_NAME);
    const requiredColumns = ['NODE_ID', 'NODE_NAME', 'ENTITY_TYPE', 'PARENT_NODE_ID'];
    const missingColumns = requiredColumns.filter((col: string) => !columnNames.includes(col));
    
    if (missingColumns.length > 0) {
      return NextResponse.json({
        status: 'error',
        message: `Missing required columns: ${missingColumns.join(', ')}`,
        diagnostics: {
          tableStructure,
          missingColumns
        }
      }, { status: 400 });
    }

    // Check for circular references
    const nodeMap = new Map();
    let hasCircularReference = false;
    
    sampleData.forEach((node: any) => {
      nodeMap.set(node.NODE_ID, node.PARENT_NODE_ID);
    });
    
    sampleData.forEach((node: any) => {
      const visited = new Set();
      let currentId = node.NODE_ID;
      
      while (currentId) {
        if (visited.has(currentId)) {
          hasCircularReference = true;
          break;
        }
        
        visited.add(currentId);
        currentId = nodeMap.get(currentId);
      }
    });

    return NextResponse.json({
      status: 'success',
      diagnostics: {
        tableStructure,
        sampleData,
        hasRequiredColumns: true,
        hasCircularReference
      }
    });
  } catch (error: any) {
    console.error('Error diagnosing hierarchy table:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to diagnose hierarchy table',
      error: error.message
    }, { status: 500 });
  }
} 