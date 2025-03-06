'use client';

import { ChartBarIcon } from '@heroicons/react/24/outline';

export default function PerformanceDashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Performance Dashboard</h1>
        <p className="text-lg text-gray-800 max-w-3xl">
          Monitor key performance indicators and track supply chain metrics
        </p>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 text-center">
        <ChartBarIcon className="h-20 w-20 text-indigo-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon</h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          The Performance Dashboard is currently under development. 
          Check back soon for powerful analytics and visualization tools.
        </p>
      </div>
    </div>
  );
} 