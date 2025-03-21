'use client';

import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { SparklesIcon, XMarkIcon, ChartBarIcon, ArrowUpIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface DemandInsight {
  id: string;
  type: 'trend' | 'anomaly' | 'forecast';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  recommendation: string;
  confidence: number;
}

interface DemandInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemandInsightsModal({
  isOpen,
  onClose,
}: DemandInsightsModalProps) {
  const [insights, setInsights] = useState<DemandInsight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('last_12_months');
  const [productCategory, setProductCategory] = useState('all');

  const generateInsights = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Generating demand insights...');
      const response = await fetch('/api/ai/demand/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeRange,
          productCategory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate insights');
      }

      const data = await response.json();
      console.log('Received insights:', data);
      setInsights(data.insights);
    } catch (err) {
      console.error('Error generating insights:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend':
        return <ArrowUpIcon className="h-6 w-6 text-blue-500" />;
      case 'anomaly':
        return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />;
      case 'forecast':
        return <ChartBarIcon className="h-6 w-6 text-green-500" />;
      default:
        return <SparklesIcon className="h-6 w-6 text-indigo-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start mb-6">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                    <SparklesIcon className="h-5 w-5 text-indigo-500 mr-2" />
                    AI Demand Insights
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {error && (
                  <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
                    {error}
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700">
                        Time Range
                      </label>
                      <select
                        id="timeRange"
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="last_3_months">Last 3 Months</option>
                        <option value="last_6_months">Last 6 Months</option>
                        <option value="last_12_months">Last 12 Months</option>
                        <option value="last_24_months">Last 24 Months</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700">
                        Product Category
                      </label>
                      <select
                        id="productCategory"
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="all">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="apparel">Apparel</option>
                        <option value="furniture">Furniture</option>
                        <option value="food">Food & Beverage</option>
                      </select>
                    </div>
                  </div>
                </div>

                {!insights.length && !isLoading && (
                  <div className="text-center py-12">
                    <SparklesIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No insights generated</h3>
                    <p className="mt-1 text-sm text-gray-500">Generate insights to see demand patterns and recommendations.</p>
                    <div className="mt-6">
                      <button
                        onClick={generateInsights}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <SparklesIcon className="h-5 w-5 mr-2" />
                        Generate Insights
                      </button>
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                    <p className="mt-4 text-sm text-gray-500">Analyzing demand patterns...</p>
                  </div>
                )}

                {insights.length > 0 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      {insights.map((insight) => (
                        <div
                          key={insight.id}
                          className="bg-white border rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              {getInsightIcon(insight.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                  {insight.title}
                                </p>
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(
                                    insight.impact
                                  )}`}
                                >
                                  {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)} Impact
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {insight.description}
                              </p>
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-900">Recommendation</h4>
                                <p className="mt-1 text-sm text-gray-500">
                                  {insight.recommendation}
                                </p>
                              </div>
                              <div className="mt-4 flex items-center">
                                <div className="flex-1">
                                  <div className="bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-indigo-600 rounded-full h-2"
                                      style={{ width: `${insight.confidence}%` }}
                                    />
                                  </div>
                                </div>
                                <span className="ml-2 text-sm text-gray-500">
                                  {insight.confidence}% confidence
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        onClick={generateInsights}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Regenerate
                      </button>
                      <button
                        onClick={onClose}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 