'use client';

import { Card, CardContent } from '@/components/ui/card';
import { DemandItem, BomLevel } from './types';
import { MagnifyingGlassIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface GridTableProps {
  demands: DemandItem[];
  selectedLevels: string[];
  showDetails: boolean;
  onOpenDetails: (demand: DemandItem) => void;
  onOpenNote: (demandId: string) => void;
}

export default function GridTable({
  demands,
  selectedLevels,
  showDetails,
  onOpenDetails,
  onOpenNote
}: GridTableProps) {
  return (
    <Card className="shadow-lg border-0 rounded-xl overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider border-r border-gray-300">
                  Demand
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider border-r border-gray-300">
                  Customer
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider border-r border-gray-300">
                  Product
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider border-r border-gray-300">
                  Description
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider border-r border-gray-300">
                  Requested Date
                </th>
                <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider border-r border-gray-300">
                  Schedule Date
                </th>
                
                {selectedLevels.includes('finished') && (
                  <>
                    <th scope="col" className="px-3 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wider border-r border-gray-300 bg-blue-100">
                      Inventory
                    </th>
                    <th scope="col" className="px-3 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wider border-r border-gray-300 bg-blue-100">
                      Supply
                    </th>
                    <th scope="col" className="px-3 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wider border-r border-gray-300 bg-blue-100">
                      Due Date
                    </th>
                    <th scope="col" className="px-3 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wider border-r border-gray-300 bg-blue-100">
                      Supply Commit
                    </th>
                  </>
                )}
                
                {selectedLevels.includes('subassembly') && (
                  <>
                    <th scope="col" className="px-3 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wider border-r border-gray-300 bg-green-100">
                      Inventory
                    </th>
                    <th scope="col" className="px-3 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wider border-r border-gray-300 bg-green-100">
                      Supply
                    </th>
                    <th scope="col" className="px-3 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wider border-r border-gray-300 bg-green-100">
                      Due Date
                    </th>
                    <th scope="col" className="px-3 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wider border-r border-gray-300 bg-green-100">
                      Supply Commit
                    </th>
                  </>
                )}
                
                <th scope="col" className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {demands.map((demand) => (
                <tr key={demand.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 border-r border-gray-300">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      demand.type === 'order' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {demand.type === 'order' ? 'Order' : 'Forecast'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 border-r border-gray-300">
                    <div>
                      <div className="font-medium">{demand.customerNumber}</div>
                      <div className="text-sm text-gray-600">{demand.customerName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 border-r border-gray-300">
                    {demand.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 border-r border-gray-300">
                    {demand.productDescription}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 border-r border-gray-300">
                    {demand.customerRequestedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 border-r border-gray-300">
                    {demand.customerScheduleDate}
                  </td>
                  
                  {selectedLevels.includes('finished') && demand.levels['finished'] && (
                    <>
                      <td className="px-3 py-4 whitespace-nowrap text-base text-center text-gray-900 border-r border-gray-300 bg-blue-50">
                        {demand.levels['finished'].inventory}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-base text-center text-gray-900 border-r border-gray-300 bg-blue-50">
                        {demand.levels['finished'].supply}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-base text-center text-gray-900 border-r border-gray-300 bg-blue-50">
                        {demand.levels['finished'].dueDate}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-base text-center font-medium text-indigo-700 border-r border-gray-300 bg-blue-50">
                        {demand.levels['finished'].supplyCommitQty} ({demand.levels['finished'].supplyCommitDate})
                      </td>
                    </>
                  )}
                  
                  {selectedLevels.includes('subassembly') && demand.levels['subassembly'] && (
                    <>
                      <td className="px-3 py-4 whitespace-nowrap text-base text-center text-gray-900 border-r border-gray-300 bg-green-50">
                        {demand.levels['subassembly'].inventory}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-base text-center text-gray-900 border-r border-gray-300 bg-green-50">
                        {demand.levels['subassembly'].supply}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-base text-center text-gray-900 border-r border-gray-300 bg-green-50">
                        {demand.levels['subassembly'].dueDate}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-base text-center font-medium text-indigo-700 border-r border-gray-300 bg-green-50">
                        {demand.levels['subassembly'].supplyCommitQty} ({demand.levels['subassembly'].supplyCommitDate})
                      </td>
                    </>
                  )}
                  
                  <td className="px-6 py-4 whitespace-nowrap text-base text-right space-x-3">
                    <button 
                      onClick={() => onOpenDetails(demand)}
                      className="text-indigo-700 hover:text-indigo-900 inline-flex items-center bg-indigo-50 px-3 py-1 rounded-md hover:bg-indigo-100 transition-colors"
                    >
                      <MagnifyingGlassIcon className="h-5 w-5 mr-1" />
                      <span className="font-medium">Details</span>
                    </button>
                    <button 
                      onClick={() => onOpenNote(demand.id)}
                      className={`${
                        demand.notes 
                          ? 'text-amber-600 bg-amber-50 hover:bg-amber-100' 
                          : 'text-gray-600 bg-gray-50 hover:bg-gray-100'
                      } inline-flex items-center px-3 py-1 rounded-md transition-colors`}
                    >
                      <ChatBubbleLeftRightIcon className="h-5 w-5 mr-1" />
                      <span className="font-medium">{demand.notes ? 'Edit Note' : 'Add Note'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
} 