'use client';

import { useState } from 'react';
import FilterPanel from './components/FilterPanel';
import LevelSelector from './components/LevelSelector';
import GridTable from './components/GridTable';
import NoteDialog from './components/NoteDialog';
import DetailsDialog from './components/DetailsDialog';
import { DemandItem, BomLevel, FilterOptions } from './components/types';
import { Label } from '@/components/ui/label';

// Sample data
const bomLevels: BomLevel[] = [
  { id: 'finished', name: 'Finished Goods', description: 'Top level finished products' },
  { id: 'subassembly', name: 'Sub-Assembly', description: 'Components that make up finished goods' },
  { id: 'raw', name: 'Raw Materials', description: 'Basic materials used in production' }
];

const sampleDemands: DemandItem[] = [
  {
    id: 'order-1',
    type: 'order',
    customerNumber: 'CUST001',
    customerName: 'Acme Corporation',
    product: 'FG-1000',
    productDescription: 'Premium Widget',
    customerRequestedDate: '2023-11-15',
    customerScheduleDate: '2023-11-20',
    levels: {
      'finished': {
        inventory: 50,
        supply: 100,
        dueDate: '2023-11-18',
        supplyCommitQty: 75,
        supplyCommitDate: '2023-11-19'
      },
      'subassembly': {
        inventory: 200,
        supply: 300,
        dueDate: '2023-11-10',
        supplyCommitQty: 250,
        supplyCommitDate: '2023-11-12'
      }
    },
    notes: 'Priority customer, ensure on-time delivery'
  },
  {
    id: 'order-2',
    type: 'order',
    customerNumber: 'CUST002',
    customerName: 'TechSolutions Inc.',
    product: 'FG-2000',
    productDescription: 'Advanced Widget',
    customerRequestedDate: '2023-11-25',
    customerScheduleDate: '2023-11-28',
    levels: {
      'finished': {
        inventory: 25,
        supply: 50,
        dueDate: '2023-11-26',
        supplyCommitQty: 40,
        supplyCommitDate: '2023-11-27'
      },
      'subassembly': {
        inventory: 100,
        supply: 150,
        dueDate: '2023-11-20',
        supplyCommitQty: 120,
        supplyCommitDate: '2023-11-22'
      }
    }
  },
  {
    id: 'forecast-1',
    type: 'forecast',
    customerNumber: 'CUST003',
    customerName: 'Global Industries',
    product: 'FG-3000',
    productDescription: 'Enterprise Widget',
    customerRequestedDate: '2023-12-10',
    customerScheduleDate: '2023-12-15',
    levels: {
      'finished': {
        inventory: 10,
        supply: 200,
        dueDate: '2023-12-12',
        supplyCommitQty: 180,
        supplyCommitDate: '2023-12-14'
      },
      'subassembly': {
        inventory: 50,
        supply: 400,
        dueDate: '2023-12-05',
        supplyCommitQty: 350,
        supplyCommitDate: '2023-12-07'
      }
    }
  },
  {
    id: 'forecast-2',
    type: 'forecast',
    customerNumber: 'CUST001',
    customerName: 'Acme Corporation',
    product: 'FG-1500',
    productDescription: 'Premium Widget Plus',
    customerRequestedDate: '2023-12-20',
    customerScheduleDate: '2023-12-22',
    levels: {
      'finished': {
        inventory: 5,
        supply: 75,
        dueDate: '2023-12-18',
        supplyCommitQty: 60,
        supplyCommitDate: '2023-12-20'
      },
      'subassembly': {
        inventory: 30,
        supply: 120,
        dueDate: '2023-12-10',
        supplyCommitQty: 100,
        supplyCommitDate: '2023-12-12'
      }
    }
  }
];

export default function ExplainabilityPage() {
  // State for filters
  const [filters, setFilters] = useState<FilterOptions>({
    scenario: 'base',
    productHierarchy: 'all',
    locationLevel: 'all',
    customer: 'all',
    dateRange: {
      start: '2023-11-01',
      end: '2023-12-31'
    },
    planner: 'all'
  });
  
  // State for level selection
  const [selectedLevels, setSelectedLevels] = useState<string[]>(['finished', 'subassembly']);
  const [startingLevel, setStartingLevel] = useState<string>('finished');
  const [unitOfMeasure, setUnitOfMeasure] = useState<'US' | 'Metric'>('US');
  const [showDetails, setShowDetails] = useState<boolean>(true);
  
  // State for demands
  const [demands, setDemands] = useState<DemandItem[]>(sampleDemands);
  
  // State for dialogs
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState<boolean>(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState<boolean>(false);
  const [selectedDemandId, setSelectedDemandId] = useState<string | null>(null);
  const [currentNote, setCurrentNote] = useState<string>('');
  const [selectedDemand, setSelectedDemand] = useState<DemandItem | null>(null);
  
  // Handlers
  const handleApplyFilters = () => {
    // In a real app, this would fetch data based on filters
    console.log('Applying filters:', filters);
  };
  
  const openNoteDialog = (demandId: string) => {
    const demand = demands.find(d => d.id === demandId);
    setSelectedDemandId(demandId);
    setCurrentNote(demand?.notes || '');
    setIsNoteDialogOpen(true);
  };
  
  const saveNote = () => {
    if (!selectedDemandId) return;
    
    setDemands(demands.map(demand => 
      demand.id === selectedDemandId 
        ? { ...demand, notes: currentNote } 
        : demand
    ));
    
    setIsNoteDialogOpen(false);
  };
  
  const openDetailsDialog = (demand: DemandItem) => {
    setSelectedDemand(demand);
    setIsDetailsDialogOpen(true);
  };
  
  return (
    <div className="container mx-auto py-8 px-4 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Explainability Grid</h1>
        <p className="text-lg text-gray-800 max-w-3xl">
          Analyze supply commitments across different BOM levels with detailed visibility
        </p>
      </div>
      
      <div className="space-y-8">
        <FilterPanel 
          filters={filters}
          onFilterChange={setFilters}
          onApplyFilters={handleApplyFilters}
        />
        
        <LevelSelector 
          bomLevels={bomLevels}
          selectedLevels={selectedLevels}
          startingLevel={startingLevel}
          unitOfMeasure={unitOfMeasure}
          showDetails={showDetails}
          onLevelSelectionChange={setSelectedLevels}
          onStartingLevelChange={setStartingLevel}
          onUnitOfMeasureChange={setUnitOfMeasure}
          onShowDetailsChange={setShowDetails}
        />
        
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Supply Commitments</h2>
            <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {demands.length} items
            </div>
          </div>
          
          <GridTable 
            demands={demands}
            selectedLevels={selectedLevels}
            showDetails={showDetails}
            onOpenDetails={openDetailsDialog}
            onOpenNote={openNoteDialog}
          />
        </div>
      </div>
      
      <NoteDialog 
        isOpen={isNoteDialogOpen}
        onClose={() => setIsNoteDialogOpen(false)}
        note={currentNote}
        onNoteChange={setCurrentNote}
        onSave={saveNote}
      />
      
      <DetailsDialog 
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        demand={selectedDemand}
      />
    </div>
  );
} 