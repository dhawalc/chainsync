'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { aiFeatures } from '@/config/ai-features';

export default function AILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <SparklesIcon className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">AI Features</h1>
            </div>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              {showInfo ? 'Hide Info' : 'Show Info'}
            </button>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: showInfo ? 'auto' : 0, opacity: showInfo ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="bg-indigo-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
} 