import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowPathIcon, ArrowsRightLeftIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface MappingField {
  sourceField: string;
  targetField: string;
  dataType: string;
  transform?: string;
}

interface DataMappingInterfaceProps {
  integrationId: string;
  integrationName: string;
  provider: string;
  onSave: (mappings: MappingField[]) => void;
  onCancel: () => void;
}

export function DataMappingInterface({ 
  integrationId, 
  integrationName, 
  provider, 
  onSave, 
  onCancel 
}: DataMappingInterfaceProps) {
  // Sample data for demonstration
  const [mappings, setMappings] = useState<MappingField[]>([
    { sourceField: 'product_id', targetField: 'product_id', dataType: 'string' },
    { sourceField: 'product_name', targetField: 'product_name', dataType: 'string' },
    { sourceField: 'category', targetField: 'category', dataType: 'string' },
    { sourceField: 'price', targetField: 'price', dataType: 'number', transform: 'multiply(100)' },
    { sourceField: 'stock_level', targetField: 'inventory_level', dataType: 'number' },
  ]);

  const [availableSourceFields] = useState([
    'product_id', 'product_name', 'category', 'price', 'stock_level', 
    'sku', 'description', 'weight', 'dimensions', 'manufacturer',
    'created_at', 'updated_at', 'is_active', 'tax_class', 'vendor_id'
  ]);

  const [availableTargetFields] = useState([
    'product_id', 'product_name', 'category', 'price', 'inventory_level',
    'sku', 'description', 'weight', 'dimensions', 'manufacturer',
    'created_date', 'modified_date', 'active', 'tax_category', 'supplier_id'
  ]);

  const handleAddMapping = () => {
    setMappings([
      ...mappings, 
      { 
        sourceField: availableSourceFields[0], 
        targetField: availableTargetFields[0], 
        dataType: 'string' 
      }
    ]);
  };

  const handleRemoveMapping = (index: number) => {
    const newMappings = [...mappings];
    newMappings.splice(index, 1);
    setMappings(newMappings);
  };

  const handleUpdateMapping = (index: number, field: keyof MappingField, value: string) => {
    const newMappings = [...mappings];
    newMappings[index] = { ...newMappings[index], [field]: value };
    setMappings(newMappings);
  };

  const handleSaveMapping = () => {
    onSave(mappings);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Data Mapping Configuration</h2>
          <p className="text-gray-600">
            Configure how data from {provider} maps to ChainSync fields
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={handleSaveMapping}
          >
            Save Mapping
          </Button>
        </div>
      </div>

      <Tabs defaultValue="fields" className="mt-6">
        <TabsList className="mb-6">
          <TabsTrigger value="fields">Field Mapping</TabsTrigger>
          <TabsTrigger value="preview">Data Preview</TabsTrigger>
          <TabsTrigger value="validation">Validation Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="fields">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Field Mappings</CardTitle>
              <CardDescription>
                Map fields from {provider} to their corresponding fields in ChainSync
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-12 gap-4 font-medium text-gray-700 mb-2 px-2">
                <div className="col-span-4">Source Field ({provider})</div>
                <div className="col-span-4">Target Field (ChainSync)</div>
                <div className="col-span-2">Data Type</div>
                <div className="col-span-2">Actions</div>
              </div>

              <div className="space-y-3">
                {mappings.map((mapping, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-3 rounded-md">
                    <div className="col-span-4">
                      <select 
                        className="w-full border border-gray-300 rounded-md px-3 py-1"
                        value={mapping.sourceField}
                        onChange={(e) => handleUpdateMapping(index, 'sourceField', e.target.value)}
                      >
                        {availableSourceFields.map(field => (
                          <option key={field} value={field}>{field}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-4">
                      <select 
                        className="w-full border border-gray-300 rounded-md px-3 py-1"
                        value={mapping.targetField}
                        onChange={(e) => handleUpdateMapping(index, 'targetField', e.target.value)}
                      >
                        {availableTargetFields.map(field => (
                          <option key={field} value={field}>{field}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <select 
                        className="w-full border border-gray-300 rounded-md px-3 py-1"
                        value={mapping.dataType}
                        onChange={(e) => handleUpdateMapping(index, 'dataType', e.target.value)}
                      >
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                        <option value="date">Date</option>
                        <option value="object">Object</option>
                      </select>
                    </div>
                    <div className="col-span-2 flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="px-2 py-1 h-8"
                        onClick={() => {
                          const transform = prompt('Enter transformation (e.g., multiply(100), toUpperCase(), formatDate())', mapping.transform || '');
                          if (transform !== null) {
                            handleUpdateMapping(index, 'transform', transform);
                          }
                        }}
                      >
                        <ArrowsRightLeftIcon className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="px-2 py-1 h-8 text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleRemoveMapping(index)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="flex items-center"
                  onClick={handleAddMapping}
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Field Mapping
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Data Preview</CardTitle>
              <CardDescription>
                Preview how your data will look after mapping
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {mappings.map((mapping, index) => (
                        <th 
                          key={index}
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {mapping.targetField}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[1, 2, 3].map((row) => (
                      <tr key={row}>
                        {mappings.map((mapping, colIndex) => (
                          <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {mapping.dataType === 'number' 
                              ? Math.floor(Math.random() * 1000) 
                              : mapping.dataType === 'date'
                                ? new Date().toISOString().split('T')[0]
                                : `Sample ${mapping.targetField} ${row}`
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" className="flex items-center">
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  Refresh Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation">
          <Card>
            <CardHeader>
              <CardTitle>Validation Rules</CardTitle>
              <CardDescription>
                Set up validation rules to ensure data quality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700 mb-2">No validation rules configured yet.</p>
                  <p className="text-gray-500 text-sm">
                    Validation rules help ensure that data meets your quality standards before being imported.
                  </p>
                </div>
                
                <Button variant="outline" className="flex items-center">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Validation Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 