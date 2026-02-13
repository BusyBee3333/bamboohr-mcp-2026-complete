import React from 'react';
import { Network, Users } from 'lucide-react';

export const OrgChart: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Network className="mr-3 h-8 w-8" />
        Organization Chart
      </h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        {/* CEO Level */}
        <div className="flex justify-center mb-8">
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg text-center w-64">
            <div className="font-bold text-lg">Sarah Johnson</div>
            <div className="text-sm opacity-90">CEO</div>
          </div>
        </div>

        {/* Executive Level */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="relative">
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md text-center w-48">
              <div className="font-bold">Mike Chen</div>
              <div className="text-sm opacity-90">CTO</div>
            </div>
            <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-gray-300"></div>
          </div>
          <div className="relative">
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md text-center w-48">
              <div className="font-bold">Lisa Williams</div>
              <div className="text-sm opacity-90">CFO</div>
            </div>
            <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-gray-300"></div>
          </div>
          <div className="relative">
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md text-center w-48">
              <div className="font-bold">Tom Brown</div>
              <div className="text-sm opacity-90">VP Operations</div>
            </div>
            <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-gray-300"></div>
          </div>
        </div>

        {/* Department Level */}
        <div className="grid grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="bg-green-500 text-white p-3 rounded shadow text-center relative">
              <div className="font-semibold">Engineering</div>
              <div className="text-sm opacity-90">25 employees</div>
              <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-gray-300"></div>
            </div>
            <div className="bg-green-500 text-white p-3 rounded shadow text-center">
              <div className="font-semibold">Product</div>
              <div className="text-sm opacity-90">12 employees</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-orange-500 text-white p-3 rounded shadow text-center relative">
              <div className="font-semibold">Finance</div>
              <div className="text-sm opacity-90">8 employees</div>
              <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-gray-300"></div>
            </div>
            <div className="bg-orange-500 text-white p-3 rounded shadow text-center">
              <div className="font-semibold">Accounting</div>
              <div className="text-sm opacity-90">6 employees</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-teal-500 text-white p-3 rounded shadow text-center relative">
              <div className="font-semibold">HR</div>
              <div className="text-sm opacity-90">10 employees</div>
              <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-gray-300"></div>
            </div>
            <div className="bg-teal-500 text-white p-3 rounded shadow text-center">
              <div className="font-semibold">Sales</div>
              <div className="text-sm opacity-90">15 employees</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
