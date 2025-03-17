// lib/mock-data.js
// This file provides mock data for development and testing when Snowflake is not available

// Mock products data
export const mockProducts = [
  { PRODUCT_ID: 'P001', DESCRIPTION: 'Product One' },
  { PRODUCT_ID: 'P002', DESCRIPTION: 'Product Two' },
  { PRODUCT_ID: 'P003', DESCRIPTION: 'Product Three' },
  { PRODUCT_ID: 'P004', DESCRIPTION: 'Product Four' },
  { PRODUCT_ID: 'P005', DESCRIPTION: 'Product Five' },
  { PRODUCT_ID: 'P006', DESCRIPTION: 'Product Six' },
  { PRODUCT_ID: 'P007', DESCRIPTION: 'Product Seven' },
  { PRODUCT_ID: 'P008', DESCRIPTION: 'Product Eight' },
  { PRODUCT_ID: 'P009', DESCRIPTION: 'Product Nine' },
  { PRODUCT_ID: 'P010', DESCRIPTION: 'Product Ten' },
];

// Mock categories data
export const mockCategories = [
  { CATEGORY_ID: 'C001', CATEGORY_NAME: 'Category One' },
  { CATEGORY_ID: 'C002', CATEGORY_NAME: 'Category Two' },
  { CATEGORY_ID: 'C003', CATEGORY_NAME: 'Category Three' },
];

// Mock product-category relationships
export const mockProductCategories = [
  { PRODUCT_ID: 'P001', CATEGORY_ID: 'C001' },
  { PRODUCT_ID: 'P002', CATEGORY_ID: 'C001' },
  { PRODUCT_ID: 'P003', CATEGORY_ID: 'C001' },
  { PRODUCT_ID: 'P004', CATEGORY_ID: 'C002' },
  { PRODUCT_ID: 'P005', CATEGORY_ID: 'C002' },
  { PRODUCT_ID: 'P006', CATEGORY_ID: 'C002' },
  { PRODUCT_ID: 'P007', CATEGORY_ID: 'C003' },
  { PRODUCT_ID: 'P008', CATEGORY_ID: 'C003' },
  { PRODUCT_ID: 'P009', CATEGORY_ID: 'C003' },
  { PRODUCT_ID: 'P010', CATEGORY_ID: 'C003' },
];

// Generate mock time-phased data
export function generateMockTimePhaseData(bucket = 'WEEKLY', productIds = null) {
  const today = new Date();
  const data = [];
  
  // Use provided product IDs or default to all mock products
  const products = productIds 
    ? mockProducts.filter(p => productIds.includes(String(p.PRODUCT_ID)))
    : mockProducts;
  
  // Generate time periods based on bucket type
  let periods = [];
  if (bucket === 'WEEKLY') {
    // Generate 10 weekly periods
    for (let i = 0; i < 10; i++) {
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - (i * 7));
      
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      
      periods.push({
        START_DATE: startDate.toISOString().split('T')[0],
        END_DATE: endDate.toISOString().split('T')[0]
      });
    }
  } else if (bucket === 'MONTHLY') {
    // Generate 6 monthly periods
    for (let i = 0; i < 6; i++) {
      const startDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const endDate = new Date(today.getFullYear(), today.getMonth() - i + 1, 0);
      
      periods.push({
        START_DATE: startDate.toISOString().split('T')[0],
        END_DATE: endDate.toISOString().split('T')[0]
      });
    }
  } else if (bucket === 'QUARTERLY') {
    // Generate 4 quarterly periods
    for (let i = 0; i < 4; i++) {
      const quarter = Math.floor((today.getMonth() - (i * 3)) / 3);
      const year = today.getFullYear() - Math.floor((i * 3 + today.getMonth()) / 12);
      
      const startDate = new Date(year, quarter * 3, 1);
      const endDate = new Date(year, quarter * 3 + 3, 0);
      
      periods.push({
        START_DATE: startDate.toISOString().split('T')[0],
        END_DATE: endDate.toISOString().split('T')[0]
      });
    }
  } else if (bucket === 'YEARLY') {
    // Generate 3 yearly periods
    for (let i = 0; i < 3; i++) {
      const startDate = new Date(today.getFullYear() - i, 0, 1);
      const endDate = new Date(today.getFullYear() - i, 11, 31);
      
      periods.push({
        START_DATE: startDate.toISOString().split('T')[0],
        END_DATE: endDate.toISOString().split('T')[0]
      });
    }
  }
  
  // Generate cycle time data for each product and period
  products.forEach(product => {
    periods.forEach(period => {
      // Generate a random cycle time between 10 and 60 days
      const cycleTime = Math.floor(Math.random() * 50) + 10;
      
      data.push({
        PRODUCT_ID: product.PRODUCT_ID,
        START_DATE: period.START_DATE,
        END_DATE: period.END_DATE,
        CYCLE_TIME: cycleTime
      });
    });
  });
  
  return data;
}

// Mock hierarchy data
export const mockHierarchyData = [
  { NODE_ID: 'N001', NODE_NAME: 'Root', ENTITY_TYPE: 'ROOT', PARENT_NODE_ID: null, LEVEL: 0 },
  { NODE_ID: 'N002', NODE_NAME: 'Division A', ENTITY_TYPE: 'DIVISION', PARENT_NODE_ID: 'N001', LEVEL: 1 },
  { NODE_ID: 'N003', NODE_NAME: 'Division B', ENTITY_TYPE: 'DIVISION', PARENT_NODE_ID: 'N001', LEVEL: 1 },
  { NODE_ID: 'P001', NODE_NAME: 'Product One', ENTITY_TYPE: 'PRODUCT', PARENT_NODE_ID: 'N002', LEVEL: 2 },
  { NODE_ID: 'P002', NODE_NAME: 'Product Two', ENTITY_TYPE: 'PRODUCT', PARENT_NODE_ID: 'N002', LEVEL: 2 },
  { NODE_ID: 'P003', NODE_NAME: 'Product Three', ENTITY_TYPE: 'PRODUCT', PARENT_NODE_ID: 'N002', LEVEL: 2 },
  { NODE_ID: 'P004', NODE_NAME: 'Product Four', ENTITY_TYPE: 'PRODUCT', PARENT_NODE_ID: 'N003', LEVEL: 2 },
  { NODE_ID: 'P005', NODE_NAME: 'Product Five', ENTITY_TYPE: 'PRODUCT', PARENT_NODE_ID: 'N003', LEVEL: 2 },
  { NODE_ID: 'P006', NODE_NAME: 'Product Six', ENTITY_TYPE: 'PRODUCT', PARENT_NODE_ID: 'N003', LEVEL: 2 },
];

// Helper function to check if we should use mock data
export function shouldUseMockData() {
  // Use mock data in Docker environment or when explicitly enabled
  return process.env.USE_MOCK_DATA === 'true' || process.env.NODE_ENV === 'production';
} 