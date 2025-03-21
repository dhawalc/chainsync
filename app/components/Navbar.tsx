import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SparklesIcon } from '@heroicons/react/24/outline';
import ChatAssistantModal from './ai/ChatAssistantModal';

export default function Navbar() {
  const [isChatAssistantModalOpen, setIsChatAssistantModalOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* ... existing navigation links ... */}
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsChatAssistantModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <SparklesIcon className="h-5 w-5 mr-2" />
              AI Assistant
            </button>
          </div>
        </div>
      </div>

      <ChatAssistantModal
        isOpen={isChatAssistantModalOpen}
        onClose={() => setIsChatAssistantModalOpen(false)}
      />
    </nav>
  );
} 