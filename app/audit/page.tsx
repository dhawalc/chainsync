// app/audit/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface AuditRecord {
  AUDIT_ID: string | number;
  TABLE_NAME: string;
  RECORD_ID: string | number;
  FIELD_NAME: string;
  OLD_VALUE: string | null;
  NEW_VALUE: string | null;
  CHANGE_TYPE: 'INSERT' | 'UPDATE' | 'DELETE';
  CHANGED_BY: string;
  CHANGE_DATE: string;
}

export default function AuditTrail() {
  const [auditData, setAuditData] = useState<AuditRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    tableName: '',
    recordId: '',
    changeType: '',
    changedBy: '',
    startDate: '',
    endDate: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 20,
    totalCount: 0
  });
  const [toast, setToast] = useState<{ visible: boolean, title: string, message: string, type: 'success' | 'error' | 'info' }>({
    visible: false,
    title: '',
    message: '',
    type: 'info'
  });
  const [permissionError, setPermissionError] = useState(false);

  // Fetch audit data on component mount
  useEffect(() => {
    fetchAuditData();
  }, []);

  // Fetch audit data
  const fetchAuditData = async (page = 1) => {
    setIsLoading(true);
    try {
      // Build the URL with all filters
      let url = `/api/audit?page=${page}&pageSize=${pagination.pageSize}`;
      
      if (filters.tableName) url += `&tableName=${filters.tableName}`;
      if (filters.recordId) url += `&recordId=${filters.recordId}`;
      if (filters.changeType) url += `&changeType=${filters.changeType}`;
      if (filters.changedBy) url += `&changedBy=${filters.changedBy}`;
      if (filters.startDate) url += `&startDate=${filters.startDate}`;
      if (filters.endDate) url += `&endDate=${filters.endDate}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setAuditData(data.data);
        setPagination({
          currentPage: page,
          totalPages: data.totalPages,
          pageSize: pagination.pageSize,
          totalCount: data.totalCount
        });
      } else {
        // Handle the error gracefully
        setAuditData([]);
        setPagination({
          currentPage: 1,
          totalPages: 0,
          pageSize: 20,
          totalCount: 0
        });
        showToast('Error', data.error || 'Failed to fetch audit data', 'error');
        
        // If it's a permissions error, show a more helpful message
        if (response.status === 403) {
          setPermissionError(true);
        }
      }
    } catch (error) {
      console.error('Error fetching audit data:', error);
      setAuditData([]);
      setPagination({
        currentPage: 1,
        totalPages: 0,
        pageSize: 20,
        totalCount: 0
      });
      showToast('Error', 'Failed to fetch audit data', 'error');
    } finally {
      setIsLoading(false);
    }
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

  // Handle filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Apply filters
  const applyFilters = () => {
    fetchAuditData(1);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      tableName: '',
      recordId: '',
      changeType: '',
      changedBy: '',
      startDate: '',
      endDate: ''
    });
    fetchAuditData(1);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Get change type badge color
  const getChangeTypeBadgeColor = (changeType: string) => {
    switch (changeType) {
      case 'INSERT':
        return 'bg-green-100 text-green-800';
      case 'UPDATE':
        return 'bg-blue-100 text-blue-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchAuditData(newPage);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Audit Trail</h1>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This page is currently using mock data for demonstration purposes. In a production environment, this would display actual audit records from the database.
            </p>
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      {toast.visible && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
          toast.type === 'success' ? 'bg-green-50 border-l-4 border-green-500' :
          toast.type === 'error' ? 'bg-red-50 border-l-4 border-red-500' :
          'bg-blue-50 border-l-4 border-blue-500'
        }`}>
          <div className="flex items-start">
            <div className="ml-3">
              <h3 className={`text-sm font-medium ${
                toast.type === 'success' ? 'text-green-800' :
                toast.type === 'error' ? 'text-red-800' :
                'text-blue-800'
              }`}>
                {toast.title}
              </h3>
              <div className={`mt-1 text-sm ${
                toast.type === 'success' ? 'text-green-700' :
                toast.type === 'error' ? 'text-red-700' :
                'text-blue-700'
              }`}>
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => setToast(prev => ({ ...prev, visible: false }))}
              className="ml-auto -mx-1.5 -my-1.5 rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <span className="sr-only">Dismiss</span>
              <svg className={`h-5 w-5 ${
                toast.type === 'success' ? 'text-green-500' :
                toast.type === 'error' ? 'text-red-500' :
                'text-blue-500'
              }`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Filters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Table Name</label>
            <input 
              type="text"
              name="tableName"
              value={filters.tableName}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. PRODUCT_MASTER"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Record ID</label>
            <input 
              type="text"
              name="recordId"
              value={filters.recordId}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 1001"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Change Type</label>
            <select
              name="changeType"
              value={filters.changeType}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="INSERT">Insert</option>
              <option value="UPDATE">Update</option>
              <option value="DELETE">Delete</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Changed By</label>
            <input 
              type="text"
              name="changedBy"
              value={filters.changedBy}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. john.doe@example.com"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Start Date</label>
            <input 
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 text-sm">End Date</label>
            <input 
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-4 space-x-2">
          <button 
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Reset
          </button>
          <button 
            onClick={applyFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
      
      {/* Audit Data Table */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-700">Audit Records</h2>
          <button 
            onClick={() => fetchAuditData(pagination.currentPage)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md border border-gray-300"
          >
            Refresh
          </button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8 text-gray-700">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
            Loading audit data...
          </div>
        ) : permissionError ? (
          <div className="text-center py-8 text-red-700 bg-red-50 rounded-md border border-red-200 p-4">
            <h3 className="text-lg font-semibold mb-2">Permission Error</h3>
            <p>You do not have permission to access the audit trail.</p>
            <p className="mt-2">Please contact your administrator to request access.</p>
          </div>
        ) : auditData.length === 0 ? (
          <div className="text-center py-8 text-gray-700 bg-gray-50 rounded-md border border-gray-200">
            No audit records found matching your criteria.
          </div>
        ) : (
          <>
            <div className="border rounded-md overflow-x-auto border-gray-300 shadow">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                      Table
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                      Record ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                      Field
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                      Change
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                      User
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {auditData.map((record) => (
                    <tr key={record.AUDIT_ID} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {formatDate(record.CHANGE_DATE)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {record.TABLE_NAME}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {record.RECORD_ID}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {record.FIELD_NAME}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        <div className="flex flex-col">
                          {record.OLD_VALUE !== null && (
                            <span className="line-through text-red-600">{record.OLD_VALUE}</span>
                          )}
                          {record.NEW_VALUE !== null && (
                            <span className="text-green-600">{record.NEW_VALUE}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getChangeTypeBadgeColor(record.CHANGE_TYPE)}`}>
                          {record.CHANGE_TYPE}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {record.CHANGED_BY}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-700">
                Showing page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalCount} records)
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handlePageChange(1)}
                  disabled={pagination.currentPage === 1}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                  First
                </button>
                <button 
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>
                <button 
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
                <button 
                  onClick={() => handlePageChange(pagination.totalPages)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                  Last
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
