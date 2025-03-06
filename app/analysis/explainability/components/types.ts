// Types for the explainability grid components

export interface DemandItem {
  id: string;
  type: 'order' | 'forecast';
  customerNumber: string;
  customerName: string;
  product: string;
  productDescription: string;
  customerRequestedDate: string;
  customerScheduleDate: string;
  levels: {
    [key: string]: {
      inventory: number;
      supply: number;
      dueDate: string;
      supplyCommitQty: number;
      supplyCommitDate: string;
    }
  };
  notes?: string;
}

export interface BomLevel {
  id: string;
  name: string;
  description: string;
}

export interface FilterOptions {
  scenario: string;
  productHierarchy: string;
  locationLevel: string;
  customer: string;
  dateRange: {
    start: string;
    end: string;
  };
  planner: string;
} 