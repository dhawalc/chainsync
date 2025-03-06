import { NextResponse } from 'next/server';
import { initializeSnowflake, connectSnowflake, executeQuery } from '@/lib/snowflake';

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
        error: 'Hierarchy table does not exist. Please reset the hierarchy.' 
      }, { status: 404 });
    }

    // First, get all hierarchy nodes
    const query = `
      SELECT 
        NODE_ID, 
        NODE_NAME, 
        PARENT_NODE_ID,
        ENTITY_TYPE
      FROM HIERARCHY_TREE
    `;
    
    const hierarchyData = await executeQuery(connection, query);
    
    // Now, calculate the levels in JavaScript instead of SQL
    const nodesWithLevels = calculateHierarchyLevels(hierarchyData);
    
    // Sort by level and name
    nodesWithLevels.sort((a: HierarchyNode, b: HierarchyNode) => {
      if (a.LEVEL !== b.LEVEL) {
        return (a.LEVEL || 0) - (b.LEVEL || 0);
      }
      return a.NODE_NAME.localeCompare(b.NODE_NAME);
    });
    
    return NextResponse.json({ 
      nodes: nodesWithLevels,
      success: true 
    });
  } catch (error: any) {
    console.error('Error fetching hierarchy data:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
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
  try {
    const body = await request.json();
    const { NODE_NAME, PARENT_ID, NODE_TYPE } = body;
    
    if (!NODE_NAME || !NODE_TYPE) {
      return NextResponse.json({ 
        success: false,
        error: 'Node name and type are required' 
      }, { status: 400 });
    }
    
    const connection = initializeSnowflake();
    await connectSnowflake(connection);

    // Set session context
    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA}`);

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
    
    return NextResponse.json({ 
      success: true,
      message: 'Node added successfully' 
    });
  } catch (error: any) {
    console.error('Error adding hierarchy node:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const nodeId = searchParams.get('nodeId');
    
    if (!nodeId) {
      return NextResponse.json({ 
        success: false,
        error: 'Node ID is required' 
      }, { status: 400 });
    }
    
    const connection = initializeSnowflake();
    await connectSnowflake(connection);

    // Set session context
    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA}`);

    // Check if the node has children using the actual column names
    const checkChildrenQuery = `
      SELECT COUNT(*) as CHILD_COUNT 
      FROM HIERARCHY_TREE 
      WHERE PARENT_NODE_ID = ${nodeId}
    `;
    
    const childrenCheck = await executeQuery(connection, checkChildrenQuery);
    
    if (childrenCheck[0].CHILD_COUNT > 0) {
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
    
    return NextResponse.json({ 
      success: true,
      message: 'Node deleted successfully' 
    });
  } catch (error: any) {
    console.error('Error deleting hierarchy node:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
} 