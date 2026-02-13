import React from 'react';
import { Users, Clock, Target, Award, FileText, TrendingUp } from 'lucide-react';

export const EmployeeDashboard: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Employees</p>
              <p className="text-3xl font-bold">245</p>
            </div>
            <Users className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active</p>
              <p className="text-3xl font-bold">238</p>
            </div>
            <TrendingUp className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">New This Month</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <Award className="h-12 w-12 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Recent Time Off Requests
          </h2>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">Employee Name</p>
                  <p className="text-sm text-gray-500">Jan {15 + i} - Jan {17 + i}</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Active Goals
          </h2>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-3 bg-gray-50 rounded">
                <p className="font-medium mb-2">Q1 Performance Goal {i}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${25 * i}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">{25 * i}% complete</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
