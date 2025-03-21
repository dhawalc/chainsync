import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { SparklesIcon, XMarkIcon, ChartBarIcon, ArrowUpIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface OptimizationResult {
  id: string;
  type: 'reorder' | 'allocation' | 'cost';
  product: string;
  currentLevel: number;
  recommendedLevel: number;
  potentialSavings: number;
  stockoutRisk: number;
  holdingCost: number;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
}

interface InventoryOptimizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InventoryOptimizationModal({
  isOpen,
  onClose,
}: InventoryOptimizationModalProps) {
  const [results, setResults] = useState<OptimizationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warehouse, setWarehouse] = useState('all');
  const [optimizationTarget, setOptimizationTarget] = useState('cost');

  const generateOptimization = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Generating inventory optimization...');
      const response = await fetch('/api/ai/inventory/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          warehouse,
          optimizationTarget,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate optimization');
      }

      const data = await response.json();
      console.log('Received optimization:', data);
      setResults(data.results);
    } catch (err) {
      console.error('Error in optimization:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reorder':
        return <ArrowUpIcon className="h-6 w-6 text-blue-500" />;
      case 'allocation':
        return <ChartBarIcon className="h-6 w-6 text-green-500" />;
      case 'cost':
        return <CurrencyDollarIcon className="h-6 w-6 text-yellow-500" />;
      default:
        return <SparklesIcon className="h-6 w-6 text-indigo-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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
                    AI Inventory Optimization
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
                      <label htmlFor="warehouse" className="block text-sm font-medium text-gray-700">
                        Warehouse
                      </label>
                      <select
                        id="warehouse"
                        value={warehouse}
                        onChange={(e) => setWarehouse(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="all">All Warehouses</option>
                        <option value="north">North Warehouse</option>
                        <option value="south">South Warehouse</option>
                        <option value="east">East Warehouse</option>
                        <option value="west">West Warehouse</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="optimizationTarget" className="block text-sm font-medium text-gray-700">
                        Optimization Target
                      </label>
                      <select
                        id="optimizationTarget"
                        value={optimizationTarget}
                        onChange={(e) => setOptimizationTarget(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="cost">Cost Reduction</option>
                        <option value="service">Service Level</option>
                        <option value="space">Space Utilization</option>
                        <option value="turnover">Inventory Turnover</option>
                      </select>
                    </div>
                  </div>
                </div>

                {!results.length && !isLoading && (
                  <div className="text-center py-12">
                    <SparklesIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No optimization results</h3>
                    <p className="mt-1 text-sm text-gray-500">Generate optimization insights to improve inventory management.</p>
                    <div className="mt-6">
                      <button
                        onClick={generateOptimization}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <SparklesIcon className="h-5 w-5 mr-2" />
                        Generate Optimization
                      </button>
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                    <p className="mt-4 text-sm text-gray-500">Analyzing inventory data...</p>
                  </div>
                )}

                {results.length > 0 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      {results.map((result) => (
                        <div
                          key={result.id}
                          className="bg-white border rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              {getTypeIcon(result.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                  {result.product}
                                </p>
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                                    result.priority
                                  )}`}
                                >
                                  {result.priority.charAt(0).toUpperCase() + result.priority.slice(1)} Priority
                                </span>
                              </div>
                              <div className="mt-2 grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500">Current Level</p>
                                  <p className="text-sm font-medium text-gray-900">{result.currentLevel} units</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Recommended Level</p>
                                  <p className="text-sm font-medium text-gray-900">{result.recommendedLevel} units</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Potential Savings</p>
                                  <p className="text-sm font-medium text-green-600">${result.potentialSavings.toFixed(2)}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Stockout Risk</p>
                                  <p className="text-sm font-medium text-gray-900">{result.stockoutRisk}%</p>
                                </div>
                              </div>
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-900">Recommendation</h4>
                                <p className="mt-1 text-sm text-gray-500">
                                  {result.recommendation}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        onClick={generateOptimization}
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