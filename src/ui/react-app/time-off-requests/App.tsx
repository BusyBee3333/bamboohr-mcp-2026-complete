import React, { useState } from 'react';
import { Check, X, Clock, Filter } from 'lucide-react';

interface TimeOffRequest {
  id: string;
  employee: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Denied';
  submittedDate: string;
}

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg p-6">{children}</div>
);

export default function App() {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  
  const [requests, setRequests] = useState<TimeOffRequest[]>([
    { id: '1', employee: 'Sarah Johnson', type: 'Vacation', startDate: '2025-01-15', endDate: '2025-01-17', days: 3, reason: 'Family vacation', status: 'Pending', submittedDate: '2025-01-05' },
    { id: '2', employee: 'Mike Chen', type: 'Sick Leave', startDate: '2025-01-08', endDate: '2025-01-08', days: 1, reason: 'Medical appointment', status: 'Approved', submittedDate: '2025-01-07' },
    { id: '3', employee: 'Emily Davis', type: 'Vacation', startDate: '2025-01-22', endDate: '2025-01-24', days: 3, reason: 'Personal time', status: 'Pending', submittedDate: '2025-01-10' },
    { id: '4', employee: 'James Wilson', type: 'Personal', startDate: '2025-01-10', endDate: '2025-01-10', days: 1, reason: 'Personal errands', status: 'Approved', submittedDate: '2025-01-08' },
    { id: '5', employee: 'Lisa Anderson', type: 'Vacation', startDate: '2025-02-01', endDate: '2025-02-05', days: 5, reason: 'Holiday trip', status: 'Pending', submittedDate: '2025-01-12' },
    { id: '6', employee: 'David Brown', type: 'Sick Leave', startDate: '2025-01-03', endDate: '2025-01-03', days: 1, reason: 'Illness', status: 'Denied', submittedDate: '2025-01-02' },
  ]);

  const handleApprove = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'Approved' as const } : req
    ));
  };

  const handleDeny = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'Denied' as const } : req
    ));
  };

  const filteredRequests = filterStatus === 'All' 
    ? requests 
    : requests.filter(req => req.status === filterStatus);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <Clock className="mr-3 h-10 w-10 text-blue-400" />
          Time Off Requests
        </h1>

        {/* Filter */}
        <Card>
          <div className="flex items-center space-x-4 mb-6">
            <Filter className="h-5 w-5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Requests</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Denied">Denied</option>
            </select>
            <span className="text-slate-400 text-sm">
              Showing {filteredRequests.length} of {requests.length} requests
            </span>
          </div>
        </Card>

        {/* Requests List */}
        <div className="mt-8 space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-lg font-bold">
                      {request.employee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{request.employee}</h3>
                      <p className="text-sm text-slate-400">{request.type}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-16">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Dates</p>
                      <p className="text-white">{request.startDate} to {request.endDate}</p>
                      <p className="text-sm text-slate-400">{request.days} day{request.days > 1 ? 's' : ''}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Reason</p>
                      <p className="text-white">{request.reason}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Submitted</p>
                      <p className="text-white">{request.submittedDate}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    request.status === 'Approved' ? 'bg-green-600 text-white' :
                    request.status === 'Pending' ? 'bg-yellow-600 text-white' :
                    'bg-red-600 text-white'
                  }`}>
                    {request.status}
                  </span>

                  {request.status === 'Pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                        title="Approve"
                      >
                        <Check className="h-5 w-5 text-white" />
                      </button>
                      <button
                        onClick={() => handleDeny(request.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        title="Deny"
                      >
                        <X className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <Clock className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No requests found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
