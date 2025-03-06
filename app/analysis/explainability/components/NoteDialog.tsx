'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

interface NoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  note: string;
  onNoteChange: (note: string) => void;
  onSave: () => void;
}

export default function NoteDialog({
  isOpen,
  onClose,
  note,
  onNoteChange,
  onSave
}: NoteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-0 rounded-xl shadow-2xl">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <PencilSquareIcon className="h-6 w-6 mr-2 text-amber-500" />
            Add Note
          </DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <Textarea
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            placeholder="Enter your notes here..."
            className="min-h-[150px] text-base text-gray-900 border-2 border-gray-300 p-4 focus:border-amber-500 rounded-lg"
          />
        </div>
        <DialogFooter className="border-t border-gray-200 pt-4">
          <Button variant="outline" onClick={onClose} className="text-gray-900 border-2 border-gray-300 font-medium text-base rounded-md hover:bg-gray-100">
            Cancel
          </Button>
          <Button onClick={onSave} className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-base rounded-md">
            Save Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 