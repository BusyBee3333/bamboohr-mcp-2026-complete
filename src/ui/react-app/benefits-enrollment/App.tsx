import React, { useState } from 'react';
import { Heart, CheckCircle, XCircle, Search } from 'lucide-react';

interface Enrollment {
  id: string;
  employee: string;
  plan: string;
  type: string;
  status: 'Enrolled' | 'Pending' | 'Declined';
  startDate: string;
  premium: string;
}

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg p-6">{children}</div>
);

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const enrollments: Enrollment[] = [
    { id: '1', employee: 'Sarah Johnson', plan: 'Health Insurance - PPO', type: 'Health', status: 'Enrolled', startDate: '2025-01-01', premium: '$450' },
    { id: '2', employee: 'Sarah Johnson', plan: 'Dental Insurance', type: 'Dental', status: 'Enrolled', startDate: '2025-01-01', premium: '$50' },
    { id: '3', employee: 'Sarah Johnson', plan: '401(k) Plan', type: 'Retirement', status: 'Enrolled', startDate: '2025-01-01', premium: 'Varies' },
    { id: '4', employee: 'Mike Chen', plan: 'Health Insurance - HMO', type: 'Health', status: 'Enrolled', startDate: '2025-01-01', premium: '$350' },
    { id: '5', employee: 'Mike Chen', plan: 'Vision Insurance', type: 'Vision', status: 'Pending', startDate: '2025-02-01', premium: '$25' },
    { id: '6', employee: 'Emily Davis', plan: 'Health Insurance - PPO', type: 'Health', status: 'Enrolled', startDate: '2025-01-01', premium: '$450' },
    { id: '7', employee: 'Emily Davis', plan: 'Dental Insurance', type: 'Dental', status: 'Declined', startDate: 'N/A', premium: 'N/A' },
    { id: '8', employee: 'James Wilson', plan: 'Life Insurance', type: 'Life', status: 'Enrolled', startDate: '2025-01-01', premium: '$15' },
  ];

  const filteredEnrollments = enrollments.filter(enrollment =>
    enrollment.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enrollment.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedEnrollments = filteredEnrollments.reduce((acc, enrollment) => {
    if (!acc[enrollment.employee]) {
      acc[enrollment.employee] = [];
    }
    acc[enrollment.employee].push(enrollment);
    return acc;
  }, {} as Record<string, Enrollment[]>);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <Heart className="mr-3 h-10 w-10 text-blue-400" />
          Benefits Enrollment
        </h1>

        {/* Search */}
        <Card>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by employee or plan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </Card>

        {/* Enrollments by Employee */}
        <div className="mt-8 space-y-6">
          {Object.entries(groupedEnrollments).map(([employee, enrollments]) => (
            <Card key={employee}>
              <div className="flex items-center mb-4 pb-4 border-b border-slate-700">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-lg font-bold mr-4">
                  {employee.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{employee}</h3>
                  <p className="text-sm text-slate-400">{enrollments.length} plan{enrollments.length > 1 ? 's' : ''}</p>
                </div>
              </div>

              <div className="space-y-3">
                {enrollments.map((enrollment) => (
                  <div key={enrollment.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {enrollment.status === 'Enrolled' && <CheckCircle className="h-5 w-5 text-green-400" />}
                        {enrollment.status === 'Pending' && <Clock className="h-5 w-5 text-yellow-400" />}
                        {enrollment.status === 'Declined' && <XCircle className="h-5 w-5 text-red-400" />}
                        <h4 className="font-semibold text-white">{enrollment.plan}</h4>
                      </div>
                      <div className="grid grid-cols-3 gap-4 ml-8 text-sm">
                        <div>
                          <p className="text-slate-400">Type</p>
                          <p className="text-white">{enrollment.type}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Start Date</p>
                          <p className="text-white">{enrollment.startDate}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Premium</p>
                          <p className="text-white">{enrollment.premium}</p>
                        </div>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ml-4 ${
                      enrollment.status === 'Enrolled' ? 'bg-green-600 text-white' :
                      enrollment.status === 'Pending' ? 'bg-yellow-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {enrollment.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}

          {Object.keys(groupedEnrollments).length === 0 && (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No enrollments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
