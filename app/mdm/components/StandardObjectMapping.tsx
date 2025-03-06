'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowsRightLeftIcon,
  CheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface ObjectMapping {
  id: string;
  sourceObject: string;
  sourceTable: string;
  targetObject: string;
  targetTable: string;
  status: 'active' | 'inactive';
  lastSync: string;
}

const mappings: ObjectMapping[] = [
  { 
    id: '1', 
    sourceObject: 'Material Master', 
    sourceTable: 'MARA/MARC', 
    targetObject: 'Product Master', 
    targetTable: '/SAPAPO/MATKEY', 
    status: 'active', 
    lastSync: '2023-10-15 08:30:22' 
  },
  { 
    id: '2', 
    sourceObject: 'Customer Master', 
    sourceTable: 'KNA1', 
    targetObject: 'Location Master', 
    targetTable: '/SAPAPO/LOCID', 
    status: 'active', 
    lastSync: '2023-10-15 08:32:15' 
  },
  { 
    id: '3', 
    sourceObject: 'Plant', 
    sourceTable: 'T001W', 
    targetObject: 'Location Master', 
    targetTable: '/SAPAPO/LOCID', 
    status: 'active', 
    lastSync: '2023-10-15 08:33:40' 
  },
  { 
    id: '4', 
    sourceObject: 'BOM', 
    sourceTable: 'MAST/STPO', 
    targetObject: 'PPM', 
    targetTable: '/SAPAPO/PPM', 
    status: 'active', 
    lastSync: '2023-10-15 08:35:12' 
  },
  { 
    id: '5', 
    sourceObject: 'Routing', 
    sourceTable: 'PLKO/PLPO', 
    targetObject: 'PPM', 
    targetTable: '/SAPAPO/PPM', 
    status: 'inactive', 
    lastSync: '2023-10-14 14:22:05' 
  },
];

export default function StandardObjectMapping() {
  return (
    <Card className="border-gray-200">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-800">Standard Object Mapping</CardTitle>
            <CardDescription>
              Direct mapping from source objects to standard APO objects without intermediate staging
            </CardDescription>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Refresh Mappings
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source Object
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source Table
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mapping
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target Object
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target Table
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Sync
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mappings.map((mapping) => (
                <tr key={mapping.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {mapping.sourceObject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {mapping.sourceTable}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <ArrowsRightLeftIcon className="h-5 w-5 text-indigo-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {mapping.targetObject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {mapping.targetTable}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      mapping.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {mapping.status === 'active' ? (
                        <CheckIcon className="h-4 w-4 mr-1" />
                      ) : null}
                      {mapping.status.charAt(0).toUpperCase() + mapping.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {mapping.lastSync}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
          <h4 className="text-md font-medium text-blue-800 mb-2">Direct Object Creation</h4>
          <p className="text-sm text-blue-700">
            All mappings are configured to create standard APO objects directly without intermediate custom Z tables.
            This ensures data integrity and simplifies the integration architecture.
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 