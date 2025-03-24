import { Suspense } from 'react';
import BOMGenerator from '@/components/BOMGenerator';
import { Skeleton } from '@/components/ui/skeleton';

export default function BOMPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">AI-Powered BOM Generator</h1>
      <Suspense fallback={<BOMSkeleton />}>
        <BOMGenerator />
      </Suspense>
    </div>
  );
}

function BOMSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-8 w-1/3" />
    </div>
  );
} 