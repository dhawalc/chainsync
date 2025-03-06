'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UserIcon,
  PencilIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

interface DataElementOwner {
  id: string;
  element: string;
  owner: string;
  department: string;
  email: string;
  phone: string;
  lastUpdated: string;
}

const owners: DataElementOwner[] = [
  { 
    id: '1', 
    element: 'Material Master', 
    owner: 'John Smith', 
    department: 'Master Data', 
    email: 'john.smith@example.com', 
    phone: '555-123-4567', 
    lastUpdated: '2023-09-15' 
  },
  { 
    id: '2', 
    element: 'Customer Master', 
    owner: 'Emily Johnson', 
    department: 'Sales', 
    email: 'emily.johnson@example.com', 
    phone: '555-234-5678', 
    lastUpdated: '2023-09-20' 
  },
  { 
    id: '3', 
    element: 'Vendor Master', 
    owner: 'Michael Brown', 
    department: 'Procurement', 
    email: 'michael.brown@example.com', 
    phone: '555-345-6789', 
    lastUpdated: '2023-09-22' 
  },
  { 
    id: '4', 
    element: 'Bill of Materials', 
    owner: 'Sarah Davis', 
    department: 'Engineering', 
    email: 'sarah.davis@example.com', 
    phone: '555-456-7890', 
    lastUpdated: '2023-09-25' 
  },
  { 
    id: '5', 
    element: 'Routing', 
    owner: 'Robert Wilson', 
    department: 'Production', 
    email: 'robert.wilson@example.com', 
    phone: '555-567-8901', 
    lastUpdated: '2023-09-28' 
  },
  { 
    id: '6', 
    element: 'Work Centers', 
    owner: 'Jennifer Lee', 
    department: 'Production', 
    email: 'jennifer.lee@example.com', 
    phone: '555-678-9012', 
    lastUpdated: '2023-10-01' 
  },
  { 
    id: '7', 
    element: 'Production Version', 
    owner: 'David Martinez', 
    department: 'Production Planning', 
    email: 'david.martinez@example.com', 
    phone: '555-789-0123', 
    lastUpdated: '2023-10-05' 
  },
];

export default function DataElementOwnership() {
  return (
    <Card className="border-gray-200">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-800">Data Element Ownership</CardTitle>
            <CardDescription>
              Each data element has a single functional owner responsible for its development and maintenance
            </CardDescription>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <UserPlusIcon className="h-4 w-4 mr-2" />
            Assign Owner
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Element
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {owners.map((owner) => (
                <tr key={owner.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {owner.element}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{owner.owner}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {owner.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{owner.email}</div>
                    <div>{owner.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {owner.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-md p-4">
          <h4 className="text-md font-medium text-amber-800 mb-2">Single Ownership Model</h4>
          <p className="text-sm text-amber-700">
            Each data element has exactly one functional owner who is responsible for its development, 
            maintenance, and quality. This ensures clear accountability and streamlined decision-making.
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 