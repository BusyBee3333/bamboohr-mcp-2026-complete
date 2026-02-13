import React from 'react';
import { PieChart, TrendingUp } from 'lucide-react';

export const TimeOffBalances: React.FC = () => {
  const balances = [
    { type: 'PTO', available: 15, used: 5, total: 20, color: 'blue' },
    { type: 'Sick Leave', available: 8, used: 2, total: 10, color: 'green' },
    { type: 'Personal', available: 3, used: 2, total: 5, color: 'purple' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <PieChart className="mr-3 h-8 w-8" />
        Time Off Balances
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {balances.map((balance) => (
          <div key={balance.type} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">{balance.type}</h3>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Used</span>
                <span className="font-medium">{balance.used} of {balance.total} days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`bg-${balance.color}-500 h-3 rounded-full`}
                  style={{ width: `${(balance.used / balance.total) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Available:</span>
                <span className="font-bold text-xl text-green-600">{balance.available}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Used:</span>
                <span>{balance.used}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total:</span>
                <span>{balance.total}</span>
              </div>
            </div>

            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Request Time Off
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Accrual Schedule
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">Next PTO Accrual</p>
              <p className="text-sm text-gray-500">February 1, 2024</p>
            </div>
            <span className="text-blue-600 font-bold">+1.67 days</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">Next Sick Leave Accrual</p>
              <p className="text-sm text-gray-500">February 1, 2024</p>
            </div>
            <span className="text-green-600 font-bold">+0.83 days</span>
          </div>
        </div>
      </div>
    </div>
  );
};
