'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { XMarkIcon, PencilIcon } from '@heroicons/react/24/outline';

interface DetailField {
  label: string;
  value: string | number | React.ReactNode;
  span?: 'full' | 'half';
}

interface DetailSection {
  title: string;
  fields: DetailField[];
}

interface MdmDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
  title: string;
  subtitle?: string;
  sections: DetailSection[];
  showEditButton?: boolean;
}

export default function MdmDetailView({
  isOpen,
  onClose,
  onEdit,
  title,
  subtitle,
  sections,
  showEditButton = true
}: MdmDetailViewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">{title}</DialogTitle>
              {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
            </div>
            <div className="flex items-center space-x-2">
              {showEditButton && onEdit && (
                <Button 
                  onClick={onEdit}
                  variant="outline"
                  className="text-indigo-700 border-indigo-300 hover:bg-indigo-50"
                >
                  <PencilIcon className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">{section.title}</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.fields.map((field, fieldIndex) => (
                    <div 
                      key={fieldIndex} 
                      className={field.span === 'full' ? 'col-span-1 md:col-span-2' : ''}
                    >
                      <div className="text-xs font-medium text-gray-500 mb-1">{field.label}</div>
                      <div className="text-sm text-gray-900">{field.value || '-'}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
} 