"use client";

import { PlusIcon, SparklesIcon } from '@heroicons/react/24/outline';
import DynamicBOMModal from '../components/ai/DynamicBOMModal';
import { useState } from 'react';

export default function BOMPage() {
  const [isDynamicBOMModalOpen, setIsDynamicBOMModalOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Bill of Materials</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsDynamicBOMModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <SparklesIcon className="h-5 w-5 mr-2" />
            AI Generate BOM
          </button>
          <button
            onClick={() => {/* existing code */}}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create BOM
          </button>
        </div>
      </div>
      
      <DynamicBOMModal
        isOpen={isDynamicBOMModalOpen}
        onClose={() => setIsDynamicBOMModalOpen(false)}
      />
    </div>
  );
} 