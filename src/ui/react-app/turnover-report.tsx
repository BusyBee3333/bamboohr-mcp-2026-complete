import React from 'react';
import { TrendingDown, AlertCircle, Users, Percent } from 'lucide-react';

export const TurnoverReport: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <TrendingDown className="mr-3 h-8 w-8" />
        Turnover Report
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Annual Turnover</p>
              <p className="text-3xl font-bold">12.3%</p>
            </div>
            <Percent className="h-10 w-10 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Departures YTD</p>
              <p className="text-3xl font-bold">28</p>
            </div>
            <Users className="h-10 w-10 text-orange-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Avg Tenure</p>
              <p className="text-3xl font-bold">3.2yr</p>
            </div>
            <TrendingDown className="h-10 w-10 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">At Risk</p>
              <p className="text-3xl font-bold">15</p>
            </div>
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Turnover by Department</h2>
          <div className="space-y-4">
            {[
              { dept: 'Sales', rate: 18.5, departures: 12 },
              { dept: 'Engineering', rate: 10.2, departures: 9 },
              { dept: 'Customer Support', rate: 15.8, departures: 4 },
              { dept: 'HR', rate: 5.5, departures: 1 },
              { dept: 'Finance', rate: 8.3, departures: 2 },
            ].map((item) => (
              <div key={item.dept}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{item.dept}</span>
                  <span className="text-sm text-gray-600">
                    {item.rate}% ({item.departures} employees)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${item.rate * 5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Exit Reasons</h2>
          <div className="space-y-3">
            {[
              { reason: 'Better Opportunity', count: 11 },
              { reason: 'Relocation', count: 6 },
              { reason: 'Career Change', count: 5 },
              { reason: 'Compensation', count: 4 },
              { reason: 'Other', count: 2 },
            ].map((item) => (
              <div key={item.reason} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>{item.reason}</span>
                <span className="font-bold text-blue-600">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Departures</h2>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tenure</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Day</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[
              { name: 'Alice Johnson', dept: 'Sales', tenure: '2.5 years', lastDay: '2024-01-15', reason: 'Better Opportunity' },
              { name: 'Bob Smith', dept: 'Engineering', tenure: '1.8 years', lastDay: '2024-01-10', reason: 'Relocation' },
              { name: 'Carol White', dept: 'Customer Support', tenure: '3.2 years', lastDay: '2024-01-05', reason: 'Career Change' },
            ].map((emp, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{emp.name}</td>
                <td className="px-6 py-4 text-gray-600">{emp.dept}</td>
                <td className="px-6 py-4 text-gray-600">{emp.tenure}</td>
                <td className="px-6 py-4 text-gray-600">{emp.lastDay}</td>
                <td className="px-6 py-4 text-gray-600">{emp.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
