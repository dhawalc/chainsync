import { NextResponse } from 'next/server';
import { mockHierarchyData } from '@/lib/mock-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parentId = searchParams.get('parentId');
    
    let filteredData = [...mockHierarchyData];
    
    // Filter by parent ID if specified
    if (parentId) {
      filteredData = mockHierarchyData.filter(node => node.PARENT_ID === parentId);
    } else {
      // If no parent ID, return root nodes
      filteredData = mockHierarchyData.filter(node => node.PARENT_ID === null);
    }
    
    return NextResponse.json({ 
      success: true,
      data: filteredData 
    });
  } catch (error: any) {
    console.error('Error fetching hierarchy:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { HIERARCHY_NAME, PARENT_ID } = body;
    
    if (!HIERARCHY_NAME) {
      return NextResponse.json({ 
        success: false,
        error: 'Hierarchy name is required' 
      }, { status: 400 });
    }
    
    // Generate a new hierarchy ID
    const newId = `H${String(mockHierarchyData.length + 1).padStart(3, '0')}`;
    
    // Create new node
    const newNode = {
      HIERARCHY_ID: newId,
      HIERARCHY_NAME,
      PARENT_ID: PARENT_ID || null
    };
    
    // Add to mock data
    mockHierarchyData.push(newNode);
    
    return NextResponse.json({ 
      success: true,
      message: 'Node added successfully',
      data: newNode
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
    
    // Check if node has children
    const hasChildren = mockHierarchyData.some(node => node.PARENT_ID === nodeId);
    
    if (hasChildren) {
      return NextResponse.json({ 
        success: false,
        error: 'Cannot delete node with children. Delete children first or move them to another parent.' 
      }, { status: 400 });
    }
    
    // Find node index
    const nodeIndex = mockHierarchyData.findIndex(node => node.HIERARCHY_ID === nodeId);
    
    if (nodeIndex === -1) {
      return NextResponse.json({ 
        success: false,
        error: 'Node not found' 
      }, { status: 404 });
    }
    
    // Remove node
    mockHierarchyData.splice(nodeIndex, 1);
    
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