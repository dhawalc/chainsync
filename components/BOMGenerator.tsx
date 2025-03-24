'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface BOMItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  cost: number;
  leadTime: string;
  supplier: string;
  alternativeSuppliers: string[];
}

interface GeneratedBOM {
  items: BOMItem[];
  totalCost: number;
  estimatedLeadTime: string;
  sustainabilityScore: number;
  recommendations: string[];
}

export default function BOMGenerator() {
  const [productDescription, setProductDescription] = useState('');
  const [constraints, setConstraints] = useState({
    maxCost: '',
    preferredSuppliers: '',
    location: '',
    sustainabilityTarget: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBOM, setGeneratedBOM] = useState<GeneratedBOM | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const response = await fetch('/api/ai/bom/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: productDescription,
          constraints: {
            maxCost: constraints.maxCost ? parseFloat(constraints.maxCost) : undefined,
            preferredSuppliers: constraints.preferredSuppliers
              .split(',')
              .map(s => s.trim())
              .filter(Boolean),
            location: constraints.location,
            sustainabilityTarget: constraints.sustainabilityTarget,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate BOM');
      }

      const data = await response.json();
      setGeneratedBOM(data);
    } catch (err) {
      console.error('Error generating BOM:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate BOM');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedBOM) return;
    
    const bomText = JSON.stringify(generatedBOM, null, 2);
    navigator.clipboard.writeText(bomText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate BOM</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Description
            </label>
            <Textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              rows={4}
              placeholder="Describe the product you want to create a BOM for..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Cost
              </label>
              <Input
                type="number"
                value={constraints.maxCost}
                onChange={(e) => setConstraints({ ...constraints, maxCost: e.target.value })}
                placeholder="Enter maximum cost..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Suppliers
              </label>
              <Input
                type="text"
                value={constraints.preferredSuppliers}
                onChange={(e) => setConstraints({ ...constraints, preferredSuppliers: e.target.value })}
                placeholder="Enter suppliers (comma-separated)..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manufacturing Location
              </label>
              <Input
                type="text"
                value={constraints.location}
                onChange={(e) => setConstraints({ ...constraints, location: e.target.value })}
                placeholder="Enter location..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sustainability Target
              </label>
              <Input
                type="text"
                value={constraints.sustainabilityTarget}
                onChange={(e) => setConstraints({ ...constraints, sustainabilityTarget: e.target.value })}
                placeholder="Enter sustainability target..."
              />
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !productDescription}
            className="w-full"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            ) : (
              'Generate BOM'
            )}
          </Button>
        </div>
      </Card>

      {generatedBOM && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Generated BOM</h2>
              <Button
                variant="ghost"
                onClick={handleCopy}
                className="flex items-center space-x-2"
              >
                {copied ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <DocumentDuplicateIcon className="h-5 w-5" />
                )}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </Button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <p className="text-sm text-gray-500">Total Cost</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    ${generatedBOM.totalCost.toFixed(2)}
                  </p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-gray-500">Lead Time</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {generatedBOM.estimatedLeadTime}
                  </p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-gray-500">Sustainability Score</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {generatedBOM.sustainabilityScore}/100
                  </p>
                </Card>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cost
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lead Time
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Supplier
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {generatedBOM.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.unit}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${item.cost.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.leadTime}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.supplier}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Recommendations</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {generatedBOM.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
} 