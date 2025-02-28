// components/AuditLog.tsx
import React from 'react';

interface AuditLogProps {
  logs: any[];
}

const AuditLog: React.FC<AuditLogProps> = ({ logs }) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Audit Trail</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">User</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Action</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{log.USER}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{log.ACTION}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{new Date(log.TIMESTAMP).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AuditLog;
