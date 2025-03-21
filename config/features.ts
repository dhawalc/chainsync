export interface Feature {
  id: string;
  name: string;
  description: string;
  category: 'mdm' | 'supplyChain' | 'planning' | 'analysis' | 'additional';
  path: string;
}

export interface CustomerConfig {
  name: string;
  domain: string;
  enabledFeatures: string[];
}

export const allFeatures: Feature[] = [
  // MDM Features
  { id: 'mdm-dashboard', name: 'MDM Dashboard', description: 'Master Data Management Dashboard', category: 'mdm', path: '/mdm' },
  { id: 'material-master', name: 'Material Master', description: 'Manage material master data', category: 'mdm', path: '/mdm/material' },
  { id: 'customer-master', name: 'Customer Master', description: 'Manage customer master data', category: 'mdm', path: '/mdm/customer' },
  { id: 'vendor-master', name: 'Vendor Master', description: 'Manage vendor master data', category: 'mdm', path: '/mdm/vendor' },
  { id: 'bom', name: 'Bill of Materials', description: 'Manage bill of materials', category: 'mdm', path: '/mdm/bom' },
  { id: 'routing', name: 'Routing & Work Centers', description: 'Manage routing and work centers', category: 'mdm', path: '/mdm/routing' },
  { id: 'production-version', name: 'Production Version', description: 'Manage production versions', category: 'mdm', path: '/mdm/production-version' },
  { id: 'calendar', name: 'Calendars', description: 'Manage calendars', category: 'mdm', path: '/mdm/calendar' },
  { id: 'location', name: 'Location Master', description: 'Manage location master data', category: 'mdm', path: '/mdm/location' },
  { id: 'transportation', name: 'Transportation', description: 'Manage transportation data', category: 'mdm', path: '/mdm/transportation' },
  { id: 'technology-node-mapping', name: 'Technology Node - Process Mapping', description: 'Map technology nodes to processes', category: 'mdm', path: '/mdm/technology-node' },
  { id: 'process-master', name: 'Process Master', description: 'Manage process master data', category: 'mdm', path: '/mdm/process' },
  { id: 'technology-node-define', name: 'Define Technology Nodes', description: 'Define and manage technology nodes', category: 'mdm', path: '/mdm/technology-node/define' },
  { id: 'integrations', name: 'Integration', description: 'Manage integrations', category: 'mdm', path: '/integrations' },

  // Supply Chain Features
  { id: 'products', name: 'Products', description: 'Product management', category: 'supplyChain', path: '/products' },
  { id: 'inventory', name: 'Inventory', description: 'Inventory management', category: 'supplyChain', path: '/inventory' },
  { id: 'suppliers', name: 'Suppliers', description: 'Supplier management', category: 'supplyChain', path: '/suppliers' },
  { id: 'production', name: 'Production', description: 'Production management', category: 'supplyChain', path: '/production' },
  { id: 'risk', name: 'Risk Dashboard', description: 'Supply chain risk management', category: 'supplyChain', path: '/risk' },

  // Planning Features
  { id: 'forecast', name: 'Forecast', description: 'Forecasting tools', category: 'planning', path: '/forecast' },
  { id: 'demand', name: 'Demand Planning', description: 'Demand planning tools', category: 'planning', path: '/demand' },
  { id: 'timephase', name: 'Time Phase', description: 'Time phase planning', category: 'planning', path: '/timephase' },
  { id: 'hierarchy', name: 'Hierarchy', description: 'Planning hierarchy', category: 'planning', path: '/hierarchy' },
  { id: 'yield-management', name: 'Yield Management', description: 'Yield management tools', category: 'planning', path: '/yield-management' },
  { id: 'location-process', name: 'Location Process Setup', description: 'Location process configuration', category: 'planning', path: '/planning-setup/location-process' },
  { id: 'bom-time-phase', name: 'BOM Time Phase', description: 'BOM time phase setup', category: 'planning', path: '/planning-setup/bom-time-phase' },
  { id: 'resource-mapping', name: 'Resource Mapping', description: 'Resource mapping configuration', category: 'planning', path: '/planning-setup/resource-mapping' },

  // Analysis Features
  { id: 'analysis-dashboard', name: 'Dashboard', description: 'Analysis overview', category: 'analysis', path: '/analysis' },
  { id: 'product-report', name: 'Product Report', description: 'Product analysis reports', category: 'analysis', path: '/product-report' },
  { id: 'performance', name: 'Performance', description: 'Performance analysis', category: 'analysis', path: '/performance' },
  { id: 'what-if', name: 'What-If Analysis', description: 'What-if scenario analysis', category: 'analysis', path: '/what-if' },
  { id: 'kpi', name: 'KPI Dashboard', description: 'KPI tracking and analysis', category: 'analysis', path: '/kpi' },

  // Additional Features
  { id: 'audit', name: 'Audit', description: 'Audit tools', category: 'additional', path: '/audit' },
  { id: 'landing', name: 'Landing', description: 'Landing page', category: 'additional', path: '/landing' },
];

export const customerConfigs: Record<string, CustomerConfig> = {
  skyworks: {
    name: 'Skyworks',
    domain: 'skyworks.chainsync.info',
    enabledFeatures: allFeatures.map(f => f.id)
  },
  arista: {
    name: 'Arista',
    domain: 'arista.chainsync.info',
    enabledFeatures: [
      // MDM
      'mdm-dashboard', 'material-master', 'technology-node', 'process-master', 'customer-master', 'vendor-master', 'bom', 'routing',
      // Supply Chain
      'products', 'inventory', 'suppliers', 'production', 'risk',
      // Planning
      'forecast', 'demand', 'timephase', 'hierarchy',
      // Analysis
      'analysis-dashboard', 'product-report', 'performance', 'what-if', 'kpi',
      // Additional
      'audit'
    ]
  }
}; 