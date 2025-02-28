// components/HierarchyChart.tsx
import React from 'react';

interface HierarchyChartProps {
  data: any[];
}

const HierarchyChart: React.FC<HierarchyChartProps> = ({ data }) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Product Hierarchy</h2>
      <div className="bg-white p-4 rounded shadow">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </section>
  );
};

export default HierarchyChart;
