"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronRightIcon, PencilIcon } from "lucide-react";

interface BOMData {
  productFamily: string;
  businessUnit: string;
  productCategory: string;
  outputComponent: string;
  inputComponent: string;
  downBinIndicator: boolean;
  priority: number;
  timePhases: { [key: string]: number };
}

export default function BOMTimePhaseSetup() {
  // State management
  const [attributeType, setAttributeType] = useState("priorityTP");
  const [productGroup, setProductGroup] = useState("FGP");
  const [productFamily, setProductFamily] = useState("IPO4");
  const [businessUnit, setBusinessUnit] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [inputComponent, setInputComponent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Sample BOM data
  const [bomData, setBomData] = useState<BOMData[]>([
    {
      productFamily: "IPO4",
      businessUnit: "DT",
      productCategory: "FIN24-200-A1",
      outputComponent: "YIN04-200-A1",
      inputComponent: "PF-FIN24-BSE-N-A1",
      downBinIndicator: true,
      priority: 3,
      timePhases: {
        "FY 2014 - 2 (Mar)": 0,
        "FY 2014 - 3 (Apr)": 0,
        "FY 2014 - 4 (May)": 0
      }
    },
    {
      productFamily: "IPO4",
      businessUnit: "DT",
      productCategory: "FIN24-200-A1",
      outputComponent: "YIN04-200-A1",
      inputComponent: "PF-FIN24-BSE-N-A1",
      downBinIndicator: false,
      priority: 0,
      timePhases: {
        "FY 2014 - 2 (Mar)": 0,
        "FY 2014 - 3 (Apr)": 0,
        "FY 2014 - 4 (May)": 0
      }
    },
    {
      productFamily: "IPO4",
      businessUnit: "DT",
      productCategory: "FIN24-200-A1",
      outputComponent: "YIN04-200-A1",
      inputComponent: "PF-FIN24-BSE-N-A1",
      downBinIndicator: true,
      priority: 5,
      timePhases: {
        "FY 2014 - 2 (Mar)": 0,
        "FY 2014 - 3 (Apr)": 0,
        "FY 2014 - 4 (May)": 0
      }
    },
    {
      productFamily: "IPO4",
      businessUnit: "DT",
      productCategory: "FIN24-200-A1",
      outputComponent: "YIN04-200-A1",
      inputComponent: "PF-FIN24-BSE-N-A1",
      downBinIndicator: false,
      priority: 1,
      timePhases: {
        "FY 2014 - 2 (Mar)": 0,
        "FY 2014 - 3 (Apr)": 0,
        "FY 2014 - 4 (May)": 0
      }
    },
    {
      productFamily: "IPO4",
      businessUnit: "DT",
      productCategory: "FIN24-200-A1",
      outputComponent: "YIN04-200-A1",
      inputComponent: "PF-FIN24-BSE-N-A1",
      downBinIndicator: true,
      priority: 0,
      timePhases: {
        "FY 2014 - 2 (Mar)": 0,
        "FY 2014 - 3 (Apr)": 0,
        "FY 2014 - 4 (May)": 0
      }
    }
  ]);

  const timePhaseColumns = [
    "FY 2014 - 2 (Mar)",
    "FY 2014 - 3 (Apr)",
    "FY 2014 - 4 (May)"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <Card className="bg-white dark:bg-gray-900 shadow-lg border-0">
          {/* Header Section with Gradient */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  BOM with Time Phase Settings
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Configure time phase settings for Bill of Materials components
                </p>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50">
            <div className="grid grid-cols-4 gap-6">
              <div>
                <Label className="text-sm mb-2 text-gray-700 dark:text-gray-300">Product Group: *</Label>
                <Select value={productGroup} onValueChange={setProductGroup}>
                  <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FGP">FGP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm mb-2 text-gray-700 dark:text-gray-300">Product Family: *</Label>
                <Select value={productFamily} onValueChange={setProductFamily}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IPO4">IPO4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm mb-2 text-gray-700 dark:text-gray-300">Business Unit:</Label>
                <Select value={businessUnit} onValueChange={setBusinessUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DT">DT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm mb-2 text-gray-700 dark:text-gray-300">Product Category:</Label>
                <Select value={productCategory} onValueChange={setProductCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cat1">Category 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
              <div>
                <Label className="text-sm mb-2 text-gray-700 dark:text-gray-300">Input Component:</Label>
                <Input 
                  value={inputComponent}
                  onChange={(e) => setInputComponent(e.target.value)}
                  placeholder="Enter input component"
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>
              <div>
                <Label className="text-sm mb-2 text-gray-700 dark:text-gray-300">Attribute Type:</Label>
                <RadioGroup 
                  value={attributeType}
                  onValueChange={setAttributeType}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="headerOnly" id="headerOnly" />
                    <Label htmlFor="headerOnly">Header Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="priorityTP" id="priorityTP" />
                    <Label htmlFor="priorityTP">Priority TP</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="exclusionTP" id="exclusionTP" />
                    <Label htmlFor="exclusionTP">Exclusion TP</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="downBinningTP" id="downBinningTP" />
                    <Label htmlFor="downBinningTP">Down Binning TP</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <Button 
                variant="outline"
                className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                Search
              </Button>
              <Button 
                variant="outline"
                className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                Reset
              </Button>
              <Button 
                variant="outline"
                className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                Export
              </Button>
              <Button 
                variant="outline"
                className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                Import
              </Button>
            </div>
          </div>

          {/* BOM Table */}
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Bill Of Material Maintenance</h2>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  Save
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  Maintain Column Value
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  Global Value Range
                </Button>
              </div>
            </div>

            <div className="border dark:border-gray-800 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800">
                    <TableHead className="font-semibold">Product Family</TableHead>
                    <TableHead className="font-semibold">Business Unit</TableHead>
                    <TableHead className="font-semibold">Product Category</TableHead>
                    <TableHead className="font-semibold">Output Component</TableHead>
                    <TableHead className="font-semibold">Input Component</TableHead>
                    <TableHead className="font-semibold">Down/Bin Indicator</TableHead>
                    <TableHead className="font-semibold">Priority</TableHead>
                    {timePhaseColumns.map((column) => (
                      <TableHead key={column} className="font-semibold">{column}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bomData.map((row, index) => (
                    <TableRow 
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <TableCell className="font-medium">{row.productFamily}</TableCell>
                      <TableCell>{row.businessUnit}</TableCell>
                      <TableCell>{row.productCategory}</TableCell>
                      <TableCell>{row.outputComponent}</TableCell>
                      <TableCell>{row.inputComponent}</TableCell>
                      <TableCell className="text-center">
                        {row.downBinIndicator ? "X" : ""}
                      </TableCell>
                      <TableCell className="text-center">{row.priority}</TableCell>
                      {timePhaseColumns.map((column) => (
                        <TableCell key={column} className="text-center">
                          {isEditing ? (
                            <Input
                              type="number"
                              value={row.timePhases[column]}
                              onChange={(e) => {
                                const newBomData = [...bomData];
                                newBomData[index].timePhases[column] = Number(e.target.value);
                                setBomData(newBomData);
                              }}
                              className="w-16 h-8 text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            />
                          ) : (
                            row.timePhases[column]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Bottom Radio Options */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <RadioGroup defaultValue="priorityTP" className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yieldMgmt" id="yieldMgmt" />
                <Label htmlFor="yieldMgmt" className="text-gray-700 dark:text-gray-300">Yield Mgmt</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="priorityTP" id="priorityTPBottom" />
                <Label htmlFor="priorityTPBottom" className="text-gray-700 dark:text-gray-300">Priority TP</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="exclusionTP" id="exclusionTPBottom" />
                <Label htmlFor="exclusionTPBottom" className="text-gray-700 dark:text-gray-300">Exclusion TP</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="downBinningTP" id="downBinningTPBottom" />
                <Label htmlFor="downBinningTPBottom" className="text-gray-700 dark:text-gray-300">Down Binning TP</Label>
              </div>
            </RadioGroup>
          </div>
        </Card>
      </div>
    </div>
  );
} 