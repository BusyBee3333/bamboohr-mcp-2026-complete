import React from 'react';
import { UserPlus, Calendar, CheckCircle, Clock } from 'lucide-react';

export const NewHires: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <UserPlus className="mr-3 h-8 w-8" />
        New Hires
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">This Month</p>
              <p className="text-3xl font-bold">8</p>
            </div>
            <UserPlus className="h-10 w-10 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">This Quarter</p>
              <p className="text-3xl font-bold">24</p>
            </div>
            <Calendar className="h-10 w-10 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">This Year</p>
              <p className="text-3xl font-bold">45</p>
            </div>
            <CheckCircle className="h-10 w-10 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold">Recent New Hires</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[
              { name: 'Emily Chen', position: 'Senior Engineer', dept: 'Engineering', date: '2024-01-22', status: 'onboarding' },
              { name: 'Michael Brown', position: 'Sales Rep', dept: 'Sales', date: '2024-01-15', status: 'onboarding' },
              { name: 'Sarah Davis', position: 'Product Manager', dept: 'Product', date: '2024-01-08', status: 'active' },
              { name: 'James Wilson', position: 'Designer', dept: 'Design', date: '2024-01-03', status: 'active' },
              { name: 'Lisa Martinez', position: 'HR Coordinator', dept: 'HR', date: '2023-12-18', status: 'active' },
            ].map((hire, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{hire.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{hire.position}</td>
                <td className="px-6 py-4 whitespace-nowrap">{hire.dept}</td>
                <td className="px-6 py-4 whitespace-nowrap">{hire.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      hire.status === 'onboarding'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {hire.status === 'onboarding' ? 'Onboarding' : 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Onboarding Progress</h2>
        <div className="space-y-4">
          {[
            { name: 'Emily Chen', progress: 45 },
            { name: 'Michael Brown', progress: 80 },
          ].map((hire) => (
            <div key={hire.name}>
              <div className="flex justify-between mb-2">
                <span className="font-medium">{hire.name}</span>
                <span className="text-sm text-gray-600">{hire.progress}% complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{ width: `${hire.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
