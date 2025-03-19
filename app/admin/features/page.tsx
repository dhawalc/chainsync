'use client';

import { useState, useEffect } from 'react';
import { allFeatures, CustomerConfig } from '../../../config/features';
import { useRouter, useSearchParams } from 'next/navigation';

export default function FeatureConfigPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCustomer, setSelectedCustomer] = useState<string>(searchParams.get('customer') || 'skyworks');
  const [customers, setCustomers] = useState<Record<string, CustomerConfig>>({});
  const [config, setConfig] = useState<CustomerConfig | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Fetch customers on mount
  useEffect(() => {
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => {
        const customersMap: Record<string, CustomerConfig> = {};
        data.forEach((customer: any) => {
          const domain = customer.domain;
          const customerId = domain.split('.')[0];
          customersMap[customerId] = {
            ...customer,
            enabledFeatures: JSON.parse(customer.enabledFeatures)
          };
        });
        setCustomers(customersMap);
      })
      .catch(console.error);
  }, []);

  // Fetch selected customer config
  useEffect(() => {
    if (selectedCustomer) {
      fetch(`/api/customers/${selectedCustomer}`)
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setConfig({
              name: data.name,
              domain: data.domain,
              enabledFeatures: data.enabledFeatures
            });
          }
        })
        .catch(console.error);
    }
  }, [selectedCustomer]);

  const handleFeatureToggle = (featureId: string) => {
    if (!config) return;
    
    setConfig(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        enabledFeatures: prev.enabledFeatures.includes(featureId)
          ? prev.enabledFeatures.filter(id => id !== featureId)
          : [...prev.enabledFeatures, featureId]
      };
    });
  };

  const handleSave = async () => {
    if (!config) return;
    
    setIsSaving(true);
    setSaveMessage('');

    try {
      const response = await fetch(`/api/customers/${selectedCustomer}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabledFeatures: config.enabledFeatures })
      });

      if (response.ok) {
        setSaveMessage('Configuration saved successfully!');
        // Update customers list
        setCustomers(prev => ({
          ...prev,
          [selectedCustomer]: config
        }));
      } else {
        setSaveMessage('Failed to save configuration. Please try again.');
      }
    } catch (error) {
      console.error('Error saving config:', error);
      setSaveMessage('Failed to save configuration. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCustomerChange = (customerId: string) => {
    setSelectedCustomer(customerId);
    router.push(`/admin/features?customer=${customerId}`);
  };

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Feature Configuration</h1>
            <div className="flex items-center space-x-4">
              <label htmlFor="customer" className="text-sm font-medium text-gray-700">
                Customer:
              </label>
              <select
                id="customer"
                value={selectedCustomer}
                onChange={(e) => handleCustomerChange(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {Object.entries(customers).map(([id, customer]) => (
                  <option key={id} value={id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(allFeatures).map(([_, feature]) => (
              <div key={feature.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                  <p className="text-xs text-gray-400">Path: {feature.path}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.enabledFeatures.includes(feature.id)}
                    onChange={() => handleFeatureToggle(feature.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className={`text-sm ${saveMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {saveMessage}
            </p>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                isSaving ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isSaving ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 