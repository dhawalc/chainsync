"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Cog, Search, RotateCcw, Download, Upload, Plus, Factory } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ResourceMapping {
  id: string;
  location: string;
  resourceGroup: string;
  resourceName: string;
  capacity: number;
  isActive: boolean;
  efficiency: number;
  utilization: number;
  shiftPattern: string;
}

const initialResources: ResourceMapping[] = [
  {
    id: "RES1",
    location: "FAB1",
    resourceGroup: "Assembly",
    resourceName: "Assembly Line 1",
    capacity: 1000,
    isActive: true,
    efficiency: 95,
    utilization: 85,
    shiftPattern: "24/7",
  },
  {
    id: "RES2",
    location: "FAB2",
    resourceGroup: "Testing",
    resourceName: "Test Station 2",
    capacity: 500,
    isActive: true,
    efficiency: 90,
    utilization: 75,
    shiftPattern: "2 Shifts",
  },
];

export default function ResourceMappingSetup() {
  const [resources, setResources] = useState<ResourceMapping[]>(initialResources);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [newResource, setNewResource] = useState<Partial<ResourceMapping>>({});

  const handleAddResource = () => {
    if (newResource.location && newResource.resourceName) {
      const resource: ResourceMapping = {
        id: `RES${resources.length + 1}`,
        location: newResource.location,
        resourceGroup: newResource.resourceGroup || "",
        resourceName: newResource.resourceName,
        capacity: newResource.capacity || 0,
        isActive: true,
        efficiency: newResource.efficiency || 0,
        utilization: newResource.utilization || 0,
        shiftPattern: newResource.shiftPattern || "24/7",
      };
      setResources([...resources, resource]);
      setNewResource({});
    }
  };

  const filteredResources = selectedLocation
    ? resources.filter(res => res.location === selectedLocation)
    : resources;

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Resource Mapping Setup
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Configure and manage manufacturing resources and their capacities
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white gap-2">
                <Plus className="h-4 w-4" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Location</Label>
                  <Input
                    placeholder="Location"
                    value={newResource.location || ""}
                    onChange={(e) => setNewResource({ ...newResource, location: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Resource Group</Label>
                  <Input
                    placeholder="Resource Group"
                    value={newResource.resourceGroup || ""}
                    onChange={(e) => setNewResource({ ...newResource, resourceGroup: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Resource Name</Label>
                  <Input
                    placeholder="Resource Name"
                    value={newResource.resourceName || ""}
                    onChange={(e) => setNewResource({ ...newResource, resourceName: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Capacity</Label>
                  <Input
                    type="number"
                    placeholder="Capacity"
                    value={newResource.capacity || ""}
                    onChange={(e) => setNewResource({ ...newResource, capacity: Number(e.target.value) })}
                  />
                </div>
                <Button onClick={handleAddResource} className="mt-2">
                  Add Resource
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
              <Factory className="h-5 w-5 text-blue-500" />
              Resource Matrix
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
                  {Array.from(new Set(resources.map(r => r.location))).map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input placeholder="Search resources..." className="w-full" />
            </div>
            <div className="flex justify-end">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Resource Matrix Table */}
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50">
                  <TableHead>Location</TableHead>
                  <TableHead>Resource Group</TableHead>
                  <TableHead>Resource Name</TableHead>
                  <TableHead className="text-center">Capacity</TableHead>
                  <TableHead className="text-center">Active</TableHead>
                  <TableHead className="text-center">Efficiency (%)</TableHead>
                  <TableHead className="text-center">Utilization (%)</TableHead>
                  <TableHead>Shift Pattern</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResources.map((resource) => (
                  <TableRow 
                    key={resource.id}
                    className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Factory className="h-4 w-4 text-blue-500" />
                        <span>{resource.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                        {resource.resourceGroup}
                      </Badge>
                    </TableCell>
                    <TableCell>{resource.resourceName}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Cog className="h-4 w-4 text-blue-500" />
                        {resource.capacity}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <Switch
                          checked={resource.isActive}
                          onCheckedChange={(checked) => {
                            const updatedResources = resources.map(r =>
                              r.id === resource.id ? { ...r, isActive: checked } : r
                            );
                            setResources(updatedResources);
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <Badge variant="outline" className={`${
                          resource.efficiency >= 90 ? "bg-green-50 text-green-700 border-green-200" :
                          resource.efficiency >= 75 ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                          "bg-red-50 text-red-700 border-red-200"
                        }`}>
                          {resource.efficiency}%
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <Badge variant="outline" className={`${
                          resource.utilization >= 80 ? "bg-green-50 text-green-700 border-green-200" :
                          resource.utilization >= 60 ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                          "bg-red-50 text-red-700 border-red-200"
                        }`}>
                          {resource.utilization}%
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{resource.shiftPattern}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer Note */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
            Note: Resource capacity is measured in units per day
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 