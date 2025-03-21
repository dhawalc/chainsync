import { useEffect, useState, use } from 'react';
import { useSearchParams } from 'next/navigation';
import { allFeatures, customerConfigs } from '../config/features';

// Cache for feature flags
const featureFlagsCache: Record<string, string[]> = {};

// Default features for initial render
const defaultFeatures = allFeatures.map(feature => feature.id);

export const useFeatureFlags = () => {
  const searchParams = useSearchParams();
  const customerId = searchParams?.get('customer');
  const [enabledFeatures, setEnabledFeatures] = useState<string[]>(() => {
    // Initialize with cached value or default features
    if (customerId && featureFlagsCache[customerId]) {
      return featureFlagsCache[customerId];
    }
    return defaultFeatures;
  });

  useEffect(() => {
    // If no customer is specified, show all features
    if (!customerId) {
      setEnabledFeatures(defaultFeatures);
      return;
    }

    // If we have cached data, use it
    if (featureFlagsCache[customerId]) {
      setEnabledFeatures(featureFlagsCache[customerId]);
      return;
    }

    // Check if we have a static config for this customer
    const staticConfig = customerConfigs[customerId];
    if (staticConfig) {
      featureFlagsCache[customerId] = staticConfig.enabledFeatures;
      setEnabledFeatures(staticConfig.enabledFeatures);
      return;
    }

    // Otherwise, fetch from API
    fetch(`/api/customers/${customerId}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          featureFlagsCache[customerId] = data.enabledFeatures;
          setEnabledFeatures(data.enabledFeatures);
        }
      })
      .catch(() => {
        // On error, fallback to default features
        setEnabledFeatures(defaultFeatures);
      });
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