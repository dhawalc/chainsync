"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Factory, Search, RotateCcw, Download, Upload, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Example semiconductor processes
const PROCESSES = {
  ASY: "Assembly",
  SCD: "Semiconductor Die",
  BKP: "Backend Processing",
  SLT: "Sort & Test",
  SRT: "Sort",
  THR: "Thermal Processing",
  TST: "Testing",
  WTD: "Wafer Test & Die"
} as const;

type ProcessCode = keyof typeof PROCESSES;

interface Location {
  id: string;
  name: string;
  code: string;
  type: string;
}

type ProcessMappings = {
  [key: string]: ProcessCode[];
};

// Example locations for semiconductor industry
const initialLocations: Location[] = [
  { id: "FAB1", name: "Fab 1 - Taiwan", code: "TWN1", type: "Fabrication" },
  { id: "FAB2", name: "Fab 2 - Singapore", code: "SGP1", type: "Fabrication" },
  { id: "ASY1", name: "Assembly 1 - Malaysia", code: "MYS1", type: "Assembly" },
  { id: "TST1", name: "Test 1 - China", code: "CHN1", type: "Testing" },
];

// Example process mappings with some default checked values
const initialProcessMappings: ProcessMappings = {
  FAB1: ["SCD", "BKP", "SLT", "TST"],
  FAB2: ["SCD", "BKP", "SRT", "WTD"],
  ASY1: ["ASY", "THR"],
  TST1: ["TST", "SLT", "WTD"],
};

export default function LocationProcessSetup() {
  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const [processMappings, setProcessMappings] = useState<ProcessMappings>(initialProcessMappings);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [newLocation, setNewLocation] = useState({
    name: "",
    code: "",
    type: ""
  });

  const handleAddLocation = () => {
    const id = newLocation.code.toUpperCase();
    const location: Location = {
      id,
      name: newLocation.name,
      code: newLocation.code.toUpperCase(),
      type: newLocation.type
    };
    setLocations([...locations, location]);
    setProcessMappings({
      ...processMappings,
      [id]: []
    });
    setNewLocation({ name: "", code: "", type: "" });
  };

  const handleProcessToggle = (locationId: string, process: ProcessCode) => {
    const currentMappings = processMappings[locationId] || [];
    const newMappings = currentMappings.includes(process)
      ? currentMappings.filter(p => p !== process)
      : [...currentMappings, process];
    
    setProcessMappings({
      ...processMappings,
      [locationId]: newMappings
    });
  };

  const filteredLocations = selectedLocation
    ? locations.filter(loc => loc.id === selectedLocation)
    : locations;

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Location Process Setup
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Configure process mappings for each manufacturing location
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white gap-2">
                <Plus className="h-4 w-4" />
                Add Location
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Location</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Input
                    placeholder="Location Name (e.g., Fab 3 - Japan)"
                    value={newLocation.name}
                    onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Input
                    placeholder="Location Code (e.g., FAB3)"
                    value={newLocation.code}
                    onChange={(e) => setNewLocation({ ...newLocation, code: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Select
                    value={newLocation.type}
                    onValueChange={(value) => setNewLocation({ ...newLocation, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fabrication">Fabrication</SelectItem>
                      <SelectItem value="assembly">Assembly</SelectItem>
                      <SelectItem value="testing">Testing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddLocation} className="mt-2">
                  Add Location
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="border-t-4 border-t-blue-500 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              Process Matrix
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500 hover:bg-blue-50">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-purple-500 hover:bg-purple-50">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500 hover:bg-green-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-orange-500 hover:bg-orange-50">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Filters */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input placeholder="Search processes..." className="w-full" />
            </div>
            <div className="flex justify-end">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Process Matrix Table */}
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50">
                  <TableHead className="w-48">Location</TableHead>
                  <TableHead className="w-48">Planning Relevant</TableHead>
                  {Object.entries(PROCESSES).map(([code, name]) => (
                    <TableHead key={code} className="text-center">
                      <div className="flex flex-col items-center">
                        <span>{name}</span>
                        <span className="text-xs text-gray-500">({code})</span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLocations.map((location) => (
                  <TableRow 
                    key={location.id} 
                    className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span>{location.name}</span>
                        <Badge 
                          variant="outline" 
                          className="ml-2 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
                        >
                          {processMappings[location.id]?.length || 0} processes
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Checkbox defaultChecked />
                    </TableCell>
                    {Object.entries(PROCESSES).map(([code]) => (
                      <TableCell key={code} className="text-center">
                        <Checkbox
                          checked={processMappings[location.id]?.includes(code as ProcessCode)}
                          onCheckedChange={() => handleProcessToggle(location.id, code as ProcessCode)}
                          className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer Note */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
            Note: Processes can be specific to planning without implications to ECC or APO
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 