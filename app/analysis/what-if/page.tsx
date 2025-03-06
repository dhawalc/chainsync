'use client';

import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function WhatIfAnalysisPage() {
  return (
    <div className="container mx-auto py-8 px-4 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">What-If Analysis</h1>
        <p className="text-lg text-gray-800 max-w-3xl">
          Simulate different supply chain scenarios to understand potential impacts
        </p>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 text-center">
        <ArrowPathIcon className="h-20 w-20 text-indigo-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon</h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          The What-If Analysis tool is currently under development. 
          Check back soon to simulate different scenarios and make more informed decisions.
        </p>
      </div>
    </div>
  );
} 