'use client';

import { useEffect, useState } from 'react';

// Define types for our time-phase rows
interface TimePhaseRow {
  PRODUCT_ID: string;
  START_DATE: string;   // ISO date string (YYYY-MM-DD)
  END_DATE: string;     // ISO date string (YYYY-MM-DD)
  CYCLE_TIME: number;   // Cycle time value (could be lead time)
}

// Define bucket options
const bucketOptions = [
  { label: 'Weekly', value: 'WEEKLY' },
  { label: 'Monthly', value: 'MONTHLY' },
  { label: 'Fiscal Quarters', value: 'QUARTERLY' },
  { label: 'Yearly', value: 'YEARLY' },
];

export default function TimePhasePage() {
  const [bucket, setBucket] = useState('WEEKLY');
  const [rows, setRows] = useState<TimePhaseRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  // Fetch time-phase data based on bucket
  useEffect(() => {
    async function fetchTimePhaseData() {
      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching time-phase data for bucket: ${bucket}`);
        const res = await fetch(`/api/timephase?bucket=${bucket}`);
        const responseData = await res.json();
        console.log("API Response:", responseData);
        
        if (responseData.success && Array.isArray(responseData.data)) {
          setRows(responseData.data);
        } else if (Array.isArray(responseData)) {
          // Handle case where API returns array directly
          setRows(responseData);
        } else {
          setRows([]);
          if (responseData.error) {
            setError(responseData.error);
          }
        }
      } catch (err) {
        setError('Failed to load time-phase data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTimePhaseData();
  }, [bucket]);

  // Handle cell change
  const handleCellChange = (index: number, field: keyof TimePhaseRow, value: any) => {
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setRows(updatedRows);
  };

  // Save changes via POST to API route
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/timephase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bucket, data: rows }),
      });
      const result = await res.json();
      
      if (!result.success) throw new Error(result.error || 'Failed to save changes');
      alert('Changes saved successfully!');
    } catch (err: any) {
      alert(`Error saving changes: ${err.message}`);
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Format date for display (YYYY-MM-DD)
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    // If already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
    
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (e) {
      console.error("Invalid date:", dateString);
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 pt-8 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Time Phase Management</h1>
            <p className="text-indigo-100 mt-1">Manage cycle times across different time buckets</p>
          </div>
          
          <div className="p-6">
            {/* Bucket selection */}
            <div className="mb-8 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <label htmlFor="bucket" className="block text-sm font-medium text-indigo-700 mb-2">
                Select Time Bucket:
              </label>
              <div className="flex flex-wrap gap-3">
                {bucketOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setBucket(option.value)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      bucket === option.value
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-white text-indigo-700 border border-indigo-300 hover:bg-indigo-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
                <p className="text-indigo-500 font-medium">Loading time phase data...</p>
              </div>
            ) : error ? (
              <div className="p-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error Loading Data</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {rows.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No time phase data</h3>
                    <p className="mt-1 text-sm text-gray-500">No data available for the selected bucket type.</p>
                  </div>
                ) : (
                  /* Editable table */
                  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gradient-to-r from-indigo-600 to-blue-500">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Product ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Start Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            End Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Cycle Time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {rows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-indigo-50 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-indigo-600">{row.PRODUCT_ID}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="relative">
                                <input
                                  type="date"
                                  value={formatDate(row.START_DATE)}
                                  onChange={(e) => handleCellChange(idx, 'START_DATE', e.target.value)}
                                  className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 w-full"
                                  style={{ colorScheme: 'light' }}
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="relative">
                                <input
                                  type="date"
                                  value={formatDate(row.END_DATE)}
                                  onChange={(e) => handleCellChange(idx, 'END_DATE', e.target.value)}
                                  className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 w-full"
                                  style={{ colorScheme: 'light' }}
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="relative">
                                <input
                                  type="number"
                                  value={row.CYCLE_TIME}
                                  onChange={(e) => handleCellChange(idx, 'CYCLE_TIME', Number(e.target.value))}
                                  min="0"
                                  step="1"
                                  className="text-sm border border-gray-300 rounded-md px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                                  style={{ colorScheme: 'light' }}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={saving || rows.length === 0}
                    className={`px-6 py-2 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                      saving || rows.length === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {saving ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving Changes...
                      </span>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
