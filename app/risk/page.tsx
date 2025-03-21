'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExclamationTriangleIcon, 
  ShieldCheckIcon,
  GlobeAltIcon,
  TruckIcon,
  BuildingOfficeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import RiskAnalysisModal from '../components/ai/RiskAnalysisModal';

// Sample risk data
const riskData = [
  {
    id: 'supplier-1',
    name: 'Acme Electronics',
    category: 'Supplier',
    riskLevel: 'high',
    impact: 'Critical components for Product X',
    location: 'Taiwan',
    lastAssessment: '2023-10-15',
    issues: [
      'Financial instability',
      'Single source for critical components',
      'Geopolitical tensions in region'
    ]
  },
  {
    id: 'logistics-1',
    name: 'Pacific Shipping Route',
    category: 'Logistics',
    riskLevel: 'medium',
    impact: 'Main shipping route for APAC region',
    location: 'Pacific Ocean',
    lastAssessment: '2023-11-01',
    issues: [
      'Weather disruptions expected',
      'Port congestion at destination'
    ]
  },
  {
    id: 'facility-1',
    name: 'Main Assembly Plant',
    category: 'Facility',
    riskLevel: 'low',
    impact: 'Primary assembly for 60% of products',
    location: 'Michigan, USA',
    lastAssessment: '2023-11-10',
    issues: [
      'Scheduled maintenance in Q1 2024'
    ]
  },
  {
    id: 'material-1',
    name: 'Semiconductor Chips',
    category: 'Material',
    riskLevel: 'high',
    impact: 'Required for all electronic products',
    location: 'Global',
    lastAssessment: '2023-10-28',
    issues: [
      'Ongoing global shortage',
      'Price volatility',
      'Long lead times'
    ]
  }
];

// Risk metrics
const riskMetrics = [
  { name: 'High Risk Items', value: 12, change: 2, trend: 'up' },
  { name: 'Medium Risk Items', value: 28, change: -3, trend: 'down' },
  { name: 'Risk Mitigation Plans', value: 15, change: 5, trend: 'up' },
  { name: 'Average Risk Score', value: '68/100', change: -4, trend: 'down' }
];

export default function RiskDashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  
  const filteredRisks = selectedCategory === 'All' 
    ? riskData 
    : riskData.filter(risk => risk.category === selectedCategory);
  
  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'high':
        return <Badge variant="error" className="px-3 py-1">High Risk</Badge>;
      case 'medium':
        return <Badge variant="warning" className="px-3 py-1">Medium Risk</Badge>;
      case 'low':
        return <Badge variant="success" className="px-3 py-1">Low Risk</Badge>;
      default:
        return null;
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Supplier':
        return <BuildingOfficeIcon className="h-6 w-6 text-indigo-600" />;
      case 'Logistics':
        return <TruckIcon className="h-6 w-6 text-indigo-600" />;
      case 'Facility':
        return <BuildingOfficeIcon className="h-6 w-6 text-indigo-600" />;
      case 'Material':
        return <GlobeAltIcon className="h-6 w-6 text-indigo-600" />;
      default:
        return <ExclamationTriangleIcon className="h-6 w-6 text-indigo-600" />;
    }
  };

  // Sample data for the AI analysis
  const supplyData = riskData
    .filter(risk => risk.category === 'Supplier')
    .map(supplier => ({
      supplier_id: supplier.id,
      supplier_name: supplier.name,
      lead_time: Math.floor(Math.random() * 30) + 5, // Random lead time between 5-35 days
      reliability_score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      historical_delays: Array.from({ length: 6 }, () => Math.floor(Math.random() * 5)) // Random delays
    }));

  const demandData = Array.from({ length: 12 }, (_, i) => {
    const actual = Math.floor(Math.random() * 1000) + 500;
    const forecasted = actual + (Math.random() - 0.5) * 200;
    return {
      period: new Date(2023, i, 1).toISOString().split('T')[0],
      actual_demand: actual,
      forecasted_demand: forecasted,
      forecast_error: ((forecasted - actual) / actual) * 100
    };
  });

  const inventoryData = riskData
    .filter(risk => risk.category === 'Material')
    .map(material => ({
      sku: material.id,
      quantity: Math.floor(Math.random() * 1000) + 100,
      reorder_point: Math.floor(Math.random() * 200) + 50,
      safety_stock: Math.floor(Math.random() * 100) + 25,
      stock_outs: Math.floor(Math.random() * 3)
    }));

  return (
    <div className="container mx-auto py-8 px-4 bg-white min-h-screen">
      <div className="mb-10 border-b border-gray-200 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Supply Chain Risk Dashboard</h1>
            <p className="mt-2 text-xl text-gray-700 max-w-3xl">
              Monitor and manage risks across your supply chain network
            </p>
          </div>
          <Button
            onClick={() => setIsAnalysisModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <SparklesIcon className="h-5 w-5 mr-2" />
            AI Risk Analysis
          </Button>
        </div>
      </div>
      
      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {riskMetrics.map((metric, index) => (
          <Card key={index} className="border-2 border-gray-200 shadow-md rounded-xl overflow-hidden bg-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{metric.name}</h3>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <div className={`flex items-center ${
                  metric.trend === 'up' 
                    ? metric.name.includes('Risk') ? 'text-red-600' : 'text-emerald-600'
                    : metric.name.includes('Risk') ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowTrendingUpIcon className="h-5 w-5 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-5 w-5 mr-1" />
                  )}
                  <span className="text-sm font-medium">{Math.abs(metric.change)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-3">
        <Button 
          onClick={() => setSelectedCategory('All')}
          variant={selectedCategory === 'All' ? 'default' : 'outline'}
          className={selectedCategory === 'All' ? 'bg-indigo-600' : ''}
        >
          All Risks
        </Button>
        <Button 
          onClick={() => setSelectedCategory('Supplier')}
          variant={selectedCategory === 'Supplier' ? 'default' : 'outline'}
          className={selectedCategory === 'Supplier' ? 'bg-indigo-600' : ''}
        >
          Supplier Risks
        </Button>
        <Button 
          onClick={() => setSelectedCategory('Logistics')}
          variant={selectedCategory === 'Logistics' ? 'default' : 'outline'}
          className={selectedCategory === 'Logistics' ? 'bg-indigo-600' : ''}
        >
          Logistics Risks
        </Button>
        <Button 
          onClick={() => setSelectedCategory('Facility')}
          variant={selectedCategory === 'Facility' ? 'default' : 'outline'}
          className={selectedCategory === 'Facility' ? 'bg-indigo-600' : ''}
        >
          Facility Risks
        </Button>
        <Button 
          onClick={() => setSelectedCategory('Material')}
          variant={selectedCategory === 'Material' ? 'default' : 'outline'}
          className={selectedCategory === 'Material' ? 'bg-indigo-600' : ''}
        >
          Material Risks
        </Button>
      </div>
      
      {/* Risk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRisks.map((risk) => (
          <Card 
            key={risk.id} 
            className="border-2 border-gray-200 hover:border-indigo-300 shadow-md hover:shadow-xl rounded-xl overflow-hidden transition-all duration-300 bg-white"
          >
            <div className={`h-3 ${
              risk.riskLevel === 'high' ? 'bg-red-500' : 
              risk.riskLevel === 'medium' ? 'bg-amber-500' : 
              'bg-emerald-500'
            }`}></div>
            <CardHeader className="pb-3 bg-white">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-900">{risk.name}</CardTitle>
                <div className="p-2 bg-gray-100 rounded-full">
                  {getCategoryIcon(risk.category)}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <CardDescription className="text-gray-700 font-medium">
                  {risk.category} • {risk.location}
                </CardDescription>
                {getRiskBadge(risk.riskLevel)}
              </div>
            </CardHeader>
            <CardContent className="pt-4 pb-6 bg-white">
              <p className="text-base text-gray-800 mb-4">
                <span className="font-semibold">Impact:</span> {risk.impact}
              </p>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Risk Factors:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {risk.issues.map((issue, index) => (
                    <li key={index} className="text-sm text-gray-800">{issue}</li>
                  ))}
                </ul>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Last assessed: {new Date(risk.lastAssessment).toLocaleDateString()}
              </p>
              
              <div className="flex justify-between items-center mt-auto">
                <Button 
                  variant="outline" 
                  className="text-gray-700 border-2 border-gray-300 hover:bg-gray-100"
                >
                  View Details
                </Button>
                
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <ShieldCheckIcon className="h-5 w-5 mr-2" />
                  Mitigation Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 bg-gray-50 p-8 rounded-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Risk Assessment</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6 text-center">
          Run a comprehensive risk assessment across your supply chain to identify potential vulnerabilities
        </p>
        <div className="text-center">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-lg">
            Start Risk Assessment
          </Button>
        </div>
      </div>

      {/* AI Risk Analysis Modal */}
      <RiskAnalysisModal
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        supplyData={supplyData}
        demandData={demandData}
        inventoryData={inventoryData}
      />
    </div>
  );
} 