import { Suspense } from 'react';
import AIAssistant from '@/components/AIAssistant';
import { Skeleton } from '@/components/ui/skeleton';

export default function AssistantPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">AI Assistant</h1>
      <Suspense fallback={<AssistantSkeleton />}>
        <AIAssistant />
      </Suspense>
    </div>
  );
}

function AssistantSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-8 w-1/3" />
    </div>
  );
} 