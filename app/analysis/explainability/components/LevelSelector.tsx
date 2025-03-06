'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { BomLevel } from './types';
import { LayersIcon } from '@/components/icons/LayersIcon';

interface LevelSelectorProps {
  bomLevels: BomLevel[];
  selectedLevels: string[];
  startingLevel: string;
  unitOfMeasure: 'US' | 'Metric';
  showDetails: boolean;
  onLevelSelectionChange: (levels: string[]) => void;
  onStartingLevelChange: (level: string) => void;
  onUnitOfMeasureChange: (uom: 'US' | 'Metric') => void;
  onShowDetailsChange: (show: boolean) => void;
}

export default function LevelSelector({
  bomLevels,
  selectedLevels,
  startingLevel,
  unitOfMeasure,
  showDetails,
  onLevelSelectionChange,
  onStartingLevelChange,
  onUnitOfMeasureChange,
  onShowDetailsChange
}: LevelSelectorProps) {
  const handleLevelToggle = (levelId: string) => {
    if (selectedLevels.includes(levelId)) {
      onLevelSelectionChange(selectedLevels.filter(id => id !== levelId));
    } else {
      onLevelSelectionChange([...selectedLevels, levelId]);
    }
  };

  return (
    <Card className="rounded-xl overflow-hidden shadow-md border-2 border-gray-200">
      <div className="bg-emerald-700 px-6 py-4">
        <h2 className="text-white font-bold text-lg flex items-center">
          <LayersIcon className="h-5 w-5 mr-2" />
          BOM Level Configuration
        </h2>
      </div>
      <CardContent className="p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <Label className="text-sm font-bold text-gray-800 mb-2 block">
              Select BOM Levels
            </Label>
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-300">
              {bomLevels.map((level) => (
                <div key={level.id} className="flex items-center p-2 hover:bg-white rounded-md transition-colors">
                  <Checkbox
                    id={`level-${level.id}`}
                    checked={selectedLevels.includes(level.id)}
                    onCheckedChange={() => handleLevelToggle(level.id)}
                    className="mr-2 h-5 w-5 border-2 border-gray-400 text-indigo-600"
                  />
                  <Label
                    htmlFor={`level-${level.id}`}
                    className="text-base text-gray-900 cursor-pointer font-medium"
                  >
                    {level.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="startingLevel" className="text-sm font-bold text-gray-800 mb-2 block">
              Display results from
            </Label>
            <Select 
              value={startingLevel} 
              onValueChange={onStartingLevelChange}
            >
              <SelectTrigger id="startingLevel" className="w-full bg-white text-gray-900 border-2 border-gray-300 focus:border-indigo-500">
                <SelectValue placeholder="Select starting level" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900">
                {bomLevels.map((level) => (
                  <SelectItem key={level.id} value={level.id}>
                    {level.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="uom" className="text-sm font-bold text-gray-800 mb-2 block">
              Unit of Measure
            </Label>
            <Select 
              value={unitOfMeasure} 
              onValueChange={(value: 'US' | 'Metric') => onUnitOfMeasureChange(value)}
            >
              <SelectTrigger id="uom" className="w-full bg-white text-gray-900 border-2 border-gray-300 focus:border-indigo-500">
                <SelectValue placeholder="Select UOM" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900">
                <SelectItem value="US">US</SelectItem>
                <SelectItem value="Metric">Metric</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm font-bold text-gray-800 mb-2 block">
              Display Options
            </Label>
            <div className="flex items-center bg-white p-3 rounded-md border border-gray-300">
              <Checkbox
                id="showDetails"
                checked={showDetails}
                onCheckedChange={(checked) => onShowDetailsChange(checked as boolean)}
                className="mr-2 h-5 w-5 border-2 border-gray-400"
              />
              <Label
                htmlFor="showDetails"
                className="text-base text-gray-900 cursor-pointer font-medium"
              >
                Display Location, Part number, Part description for every level
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 