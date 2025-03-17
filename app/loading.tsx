import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse space-y-8">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="flex space-x-4">
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-8 w-1/2 bg-gray-200 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 