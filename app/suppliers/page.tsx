import React from 'react';

export default function SuppliersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Supplier Management</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Supplier Directory</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Supplier Name</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Lead Time (Days)</th>
                  <th className="py-3 px-4 text-left">Reliability Score</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { name: 'Acme Components', location: 'Chicago, IL', category: 'Electronics', leadTime: 14, reliability: 92, status: 'Active' },
                  { name: 'Global Materials', location: 'Shanghai, China', category: 'Raw Materials', leadTime: 30, reliability: 85, status: 'Active' },
                  { name: 'Tech Solutions Inc', location: 'Austin, TX', category: 'Semiconductors', leadTime: 21, reliability: 90, status: 'Active' },
                  { name: 'Precision Parts', location: 'Detroit, MI', category: 'Mechanical', leadTime: 10, reliability: 95, status: 'Active' },
                  { name: 'EcoPackaging', location: 'Portland, OR', category: 'Packaging', leadTime: 7, reliability: 88, status: 'Active' },
                ].map((supplier, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{supplier.name}</td>
                    <td className="py-3 px-4">{supplier.location}</td>
                    <td className="py-3 px-4">{supplier.category}</td>
                    <td className="py-3 px-4">{supplier.leadTime}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="mr-2">{supplier.reliability}%</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              supplier.reliability >= 90 ? 'bg-green-500' : 
                              supplier.reliability >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${supplier.reliability}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {supplier.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Supplier Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">On-Time Delivery</h3>
              <p className="text-2xl font-bold">87%</p>
              <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Quality Compliance</h3>
              <p className="text-2xl font-bold">93%</p>
              <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Cost Variance</h3>
              <p className="text-2xl font-bold">+2.4%</p>
              <p className="text-sm text-gray-500 mt-1">vs. Last Quarter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 