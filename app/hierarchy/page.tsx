// app/hierarchy/page.tsx
'use client';

import { useEffect, useState } from 'react';
import HierarchyChart from '@/components/HierarchyChart';

export default function HierarchyPage() {
  const [hierarchy, setHierarchy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHierarchy = async () => {
      try {
        const res = await fetch('/api/hierarchy');
        const data = await res.json();
        setHierarchy(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to load hierarchy data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHierarchy();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dynamic Hierarchy Management</h1>
      <HierarchyChart data={hierarchy} />
    </div>
  );
}
