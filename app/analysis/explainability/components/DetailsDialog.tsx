'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DemandItem } from './types';
import { CubeIcon } from '@heroicons/react/24/outline';

interface DetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  demand: DemandItem | null;
}

export default function DetailsDialog({
  isOpen,
  onClose,
  demand
}: DetailsDialogProps) {
  if (!demand) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-white border-0 rounded-xl shadow-2xl">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <div className="flex items-center">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mr-3 ${
              demand.type === 'order' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-purple-100 text-purple-800'
            }`}>
              {demand.type === 'order' ? 'Order' : 'Forecast'}
            </span>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Details
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="py-6">
          <div className="grid grid-cols-2 gap-6 mb-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div>
              <h3 className="text-base font-bold text-gray-800">Customer</h3>
              <p className="mt-1 text-base text-gray-900">{demand.customerNumber} - {demand.customerName}</p>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800">Product</h3>
              <p className="mt-1 text-base text-gray-900">{demand.product} - {demand.productDescription}</p>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800">Requested Date</h3>
              <p className="mt-1 text-base text-gray-900">{demand.customerRequestedDate}</p>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800">Schedule Date</h3>
              <p className="mt-1 text-base text-gray-900">{demand.customerScheduleDate}</p>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <CubeIcon className="h-5 w-5 mr-2 text-indigo-600" />
            Supply Details
          </h3>
          
          {Object.entries(demand.levels).map(([levelId, levelData]) => (
            <div key={levelId} className="mb-6">
              <h4 className="text-base font-bold text-gray-800 mb-2 flex items-center">
                <span className={`h-3 w-3 rounded-full mr-2 ${
                  levelId === 'finished' 
                    ? 'bg-blue-500' 
                    : levelId === 'subassembly' 
                      ? 'bg-green-500' 
                      : 'bg-amber-500'
                }`}></span>
                {levelId === 'finished' ? 'Finished Goods' : 
                 levelId === 'subassembly' ? 'Sub-Assembly' : 
                 levelId === 'raw' ? 'Raw Materials' : levelId}
              </h4>
              <div className="bg-white p-4 rounded-md border-2 border-gray-300 shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm font-bold text-gray-700">Inventory</p>
                    <p className="text-lg font-medium text-gray-900">{levelData.inventory}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700">Supply</p>
                    <p className="text-lg font-medium text-gray-900">{levelData.supply}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700">Due Date</p>
                    <p className="text-lg font-medium text-gray-900">{levelData.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700">Supply Commit</p>
                    <p className="text-lg font-medium text-indigo-600">
                      {levelData.supplyCommitQty} ({levelData.supplyCommitDate})
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {demand.notes && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Notes</h3>
              <div className="bg-amber-50 p-4 rounded-md border-2 border-amber-300">
                <p className="text-base text-gray-900">{demand.notes}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 