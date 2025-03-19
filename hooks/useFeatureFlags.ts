import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { allFeatures } from '../config/features';

export const useFeatureFlags = () => {
  const searchParams = useSearchParams();
  const customerId = searchParams?.get('customer');
  const [enabledFeatures, setEnabledFeatures] = useState<string[]>([]);

  useEffect(() => {
    // If no customer is specified, show all features
    if (!customerId) {
      setEnabledFeatures(allFeatures.map(feature => feature.id));
      return;
    }

    // Otherwise, fetch customer-specific features
    fetch(`/api/customers/${customerId}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setEnabledFeatures(data.enabledFeatures);
        }
      })
      .catch(console.error);
  }, [customerId]);

  const getEnabledFeatures = () => {
    return allFeatures.filter(feature => enabledFeatures.includes(feature.id));
  };

  const getEnabledFeaturesByCategory = (category: string) => {
    return getEnabledFeatures().filter(feature => feature.category === category);
  };

  const isFeatureEnabled = (featureId: string) => {
    return enabledFeatures.includes(featureId);
  };

  return {
    getEnabledFeatures,
    getEnabledFeaturesByCategory,
    isFeatureEnabled,
    currentCustomer: customerId
  };
}; 