import { NextResponse } from 'next/server';
import { initializeSnowflake, connectSnowflake, executeQuery, closeConnection } from '@/lib/snowflake';
import { mockHierarchyData, shouldUseMockData } from '@/lib/mock-data';

// Define the node structure
interface HierarchyNode {
  NODE_ID: string;
  NODE_NAME: string;
  ENTITY_TYPE: string;
  PARENT_NODE_ID: string | null;
  LEVEL?: number;
  [key: string]: any; // Allow for additional properties
}

export async function GET() {
  try {
    // Check if we should use mock data
    if (shouldUseMockData()) {
      console.log("Using mock data for hierarchy API");
      
      return NextResponse.json({
        success: true,
        data: mockHierarchyData
      });
    }
    
    // Continue with real Snowflake connection
    console.log("Initializing Snowflake connection for hierarchy...");
    const connection = initializeSnowflake();
    
    console.log("Connecting to Snowflake...");
    await connectSnowflake(connection);
    console.log("Connected to Snowflake successfully");

    // Set session context
    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA}`);

    // Query to get hierarchy data
    const query = `
      SELECT 
        NODE_ID, 
        NODE_NAME, 
        ENTITY_TYPE, 
        PARENT_NODE_ID,
        LEVEL
      FROM HIERARCHY_NODES
      ORDER BY LEVEL, NODE_ID
    `;
    
    console.log(`Executing query: ${query}`);
    const hierarchyData = await executeQuery(connection, query);
    
    // Close the connection
    closeConnection(connection);
    
    return NextResponse.json({
      success: true,
      data: hierarchyData
    });
  } catch (error: any) {
    console.error("Error fetching hierarchy data:", error);
    
    // Fallback to mock data on error
    console.log("Falling back to mock hierarchy data due to error");
    
    return NextResponse.json({
      success: true,
      data: mockHierarchyData,
      _isMockData: true
    });
  }
}

// Helper function to calculate hierarchy levels
function calculateHierarchyLevels(nodes: HierarchyNode[]): HierarchyNode[] {
  // Create a map for quick node lookup
  const nodeMap: Record<string, HierarchyNode> = {};
  nodes.forEach(node => {
    nodeMap[node.NODE_ID] = {
      ...node,
      PARENT_ID: node.PARENT_NODE_ID, // Rename to match expected property
      NODE_TYPE: node.ENTITY_TYPE,    // Rename to match expected property
    };
  });
  
  // Calculate level for each node
  Object.values(nodeMap).forEach(node => {
    let level = 0;
    
    // If node has a parent, traverse up to calculate level
    if (node.PARENT_ID) {
      let parentId = node.PARENT_ID;
      while (parentId) {
        level++;
        const parent = nodeMap[parentId];
        if (!parent) break;
        parentId = parent.PARENT_ID;
      }
    }
    
    node.LEVEL = level;
  });
  
  return Object.values(nodeMap);
}

export async function POST(request: Request) {
  let connection;
  try {
    const body = await request.json();
    const { NODE_NAME, PARENT_ID, NODE_TYPE } = body;
    
    if (!NODE_NAME || !NODE_TYPE) {
      return NextResponse.json({ 
        success: false,
        error: 'Node name and type are required' 
      }, { status: 400 });
    }
    
    connection = initializeSnowflake();
    await connectSnowflake(connection);

    // Set session context
    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE || ''}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE || ''}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA || ''}`);

    // Insert new node using the actual column names from your database
    let query = '';
    if (PARENT_ID) {
      query = `
        INSERT INTO HIERARCHY_TREE (NODE_NAME, PARENT_NODE_ID, ENTITY_TYPE)
        VALUES ('${NODE_NAME}', ${PARENT_ID}, '${NODE_TYPE}')
      `;
    } else {
      query = `
        INSERT INTO HIERARCHY_TREE (NODE_NAME, PARENT_NODE_ID, ENTITY_TYPE)
        VALUES ('${NODE_NAME}', NULL, '${NODE_TYPE}')
      `;
    }
    
    await executeQuery(connection, query);
    closeConnection(connection);
    
    return NextResponse.json({ 
      success: true,
      message: 'Node added successfully' 
    });
  } catch (error: any) {
    console.error('Error adding hierarchy node:', error);
    if (connection) {
      closeConnection(connection);
    }
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  let connection;
  try {
    const { searchParams } = new URL(request.url);
    const nodeId = searchParams.get('nodeId');
    
    if (!nodeId) {
      return NextResponse.json({ 
        success: false,
        error: 'Node ID is required' 
      }, { status: 400 });
    }
    
    connection = initializeSnowflake();
    await connectSnowflake(connection);

    // Set session context
    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE || ''}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE || ''}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA || ''}`);

    // Check if the node has children using the actual column names
    const checkChildrenQuery = `
      SELECT COUNT(*) as CHILD_COUNT 
      FROM HIERARCHY_TREE 
      WHERE PARENT_NODE_ID = ${nodeId}
    `;
    
    const childrenCheck = await executeQuery(connection, checkChildrenQuery);
    
    if (childrenCheck[0].CHILD_COUNT > 0) {
      closeConnection(connection);
      return NextResponse.json({ 
        success: false,
        error: 'Cannot delete node with children. Delete children first or move them to another parent.' 
      }, { status: 400 });
    }

    // Delete the node
    const deleteQuery = `
      DELETE FROM HIERARCHY_TREE 
      WHERE NODE_ID = ${nodeId}
    `;
    
    await executeQuery(connection, deleteQuery);
    closeConnection(connection);
    
    return NextResponse.json({ 
      success: true,
      message: 'Node deleted successfully' 
    });
  } catch (error: any) {
    console.error('Error deleting hierarchy node:', error);
    if (connection) {
      closeConnection(connection);
    }
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
} 