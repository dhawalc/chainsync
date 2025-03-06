import React from 'react';

export const LayersIcon = ({ className = "h-6 w-6" }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className={className}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m0 0l4.179 2.25-4.179 2.25m0-4.5L12 15l-5.571-3z" 
      />
    </svg>
  );
}; 