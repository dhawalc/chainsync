'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <AlertCircle className="mr-2 h-5 w-5" />
            Something went wrong!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            We apologize for the inconvenience. An error occurred while loading this page.
          </p>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-500 font-mono">
              {error.message || 'An unexpected error occurred'}
            </p>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
            >
              Go to Homepage
            </Button>
            <Button
              onClick={reset}
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 