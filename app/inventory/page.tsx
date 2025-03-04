'use client';

import { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

interface InventoryItem {
  id: string;
  product_id: string;
  product_name: string;
  category: string;
  location: string;
  quantity: number;
  unit_cost: number;
  reorder_point: number;
  optimal_stock: number;
  last_updated: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Overstocked';
}

interface InventoryHistory {
  date: string;
  quantity: number;
  product_id: string;
}

export default function InventoryManagement() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [inventoryHistory, setInventoryHistory] = useState<InventoryHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [toast, setToast] = useState<{ visible: boolean, title: string, message: string, type: 'success' | 'error' | 'info' }>({
    visible: false,
    title: '',
    message: '',
    type: 'info'
  });
  
  // Fetch inventory data
  useEffect(() => {
    const fetchInventoryData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/inventory');
        const data = await response.json();
        
        if (data.success) {
          setInventoryItems(data.data);
          
          // If we have history data
          if (data.history) {
            setInventoryHistory(data.history);
          }
        } else {
          showToast('Error', data.error || 'Failed to fetch inventory data', 'error');
        }
      } catch (error) {
        console.error('Error fetching inventory data:', error);
        showToast('Error', 'Failed to fetch inventory data', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInventoryData();
  }, []);
  
  // Show toast notification
  const showToast = (title: string, message: string, type: 'success' | 'error' | 'info') => {
    setToast({ visible: true, title, message, type });
    setTimeout(() => {
      setToast({ ...toast, visible: false });
    }, 3000);
  };
  
  // Get unique categories
  const uniqueCategories = Array.from(new Set(inventoryItems.map(item => item.category)));
  
  // Get unique locations
  const uniqueLocations = Array.from(new Set(inventoryItems.map(item => item.location)));
  
  // Filter inventory items
  const filteredItems = inventoryItems.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedLocation !== 'all' && item.location !== selectedLocation) return false;
    if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;
    if (searchQuery && !item.product_name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.product_id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });
  
  // Calculate inventory metrics
  const totalInventoryValue = filteredItems.reduce((sum, item) => sum + (item.quantity * item.unit_cost), 0);
  const totalItems = filteredItems.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = filteredItems.filter(item => item.status === 'Low Stock').length;
  const outOfStockItems = filteredItems.filter(item => item.status === 'Out of Stock').length;
  
  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      case 'Overstocked':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Handle quantity change
  const handleQuantityChange = (id: string, value: string) => {
    const numValue = parseInt(value);
    if (isNaN(numValue)) return;
    
    setInventoryItems(items => 
      items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, quantity: numValue };
          
          // Update status based on quantity
          if (numValue <= 0) {
            updatedItem.status = 'Out of Stock';
          } else if (numValue < item.reorder_point) {
            updatedItem.status = 'Low Stock';
          } else if (numValue > item.optimal_stock * 1.2) {
            updatedItem.status = 'Overstocked';
          } else {
            updatedItem.status = 'In Stock';
          }
          
          return updatedItem;
        }
        return item;
      })
    );
  };
  
  // Handle reorder point change
  const handleReorderPointChange = (id: string, value: string) => {
    const numValue = parseInt(value);
    if (isNaN(numValue)) return;
    
    setInventoryItems(items => 
      items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, reorder_point: numValue };
          
          // Update status based on new reorder point
          if (item.quantity <= 0) {
            updatedItem.status = 'Out of Stock';
          } else if (item.quantity < numValue) {
            updatedItem.status = 'Low Stock';
          } else if (item.quantity > item.optimal_stock * 1.2) {
            updatedItem.status = 'Overstocked';
          } else {
            updatedItem.status = 'In Stock';
          }
          
          return updatedItem;
        }
        return item;
      })
    );
  };
  
  // Save inventory changes
  const saveInventoryChanges = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: inventoryItems })
      });
      
      const data = await response.json();
      
      if (data.success) {
        showToast('Success', 'Inventory updated successfully', 'success');
      } else {
        showToast('Error', data.error || 'Failed to update inventory', 'error');
      }
    } catch (error) {
      console.error('Error updating inventory:', error);
      showToast('Error', 'Failed to update inventory', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  // View product history
  const viewProductHistory = (productId: string) => {
    setSelectedProduct(productId);
  };
  
  // Get product history data
  const getProductHistoryData = () => {
    if (!selectedProduct) return [];
    
    return inventoryHistory
      .filter(history => history.product_id === selectedProduct)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Inventory Management</h1>
      
      {/* Toast Notification */}
      {toast.visible && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md ${
          toast.type === 'success' ? 'bg-green-50 border-l-4 border-green-500' :
          toast.type === 'error' ? 'bg-red-50 border-l-4 border-red-500' :
          'bg-blue-50 border-l-4 border-blue-500'
        }`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {toast.type === 'success' && (
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {toast.type === 'error' && (
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              {toast.type === 'info' && (
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-800">{toast.title}</h3>
              <div className="mt-1 text-sm text-gray-700">{toast.message}</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Inventory Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 uppercase">Total Inventory Value</h2>
          <p className="mt-2 text-3xl font-bold text-blue-700">{formatCurrency(totalInventoryValue)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 uppercase">Total Items</h2>
          <p className="mt-2 text-3xl font-bold text-blue-700">{totalItems.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 uppercase">Low Stock Items</h2>
          <p className="mt-2 text-3xl font-bold text-yellow-600">{lowStockItems}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-sm font-medium text-gray-500 uppercase">Out of Stock Items</h2>
          <p className="mt-2 text-3xl font-bold text-red-600">{outOfStockItems}</p>
        </div>
      </div>
      
      {/* Filters and Actions */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-gray-200">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="location-filter" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                id="location-filter"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Locations</option>
                {uniqueLocations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="status-filter"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Overstocked">Overstocked</option>
              </select>
            </div>
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                id="search"
                type="text"
                placeholder="Search by name or ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <button
              onClick={saveInventoryChanges}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Product History Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-700">
                  Inventory History: {inventoryItems.find(item => item.product_id === selectedProduct)?.product_name}
                </h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="h-80 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={getProductHistoryData()}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(date) => formatDate(date)}
                      formatter={(value) => [value, 'Quantity']}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="quantity" stroke="#3b82f6" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getProductHistoryData().map((history, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {formatDate(history.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {history.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Reorder Point
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="ml-2">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                    No inventory items found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                      {item.product_name}
                      <div className="text-xs text-gray-500">{item.product_id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 w-24 bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={item.reorder_point}
                        onChange={(e) => handleReorderPointChange(item.id, e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 w-24 bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {formatCurrency(item.quantity * item.unit_cost)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      <button
                        onClick={() => viewProductHistory(item.product_id)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View History
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 