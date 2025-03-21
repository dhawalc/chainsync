// Mock data configuration
export const shouldUseMockData = () => {
  // Use mock data in development or if Snowflake connection fails
  return process.env.NODE_ENV === 'development' || 
         process.env.USE_MOCK_DATA === 'true' ||
         process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
};

// ... rest of your mock data ... 