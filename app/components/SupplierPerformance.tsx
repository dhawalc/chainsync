'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

interface Supplier {
  id: string;
  name: string;
  category: string;
  performance_score: number;
  on_time_delivery_rate: number;
  quality_rating: number;
  status: 'Active' | 'Inactive' | 'Under Review';
}

export default function SupplierPerformance() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSuppliers = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/suppliers');
        const data = await response.json();
        
        if (data.success) {
          // Sort by performance score (descending)
          const sortedSuppliers = data.data
            .sort((a: Supplier, b: Supplier) => b.performance_score - a.performance_score)
            .slice(0, 5); // Get top 5 suppliers
          
          setSuppliers(sortedSuppliers);
        } else {
          setError(data.error || 'Failed to fetch supplier data');
        }
      } catch (error) {
        console.error('Error fetching supplier data:', error);
        setError('Failed to fetch supplier data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSuppliers();
  }, []);
  
  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get performance score color
  const getPerformanceScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    if (score >= 60) return 'text-orange-500';
    return 'text-red-500';
  };
  
  // Prepare chart data
  const chartData = suppliers.map(supplier => ({
    name: supplier.name.length > 15 ? supplier.name.substring(0, 15) + '...' : supplier.name,
    score: supplier.performance_score,
    delivery: supplier.on_time_delivery_rate,
    quality: supplier.quality_rating * 10 // Convert to percentage
  }));
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Top Supplier Performance</h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      ) : suppliers.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No supplier data available.</p>
        </div>
      ) : (
        <>
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" name="Performance Score" fill="#3b82f6" />
                <Bar dataKey="delivery" name="On-Time Delivery" fill="#10b981" />
                <Bar dataKey="quality" name="Quality Rating" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Supplier</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Performance</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {suppliers.map(supplier => (
                  <tr key={supplier.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-800">{supplier.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{supplier.category}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`text-sm font-semibold ${getPerformanceScoreColor(supplier.performance_score)}`}>
                        {supplier.performance_score}%
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(supplier.status)}`}>
                        {supplier.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
} 