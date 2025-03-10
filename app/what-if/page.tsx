'use client';

import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

// Mock data for baseline scenario
const baselineData = [
  { month: 'Jan', demand: 1200, production: 1100, inventory: 300, cost: 550000 },
  { month: 'Feb', demand: 1300, production: 1250, inventory: 250, cost: 625000 },
  { month: 'Mar', demand: 1400, production: 1400, inventory: 250, cost: 700000 },
  { month: 'Apr', demand: 1500, production: 1450, inventory: 200, cost: 725000 },
  { month: 'May', demand: 1600, production: 1550, inventory: 150, cost: 775000 },
  { month: 'Jun', demand: 1700, production: 1650, inventory: 100, cost: 825000 },
];

export default function WhatIfPage() {
  const [demandIncrease, setDemandIncrease] = useState(0);
  const [supplierDisruption, setSupplierDisruption] = useState(0);
  const [productionEfficiency, setProductionEfficiency] = useState(0);
  const [leadTimeReduction, setLeadTimeReduction] = useState(0);
  const [activeScenario, setActiveScenario] = useState('baseline');
  const [savedScenarios, setSavedScenarios] = useState([
    { id: 'baseline', name: 'Baseline', description: 'Current operations without changes' }
  ]);

  // Calculate scenario data based on inputs
  const calculateScenarioData = () => {
    // Apply the what-if parameters to create a new dataset
    return baselineData.map(item => {
      const demandFactor = 1 + (demandIncrease / 100);
      const productionFactor = 1 + (productionEfficiency / 100) - (supplierDisruption / 100);
      
      const newDemand = Math.round(item.demand * demandFactor);
      const newProduction = Math.round(item.production * productionFactor);
      
      // Calculate new inventory based on previous month's inventory + production - demand
      const prevMonth = baselineData.indexOf(item) > 0 ? 
        baselineData[baselineData.indexOf(item) - 1] : 
        { inventory: item.inventory };
      
      const newInventory = Math.max(0, prevMonth.inventory + newProduction - newDemand);
      
      // Calculate new cost based on production and inventory
      const productionCost = newProduction * 500; // $500 per unit
      const inventoryCost = newInventory * 50; // $50 per unit holding cost
      const newCost = productionCost + inventoryCost;
      
      return {
        month: item.month,
        demand: newDemand,
        production: newProduction,
        inventory: newInventory,
        cost: newCost
      };
    });
  };

  const scenarioData = activeScenario === 'baseline' ? baselineData : calculateScenarioData();
  
  // Calculate KPIs
  const calculateKPIs = (data) => {
    const totalDemand = data.reduce((sum, item) => sum + item.demand, 0);
    const totalProduction = data.reduce((sum, item) => sum + item.production, 0);
    const avgInventory = data.reduce((sum, item) => sum + item.inventory, 0) / data.length;
    const totalCost = data.reduce((sum, item) => sum + item.cost, 0);
    const serviceLevel = Math.min(100, (totalProduction / totalDemand) * 100);
    
    return {
      totalDemand,
      totalProduction,
      avgInventory,
      totalCost,
      serviceLevel
    };
  };
  
  const baselineKPIs = calculateKPIs(baselineData);
  const scenarioKPIs = calculateKPIs(scenarioData);
  
  const saveScenario = () => {
    const scenarioName = prompt('Enter a name for this scenario:');
    if (scenarioName) {
      const newScenario = {
        id: `scenario-${Date.now()}`,
        name: scenarioName,
        description: `Demand: ${demandIncrease}%, Supplier Disruption: ${supplierDisruption}%, Efficiency: ${productionEfficiency}%, Lead Time: ${leadTimeReduction}%`,
        parameters: {
          demandIncrease,
          supplierDisruption,
          productionEfficiency,
          leadTimeReduction
        }
      };
      
      setSavedScenarios([...savedScenarios, newScenario]);
      setActiveScenario(newScenario.id);
    }
  };
  
  const loadScenario = (scenarioId) => {
    setActiveScenario(scenarioId);
    
    if (scenarioId === 'baseline') {
      setDemandIncrease(0);
      setSupplierDisruption(0);
      setProductionEfficiency(0);
      setLeadTimeReduction(0);
      return;
    }
    
    const scenario = savedScenarios.find(s => s.id === scenarioId);
    if (scenario && scenario.parameters) {
      setDemandIncrease(scenario.parameters.demandIncrease);
      setSupplierDisruption(scenario.parameters.supplierDisruption);
      setProductionEfficiency(scenario.parameters.productionEfficiency);
      setLeadTimeReduction(scenario.parameters.leadTimeReduction);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">What-If Analysis</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Scenario Controls */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Scenario Parameters</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Demand Increase (%)
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="-20"
                    max="50"
                    value={demandIncrease}
                    onChange={(e) => setDemandIncrease(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="ml-2 w-12 text-center">{demandIncrease}%</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supplier Disruption (%)
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={supplierDisruption}
                    onChange={(e) => setSupplierDisruption(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="ml-2 w-12 text-center">{supplierDisruption}%</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Production Efficiency Gain (%)
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="-10"
                    max="30"
                    value={productionEfficiency}
                    onChange={(e) => setProductionEfficiency(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="ml-2 w-12 text-center">{productionEfficiency}%</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lead Time Reduction (%)
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={leadTimeReduction}
                    onChange={(e) => setLeadTimeReduction(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="ml-2 w-12 text-center">{leadTimeReduction}%</span>
                </div>
              </div>
              
              <div className="pt-4 flex space-x-2">
                <button 
                  onClick={saveScenario}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save Scenario
                </button>
                <button 
                  onClick={() => {
                    setDemandIncrease(0);
                    setSupplierDisruption(0);
                    setProductionEfficiency(0);
                    setLeadTimeReduction(0);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          
          {/* Saved Scenarios */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Saved Scenarios</h2>
            <div className="space-y-3">
              {savedScenarios.map(scenario => (
                <div 
                  key={scenario.id}
                  className={`p-3 rounded-md cursor-pointer ${
                    activeScenario === scenario.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => loadScenario(scenario.id)}
                >
                  <h3 className="font-medium">{scenario.name}</h3>
                  <p className="text-sm text-gray-500">{scenario.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* KPI Comparison */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">KPI Comparison</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Total Demand</h3>
                <p className="text-xl font-bold">{scenarioKPIs.totalDemand.toLocaleString()}</p>
                <div className="text-sm mt-1">
                  {scenarioKPIs.totalDemand > baselineKPIs.totalDemand ? (
                    <span className="text-green-600">+{((scenarioKPIs.totalDemand / baselineKPIs.totalDemand - 1) * 100).toFixed(1)}%</span>
                  ) : scenarioKPIs.totalDemand < baselineKPIs.totalDemand ? (
                    <span className="text-red-600">-{((1 - scenarioKPIs.totalDemand / baselineKPIs.totalDemand) * 100).toFixed(1)}%</span>
                  ) : (
                    <span className="text-gray-500">0%</span>
                  )}
                  <span className="text-gray-500 ml-1">vs baseline</span>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Service Level</h3>
                <p className="text-xl font-bold">{scenarioKPIs.serviceLevel.toFixed(1)}%</p>
                <div className="text-sm mt-1">
                  {scenarioKPIs.serviceLevel > baselineKPIs.serviceLevel ? (
                    <span className="text-green-600">+{(scenarioKPIs.serviceLevel - baselineKPIs.serviceLevel).toFixed(1)}%</span>
                  ) : scenarioKPIs.serviceLevel < baselineKPIs.serviceLevel ? (
                    <span className="text-red-600">-{(baselineKPIs.serviceLevel - scenarioKPIs.serviceLevel).toFixed(1)}%</span>
                  ) : (
                    <span className="text-gray-500">0%</span>
                  )}
                  <span className="text-gray-500 ml-1">vs baseline</span>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Avg. Inventory</h3>
                <p className="text-xl font-bold">{scenarioKPIs.avgInventory.toFixed(0)}</p>
                <div className="text-sm mt-1">
                  {scenarioKPIs.avgInventory > baselineKPIs.avgInventory ? (
                    <span className="text-red-600">+{((scenarioKPIs.avgInventory / baselineKPIs.avgInventory - 1) * 100).toFixed(1)}%</span>
                  ) : scenarioKPIs.avgInventory < baselineKPIs.avgInventory ? (
                    <span className="text-green-600">-{((1 - scenarioKPIs.avgInventory / baselineKPIs.avgInventory) * 100).toFixed(1)}%</span>
                  ) : (
                    <span className="text-gray-500">0%</span>
                  )}
                  <span className="text-gray-500 ml-1">vs baseline</span>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Total Cost</h3>
                <p className="text-xl font-bold">${(scenarioKPIs.totalCost / 1000000).toFixed(2)}M</p>
                <div className="text-sm mt-1">
                  {scenarioKPIs.totalCost > baselineKPIs.totalCost ? (
                    <span className="text-red-600">+{((scenarioKPIs.totalCost / baselineKPIs.totalCost - 1) * 100).toFixed(1)}%</span>
                  ) : scenarioKPIs.totalCost < baselineKPIs.totalCost ? (
                    <span className="text-green-600">-{((1 - scenarioKPIs.totalCost / baselineKPIs.totalCost) * 100).toFixed(1)}%</span>
                  ) : (
                    <span className="text-gray-500">0%</span>
                  )}
                  <span className="text-gray-500 ml-1">vs baseline</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Demand vs. Production</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={scenarioData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="demand" stroke="#8884d8" name="Demand" />
                    <Line type="monotone" dataKey="production" stroke="#82ca9d" name="Production" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Inventory Levels</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={scenarioData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="inventory" fill="#8884d8" name="Inventory" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 