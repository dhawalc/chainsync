import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-600">
            <SearchX className="mr-2 h-5 w-5" />
            Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex justify-end">
            <Link href="/">
              <Button>
                Return Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 