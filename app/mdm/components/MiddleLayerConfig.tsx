'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowsRightLeftIcon,
  CodeBracketIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface FieldMapping {
  id: string;
  sourceField: string;
  sourceTable: string;
  targetField: string;
  targetTable: string;
  mappingType: 'direct' | 'transformation';
  transformation?: string;
}

const fieldMappings: FieldMapping[] = [
  { 
    id: '1', 
    sourceField: 'MATNR', 
    sourceTable: 'MARA', 
    targetField: 'PRODUCT_ID', 
    targetTable: '/SAPAPO/MATKEY', 
    mappingType: 'direct' 
  },
  { 
    id: '2', 
    sourceField: 'MAKTX', 
    sourceTable: 'MAKT', 
    targetField: 'PRODUCT_DESC', 
    targetTable: '/SAPAPO/MATKEY', 
    mappingType: 'direct' 
  },
  { 
    id: '3', 
    sourceField: 'MEINS', 
    sourceTable: 'MARA', 
    targetField: 'BASE_UOM', 
    targetTable: '/SAPAPO/MATKEY', 
    mappingType: 'direct' 
  },
  { 
    id: '4', 
    sourceField: 'MTART', 
    sourceTable: 'MARA', 
    targetField: 'PRODUCT_TYPE', 
    targetTable: '/SAPAPO/MATKEY', 
    mappingType: 'transformation',
    transformation: 'IF MTART = "FERT" THEN "FG" ELSE IF MTART = "HALB" THEN "SEMI" ELSE "RAW"' 
  },
  { 
    id: '5', 
    sourceField: 'KUNNR', 
    sourceTable: 'KNA1', 
    targetField: 'LOCATION_ID', 
    targetTable: '/SAPAPO/LOCID', 
    mappingType: 'transformation',
    transformation: 'CONCAT("CUST_", KUNNR)' 
  },
];

export default function MiddleLayerConfig() {
  const [activeTab, setActiveTab] = useState('mappings');
  
  return (
    <Card className="border-gray-200">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-xl font-semibold text-gray-800">Middle Layer Configuration</CardTitle>
        <CardDescription>
          Configure field mappings between source and target systems with no data transformation
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-gray-200 bg-gray-50 p-0">
            <TabsTrigger 
              value="mappings" 
              className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-indigo-600 data-[state=active]:bg-white data-[state=active]:shadow-none"
            >
              Field Mappings
            </TabsTrigger>
            <TabsTrigger 
              value="validation" 
              className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-indigo-600 data-[state=active]:bg-white data-[state=active]:shadow-none"
            >
              Validation Report
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="mappings" className="p-6">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">Field-to-Field Mappings</h3>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Add New Mapping
              </Button>
            </div>
            
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source Field
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source Table
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mapping
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Target Field
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Target Table
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fieldMappings.map((mapping) => (
                    <tr key={mapping.id} className={mapping.mappingType === 'transformation' ? 'bg-amber-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {mapping.sourceField}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {mapping.sourceTable}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <ArrowsRightLeftIcon className="h-5 w-5 text-indigo-500 mx-auto" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {mapping.targetField}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {mapping.targetTable}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          mapping.mappingType === 'direct' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {mapping.mappingType === 'direct' ? 'Direct' : 'Transform'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Transformation details for selected mapping */}
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-800 mb-2">Transformation Details</h4>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <div className="flex items-start mb-2">
                  <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                  <p className="text-sm text-amber-700 font-medium">
                    Warning: Transformations should be limited to simple mapping operations only.
                  </p>
                </div>
                <div className="flex items-start">
                  <CodeBracketIcon className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700 font-medium mb-1">Transformation for MTART → PRODUCT_TYPE:</p>
                    <pre className="text-xs bg-gray-100 p-2 rounded border border-gray-300 overflow-x-auto">
                      IF MTART = "FERT" THEN "FG" 
                      ELSE IF MTART = "HALB" THEN "SEMI" 
                      ELSE "RAW"
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="validation" className="p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-6">Transformation Validation Report</h3>
            
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-green-700 font-medium">Middle Layer Configuration Compliant</p>
                  <p className="text-sm text-green-600 mt-1">
                    All transformations are simple mapping operations with no complex data manipulation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mapping
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Complexity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      MATNR → PRODUCT_ID
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Direct
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      None
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Compliant
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      MTART → PRODUCT_TYPE
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Transformation
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Low (Simple Mapping)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Compliant
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      KUNNR → LOCATION_ID
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Transformation
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Low (Simple Concatenation)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Compliant
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 