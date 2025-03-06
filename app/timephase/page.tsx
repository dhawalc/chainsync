'use client';

import { useState, useEffect } from 'react';

// Define types for our data
interface Product {
  PRODUCT_ID: string | number;
  DESCRIPTION?: string;
}

interface CycleTimeData {
  PRODUCT_ID: string | number;
  START_DATE: string;
  END_DATE: string;
  CYCLE_TIME: number;
  isEdited?: boolean;
}

interface ProductGroup {
  groupName: string;
  products: Product[];
}

export default function TimePhaseManagement() {
  // State for selected time bucket
  const [selectedBucket, setSelectedBucket] = useState('WEEKLY');
  
  // State for cycle time data
  const [cycleTimeData, setCycleTimeData] = useState<CycleTimeData[]>([]);
  
  // State for products
  const [products, setProducts] = useState<Product[]>([]);
  
  // State for selected products
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  // State for product groups
  const [productGroups, setProductGroups] = useState<ProductGroup[]>([]);
  
  // State for loading
  const [isLoading, setIsLoading] = useState(false);
  
  // State for saving
  const [isSaving, setIsSaving] = useState(false);
  
  // State for dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // State for toast
  const [toast, setToast] = useState<{ visible: boolean, title: string, message: string, type: 'success' | 'error' | 'info' }>({
    visible: false,
    title: '',
    message: '',
    type: 'info'
  });

  // Fetch cycle time data when bucket changes
  useEffect(() => {
    fetchCycleTimeData();
  }, [selectedBucket]);
  
  // Hide toast after 3 seconds
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, visible: false }));
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  // Show toast message
  const showToast = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({
      visible: true,
      title,
      message,
      type
    });
  };

  // Fetch cycle time data
  const fetchCycleTimeData = async () => {
    setIsLoading(true);
    try {
      // Build the URL with bucket and selected products
      let url = `/api/timephase?bucket=${selectedBucket}`;
      
      // Only add product filter if products are selected
      if (selectedProducts.length > 0) {
        url += `&products=${selectedProducts.join(',')}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setCycleTimeData(data.data);
      } else {
        showToast('Error', data.error || 'Failed to fetch cycle time data', 'error');
      }
    } catch (error) {
      console.error('Error fetching cycle time data:', error);
      showToast('Error', 'Failed to fetch cycle time data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cycle time change
  const handleCycleTimeChange = (productId: string | number, value: string) => {
    setCycleTimeData(prevData => 
      prevData.map(item => 
        item.PRODUCT_ID === productId 
          ? { ...item, CYCLE_TIME: Number(value), isEdited: true } 
          : item
      )
    );
  };

  // Save changes
  const saveChanges = async () => {
    setIsSaving(true);
    try {
      // Filter only edited rows
      const editedData = cycleTimeData.filter(item => item.isEdited);
      
      if (editedData.length === 0) {
        showToast('No changes', 'No changes to save', 'info');
        setIsSaving(false);
        return;
      }
      
      const response = await fetch('/api/timephase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bucket: selectedBucket,
          data: editedData,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        showToast('Success', 'Changes saved successfully', 'success');
        
        // Reset isEdited flag
        setCycleTimeData(prevData => 
          prevData.map(item => ({ ...item, isEdited: false }))
        );
      } else {
        showToast('Error', result.error || 'Failed to save changes', 'error');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      showToast('Error', 'Failed to save changes', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle product selection
  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Fetch products for selection
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/timephase');
      const data = await response.json();
      
      if (data.success) {
        // Extract unique products from cycle time data
        const uniqueProductIds = new Set();
        const uniqueProducts: Product[] = []; // Add type annotation here
        
        data.cycleTimeData.forEach((item: any) => {
          if (!uniqueProductIds.has(item.PRODUCT_ID)) {
            uniqueProductIds.add(item.PRODUCT_ID);
            // Explicitly cast each product to the Product type
            uniqueProducts.push({
              PRODUCT_ID: item.PRODUCT_ID,
              name: item.PRODUCT_NAME,
              description: item.PRODUCT_DESCRIPTION || '',
              category: item.CATEGORY || '',
              subcategory: item.SUBCATEGORY || '',
            });
          }
        });
        
        setProductGroups([{
          groupName: 'Available Products',
          products: uniqueProducts
        }]);
      } else {
        showToast('Error', 'No products found', 'error');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      showToast('Error', 'Failed to fetch products', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchCycleTimeData();
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-6 px-4 bg-gray-100 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Time-Phased Cycle Time Management</h1>
      
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
      
      <div className="grid grid-cols-1 gap-6">
        {/* Time Bucket Selection */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Select Time Bucket</h2>
          <div className="flex items-center space-x-4">
            <select
              value={selectedBucket}
              onChange={(e) => {
                setSelectedBucket(e.target.value);
                // Refresh products when bucket changes
                setTimeout(() => fetchProducts(), 100);
              }}
              className="border border-gray-300 rounded-md px-3 py-2 w-48 text-gray-800 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="WEEKLY">Weekly</option>
              <option value="MONTHLY">Monthly</option>
              <option value="QUARTERLY">Quarterly</option>
              <option value="YEARLY">Yearly</option>
            </select>
            
            <button 
              onClick={fetchCycleTimeData} 
              disabled={isLoading}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md disabled:opacity-50 border border-gray-300 font-medium"
            >
              {isLoading ? 'Loading...' : 'Refresh Data'}
            </button>
            
            <button 
              onClick={() => {
                fetchProducts();
                setIsDialogOpen(true);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
            >
              Select Products
            </button>
          </div>
        </div>
        
        {/* Product Selection Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl border border-gray-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-700">Select Products</h2>
                <button 
                  onClick={() => setIsDialogOpen(false)}
                  className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <p className="text-gray-700 mb-4">Choose products to display in the cycle time table.</p>
              
              <div className="max-h-[400px] overflow-y-auto">
                {productGroups.length === 0 ? (
                  <div className="text-center py-8 text-gray-700 bg-gray-50 rounded-md border border-gray-200">
                    No products available. Try changing the time bucket.
                  </div>
                ) : (
                  productGroups.map((group, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-medium mb-2 text-blue-600">{group.groupName}</h3>
                      <div className="space-y-2">
                        {group.products.map((product) => (
                          <div key={product.PRODUCT_ID} className="flex items-center space-x-2">
                            <input 
                              type="checkbox"
                              id={`product-${product.PRODUCT_ID}`}
                              checked={selectedProducts.includes(String(product.PRODUCT_ID))}
                              onChange={() => toggleProductSelection(String(product.PRODUCT_ID))}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`product-${product.PRODUCT_ID}`} className="text-gray-800">
                              {product.DESCRIPTION || `Product ${product.PRODUCT_ID}`}
                            </label>
                          </div>
                        ))}
                      </div>
                      {index < productGroups.length - 1 && <hr className="my-4 border-gray-300" />}
                    </div>
                  ))
                )}
              </div>
              
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => {
                    setSelectedProducts([]);
                    fetchCycleTimeData();
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium"
                >
                  Clear Selection
                </button>
                <button 
                  onClick={() => {
                    setIsDialogOpen(false);
                    fetchCycleTimeData();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Cycle Time Data Table */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-700">Cycle Time Data</h2>
            <button 
              onClick={saveChanges} 
              disabled={isSaving}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 font-medium"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8 text-gray-700">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
              Loading data...
            </div>
          ) : cycleTimeData.length === 0 ? (
            <div className="text-center py-8 text-gray-700 bg-gray-50 rounded-md border border-gray-200">
              No data available for the selected time bucket.
            </div>
          ) : (
            <div className="border rounded-md overflow-x-auto border-gray-300 shadow">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                      Product ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                      Cycle Time (Days)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cycleTimeData.map((item, index) => (
                    <tr key={index} className={item.isEdited ? "bg-blue-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                        {item.PRODUCT_ID}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                        {formatDate(item.START_DATE)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                        {formatDate(item.END_DATE)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          value={item.CYCLE_TIME}
                          onChange={(e) => handleCycleTimeChange(item.PRODUCT_ID, e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-1 w-24 bg-white text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
