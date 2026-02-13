import React, { useState } from 'react';
import { Clock, Check, X, Filter } from 'lucide-react';

export const TimeOffRequests: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const requests = [
    { id: 1, employee: 'John Doe', type: 'PTO', start: '2024-01-15', end: '2024-01-17', days: 3, status: 'pending' },
    { id: 2, employee: 'Jane Smith', type: 'Sick Leave', start: '2024-01-20', end: '2024-01-20', days: 1, status: 'approved' },
    { id: 3, employee: 'Mike Johnson', type: 'Personal', start: '2024-01-25', end: '2024-01-26', days: 2, status: 'pending' },
    { id: 4, employee: 'Sarah Williams', type: 'PTO', start: '2024-01-18', end: '2024-01-19', days: 2, status: 'denied' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'denied': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Clock className="mr-3 h-8 w-8" />
        Time Off Requests
      </h1>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter((e.target as HTMLSelectElement).value)}
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{request.employee}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.start}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.end}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.days}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.status === 'pending' && (
                    <div className="flex gap-2">
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Check className="h-5 w-5" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
