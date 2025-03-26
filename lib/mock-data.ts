// Types
export interface Product {
  PRODUCT_ID: string;
  DESCRIPTION: string;
  CATEGORY: string;
}

export interface Category {
  CATEGORY_ID: string;
  CATEGORY_NAME: string;
}

export interface ProductCategory {
  PRODUCT_ID: string;
  CATEGORY_ID: string;
}

export interface HierarchyNode {
  HIERARCHY_ID: string;
  HIERARCHY_NAME: string;
  PARENT_ID: string | null;
}

export interface ForecastData {
  product_id: string;
  category: string;
  forecast: number;
  actual: number;
  date: string;
}

export interface TimePhaseData {
  PRODUCT_ID: string;
  START_DATE: string;
  END_DATE: string;
  CYCLE_TIME: number;
}

// Mock products data
export const mockProducts: Product[] = [
  { PRODUCT_ID: 'P001', DESCRIPTION: 'Product One', CATEGORY: 'C001' },
  { PRODUCT_ID: 'P002', DESCRIPTION: 'Product Two', CATEGORY: 'C001' },
  { PRODUCT_ID: 'P003', DESCRIPTION: 'Product Three', CATEGORY: 'C001' },
  { PRODUCT_ID: 'P004', DESCRIPTION: 'Product Four', CATEGORY: 'C002' },
  { PRODUCT_ID: 'P005', DESCRIPTION: 'Product Five', CATEGORY: 'C002' },
  { PRODUCT_ID: 'P006', DESCRIPTION: 'Product Six', CATEGORY: 'C002' },
  { PRODUCT_ID: 'P007', DESCRIPTION: 'Product Seven', CATEGORY: 'C003' },
  { PRODUCT_ID: 'P008', DESCRIPTION: 'Product Eight', CATEGORY: 'C003' },
  { PRODUCT_ID: 'P009', DESCRIPTION: 'Product Nine', CATEGORY: 'C003' },
  { PRODUCT_ID: 'P010', DESCRIPTION: 'Product Ten', CATEGORY: 'C003' }
];

// Mock categories data
export const mockCategories: Category[] = [
  { CATEGORY_ID: 'C001', CATEGORY_NAME: 'Electronics' },
  { CATEGORY_ID: 'C002', CATEGORY_NAME: 'Accessories' },
  { CATEGORY_ID: 'C003', CATEGORY_NAME: 'Wearables' }
];

// Mock product-category relationships
export const mockProductCategories: ProductCategory[] = [
  { PRODUCT_ID: 'P001', CATEGORY_ID: 'C001' },
  { PRODUCT_ID: 'P002', CATEGORY_ID: 'C001' },
  { PRODUCT_ID: 'P003', CATEGORY_ID: 'C001' },
  { PRODUCT_ID: 'P004', CATEGORY_ID: 'C002' },
  { PRODUCT_ID: 'P005', CATEGORY_ID: 'C002' },
  { PRODUCT_ID: 'P006', CATEGORY_ID: 'C002' },
  { PRODUCT_ID: 'P007', CATEGORY_ID: 'C003' },
  { PRODUCT_ID: 'P008', CATEGORY_ID: 'C003' },
  { PRODUCT_ID: 'P009', CATEGORY_ID: 'C003' },
  { PRODUCT_ID: 'P010', CATEGORY_ID: 'C003' }
];

// Helper function to determine if mock data should be used
export function shouldUseMockData(): boolean {
  return true; // Always use mock data since we're not using Snowflake
}

// Generate mock time phase data
export function generateMockTimePhaseData(bucket = 'WEEKLY', selectedProducts: string[] | null = null): TimePhaseData[] {
  const products = selectedProducts || mockProducts.map(p => p.PRODUCT_ID);
  const timePhaseData: TimePhaseData[] = [];
  
  for (const productId of products) {
    // Generate 12 periods of data for each product
    for (let i = 0; i < 12; i++) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + (i * 7)); // Weekly increments
      
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);
      
      timePhaseData.push({
        PRODUCT_ID: productId,
        START_DATE: startDate.toISOString().split('T')[0],
        END_DATE: endDate.toISOString().split('T')[0],
        CYCLE_TIME: Math.floor(Math.random() * 10) + 5 // Random cycle time between 5-15
      });
    }
  }
  
  return timePhaseData;
}

// Mock hierarchy data
export const mockHierarchyData: HierarchyNode[] = [
  { HIERARCHY_ID: 'H001', HIERARCHY_NAME: 'Electronics', PARENT_ID: null },
  { HIERARCHY_ID: 'H002', HIERARCHY_NAME: 'Computers', PARENT_ID: 'H001' },
  { HIERARCHY_ID: 'H003', HIERARCHY_NAME: 'Phones', PARENT_ID: 'H001' },
  { HIERARCHY_ID: 'H004', HIERARCHY_NAME: 'Accessories', PARENT_ID: null },
  { HIERARCHY_ID: 'H005', HIERARCHY_NAME: 'Cases', PARENT_ID: 'H004' },
  { HIERARCHY_ID: 'H006', HIERARCHY_NAME: 'Chargers', PARENT_ID: 'H004' }
];

// Mock forecast data
export const mockForecastData: ForecastData[] = [
  { product_id: 'P001', category: 'Electronics', forecast: 100, actual: 95, date: '2024-01' },
  { product_id: 'P001', category: 'Electronics', forecast: 110, actual: 105, date: '2024-02' },
  { product_id: 'P002', category: 'Electronics', forecast: 80, actual: 82, date: '2024-01' },
  { product_id: 'P002', category: 'Electronics', forecast: 85, actual: 88, date: '2024-02' },
  { product_id: 'P003', category: 'Accessories', forecast: 150, actual: 145, date: '2024-01' },
  { product_id: 'P003', category: 'Accessories', forecast: 160, actual: 158, date: '2024-02' }
]; 