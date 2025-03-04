// app/hierarchy/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HierarchyNode {
  NODE_ID: string | number;
  NODE_NAME: string;
  PARENT_ID: string | number | null;
  NODE_TYPE: string;
  LEVEL: number;
  children?: HierarchyNode[];
}

export default function HierarchyManagement() {
  const [hierarchyData, setHierarchyData] = useState<HierarchyNode[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Set<string | number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNode, setSelectedNode] = useState<HierarchyNode | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newNodeData, setNewNodeData] = useState({
    NODE_NAME: '',
    PARENT_ID: '',
    NODE_TYPE: 'PRODUCT'
  });
  const [toast, setToast] = useState<{ visible: boolean, title: string, message: string, type: 'success' | 'error' | 'info' }>({
    visible: false,
    title: '',
    message: '',
    type: 'info'
  });

  // Fetch hierarchy data
  const fetchHierarchyData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/hierarchy');
      const data = await response.json();
      
      if (data.success) {
        // Convert flat hierarchy to tree structure
        const hierarchyTree = buildHierarchyTree(data.data);
        setHierarchyData(hierarchyTree);
      } else {
        showToast('Error', data.error || 'Failed to fetch hierarchy data', 'error');
      }
    } catch (error) {
      showToast('Error', 'Failed to fetch hierarchy data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Build hierarchy tree from flat data
  const buildHierarchyTree = (flatData: HierarchyNode[]): HierarchyNode[] => {
    const nodeMap = new Map<string | number, HierarchyNode>();
    const rootNodes: HierarchyNode[] = [];
    
    // First pass: create nodes with no children yet
    flatData.forEach(node => {
      nodeMap.set(node.NODE_ID, { ...node, children: [] });
    });
    
    // Second pass: build the tree
    flatData.forEach(node => {
      const currentNode = nodeMap.get(node.NODE_ID);
      if (node.PARENT_ID === null) {
        rootNodes.push(currentNode!);
      } else {
        const parentNode = nodeMap.get(node.PARENT_ID);
        if (parentNode) {
          parentNode.children!.push(currentNode!);
        }
      }
    });
    
    return rootNodes;
  };

  // Toggle node expansion
  const toggleNodeExpansion = (nodeId: string | number) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  // Show toast message
  const showToast = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({
      visible: true,
      title,
      message,
      type
    });
    
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Add new node
  const addNewNode = async () => {
    try {
      const response = await fetch('/api/hierarchy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNodeData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        showToast('Success', 'Node added successfully', 'success');
        fetchHierarchyData();
        setIsEditModalOpen(false);
        setNewNodeData({
          NODE_NAME: '',
          PARENT_ID: '',
          NODE_TYPE: 'PRODUCT'
        });
      } else {
        showToast('Error', result.error || 'Failed to add node', 'error');
      }
    } catch (error) {
      showToast('Error', 'Failed to add node', 'error');
    }
  };

  // Delete node
  const deleteNode = async (nodeId: string | number) => {
    if (!confirm('Are you sure you want to delete this node? This will also delete all child nodes.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/hierarchy?nodeId=${nodeId}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        showToast('Success', 'Node deleted successfully', 'success');
        fetchHierarchyData();
      } else {
        showToast('Error', result.error || 'Failed to delete node', 'error');
      }
    } catch (error) {
      showToast('Error', 'Failed to delete node', 'error');
    }
  };

  // Render hierarchy node
  const renderHierarchyNode = (node: HierarchyNode, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.NODE_ID);
    
    return (
      <div key={node.NODE_ID} className="mb-1">
        <div 
          className={`flex items-center p-2 rounded hover:bg-gray-100 ${selectedNode?.NODE_ID === node.NODE_ID ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
          style={{ marginLeft: `${depth * 20}px` }}
        >
          {hasChildren && (
            <button 
              onClick={() => toggleNodeExpansion(node.NODE_ID)}
              className="mr-2 w-5 h-5 flex items-center justify-center text-gray-500"
            >
              {isExpanded ? '−' : '+'}
            </button>
          )}
          {!hasChildren && <div className="mr-2 w-5"></div>}
          
          <div 
            className="flex-grow cursor-pointer"
            onClick={() => setSelectedNode(node)}
          >
            <span className="font-medium">{node.NODE_NAME}</span>
            <span className="ml-2 text-xs text-gray-500">{node.NODE_TYPE}</span>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => {
                setNewNodeData({
                  NODE_NAME: '',
                  PARENT_ID: String(node.NODE_ID),
                  NODE_TYPE: 'PRODUCT'
                });
                setIsEditModalOpen(true);
              }}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Add Child
            </button>
            <button 
              onClick={() => deleteNode(node.NODE_ID)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-5">
            {node.children!.map(childNode => renderHierarchyNode(childNode, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchHierarchyData();
  }, []);

  // Reset hierarchy
  const resetHierarchy = async () => {
    if (confirm('Are you sure you want to reset the hierarchy? This will delete all existing nodes and restore the default sample data.')) {
      try {
        setIsLoading(true);
        const response = await fetch('/api/hierarchy/reset', {
          method: 'POST'
        });
        const data = await response.json();
        
        if (data.success) {
          showToast('Success', 'Hierarchy reset successfully', 'success');
          fetchHierarchyData();
        } else {
          showToast('Error', data.error || 'Failed to reset hierarchy', 'error');
        }
      } catch (error) {
        showToast('Error', 'Failed to reset hierarchy', 'error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Diagnose hierarchy
  const diagnoseHierarchy = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/hierarchy/diagnose');
      const data = await response.json();
      
      if (data.success) {
        console.log("Hierarchy Diagnosis:", data);
        alert(`Table exists: ${data.tableExists}\nColumns: ${data.tableStructure.map(col => col.COLUMN_NAME).join(', ')}\nSample data: ${data.sampleData.length} rows`);
        showToast('Info', 'Diagnosis complete. Check console for details.', 'info');
      } else {
        showToast('Error', data.error || 'Failed to diagnose hierarchy', 'error');
      }
    } catch (error) {
      showToast('Error', 'Failed to diagnose hierarchy', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 bg-gray-100 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Hierarchy Management</h1>
      
      {/* Toast notification */}
      {toast.visible && (
        <div className={`fixed top-4 right-4 p-4 rounded shadow-lg z-50 ${
          toast.type === 'success' ? 'bg-green-100 border-green-500 text-green-800' : 
          toast.type === 'error' ? 'bg-red-100 border-red-500 text-red-800' : 
          'bg-blue-100 border-blue-500 text-blue-800'
        } border-l-4`}>
          <div className="flex items-center">
            <div className="ml-3">
              <p className="font-bold">{toast.title}</p>
              <p>{toast.message}</p>
            </div>
            <button 
              onClick={() => setToast(prev => ({ ...prev, visible: false }))}
              className="ml-4 text-gray-600 hover:text-gray-800"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Hierarchy Tree */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-700">Product Hierarchy</h2>
            <div className="flex space-x-2">
              <button 
                onClick={fetchHierarchyData}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md border border-gray-300 text-sm"
              >
                Refresh
              </button>
              <button 
                onClick={() => {
                  setNewNodeData({
                    NODE_NAME: '',
                    PARENT_ID: '',
                    NODE_TYPE: 'BUSINESS_UNIT'
                  });
                  setIsEditModalOpen(true);
                }}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
              >
                Add Root Node
              </button>
              <button 
                onClick={resetHierarchy}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ml-2"
              >
                Reset Hierarchy
              </button>
              <button 
                onClick={diagnoseHierarchy}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 ml-2"
              >
                Diagnose
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8 text-gray-700">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
              Loading hierarchy...
            </div>
          ) : hierarchyData.length === 0 ? (
            <div className="text-center py-8 text-gray-700 bg-gray-50 rounded-md border border-gray-200">
              No hierarchy data available.
            </div>
          ) : (
            <div className="border rounded-md p-4 border-gray-300 max-h-[600px] overflow-y-auto">
              {hierarchyData.map(node => renderHierarchyNode(node))}
            </div>
          )}
        </div>
        
        {/* Node Details */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Node Details</h2>
          
          {selectedNode ? (
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-800">{selectedNode.NODE_NAME}</h3>
                <p className="text-sm text-gray-600">Type: {selectedNode.NODE_TYPE}</p>
                <p className="text-sm text-gray-600">ID: {selectedNode.NODE_ID}</p>
                <p className="text-sm text-gray-600">Level: {selectedNode.LEVEL}</p>
                {selectedNode.PARENT_ID && (
                  <p className="text-sm text-gray-600">Parent ID: {selectedNode.PARENT_ID}</p>
                )}
              </div>
              
              <div className="border-t border-gray-300 pt-4 mt-4">
                <h4 className="font-medium mb-2 text-gray-800">Actions</h4>
                <div className="flex flex-col space-y-2">
                  <Link 
                    href={`/products?hierarchy=${selectedNode.NODE_ID}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center"
                  >
                    View Products
                  </Link>
                  <Link 
                    href={`/timephase?hierarchy=${selectedNode.NODE_ID}`}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-center"
                  >
                    View Cycle Times
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-700 bg-gray-50 rounded-md border border-gray-200">
              Select a node to view details.
            </div>
          )}
        </div>
      </div>
      
      {/* Add/Edit Node Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl border border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-700">
                {newNodeData.PARENT_ID ? 'Add Child Node' : 'Add Root Node'}
              </h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Node Name</label>
                <input 
                  type="text"
                  value={newNodeData.NODE_NAME}
                  onChange={(e) => setNewNodeData({...newNodeData, NODE_NAME: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter node name"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Node Type</label>
                <select
                  value={newNodeData.NODE_TYPE}
                  onChange={(e) => setNewNodeData({...newNodeData, NODE_TYPE: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="BUSINESS_UNIT">Business Unit</option>
                  <option value="PRODUCT_CATEGORY">Product Category</option>
                  <option value="TECHNOLOGY_NODE">Technology Node</option>
                  <option value="PRODUCT_LINE">Product Line</option>
                  <option value="PRODUCT">Product</option>
                </select>
              </div>
              
              {newNodeData.PARENT_ID && (
                <div>
                  <label className="block text-gray-700 mb-1">Parent ID</label>
                  <input 
                    type="text"
                    value={newNodeData.PARENT_ID}
                    disabled
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-end mt-6 space-x-2">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={addNewNode}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={!newNodeData.NODE_NAME}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
