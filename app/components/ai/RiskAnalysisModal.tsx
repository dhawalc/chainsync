import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ShieldExclamationIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Risk {
  id: string;
  category: 'supply' | 'demand' | 'inventory' | 'quality' | 'logistics';
  severity: 'high' | 'medium' | 'low';
  probability: 'high' | 'medium' | 'low';
  description: string;
  impact: string;
  mitigation: string;
}

interface RiskAnalysis {
  risks: Risk[];
  summary: string;
  riskScore: number;
}

interface RiskAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
  supplyData: any;
  demandData: any;
  inventoryData: any;
}

export default function RiskAnalysisModal({
  isOpen,
  onClose,
  productId,
  supplyData,
  demandData,
  inventoryData
}: RiskAnalysisModalProps) {
  const [analysis, setAnalysis] = useState<RiskAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRiskAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Sending risk analysis request...');
      const response = await fetch('/api/ai/risk-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          supplyData,
          demandData,
          inventoryData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate risk analysis');
      }

      const data = await response.json();
      console.log('Received risk analysis:', data);
      setAnalysis(data);
    } catch (err) {
      console.error('Error in risk analysis:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'supply': return '🏭';
      case 'demand': return '📊';
      case 'inventory': return '📦';
      case 'quality': return '⭐';
      case 'logistics': return '🚚';
      default: return '⚠️';
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
                    <ShieldExclamationIcon className="h-5 w-5 text-red-500 mr-2" />
                    Supply Chain Risk Analysis
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

                {!analysis && !isLoading && (
                  <div className="text-center py-12">
                    <ShieldExclamationIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No risk analysis generated</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by generating an AI risk analysis of your supply chain data.</p>
                    <div className="mt-6">
                      <button
                        onClick={generateRiskAnalysis}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <ShieldExclamationIcon className="h-5 w-5 mr-2" />
                        Generate Risk Analysis
                      </button>
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
                    <p className="mt-4 text-sm text-gray-500">Analyzing supply chain risks...</p>
                  </div>
                )}

                {analysis && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-medium text-gray-900">Risk Analysis Summary</h4>
                        <div className="bg-white px-3 py-1 rounded-full border">
                          <span className="text-sm font-medium">Risk Score: </span>
                          <span className={`text-sm font-bold ${analysis.riskScore > 70 ? 'text-red-600' : analysis.riskScore > 40 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {analysis.riskScore}/100
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600">{analysis.summary}</p>
                    </div>

                    {analysis.risks.map((risk) => (
                      <div
                        key={risk.id}
                        className="bg-white rounded-lg border border-gray-200 p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl" role="img" aria-label={risk.category}>
                              {getCategoryIcon(risk.category)}
                            </span>
                            <div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(risk.severity)}`}>
                                {risk.severity.toUpperCase()}
                              </span>
                              <span className="ml-2 text-sm text-gray-500">
                                {risk.category.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-500">Probability:</span>
                            <span className={`ml-1 font-medium ${getSeverityColor(risk.probability)}`}>
                              {risk.probability.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">{risk.description}</p>
                        <div className="space-y-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-900">Potential Impact:</h5>
                            <p className="mt-1 text-gray-600">{risk.impact}</p>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-900">Recommended Mitigation:</h5>
                            <p className="mt-1 text-gray-600">{risk.mitigation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        onClick={generateRiskAnalysis}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Refresh Analysis
                      </button>
                      <button
                        onClick={onClose}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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