import React from 'react';

export function DashboardCard({ title, value, icon, color }: {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        {icon && (
          <div className={`p-3 rounded-full ${color || 'bg-blue-100'}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dashboardcards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardCard 
        title="Total Products" 
        value="128" 
      />
      <DashboardCard 
        title="Active Forecasts" 
        value="24" 
      />
      <DashboardCard 
        title="Accuracy Rate" 
        value="92%" 
      />
      <DashboardCard 
        title="Forecast Horizon" 
        value="12 months" 
      />
    </div>
  );
}
