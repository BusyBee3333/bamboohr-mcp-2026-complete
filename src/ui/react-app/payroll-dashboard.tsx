import React from 'react';
import { DollarSign, TrendingUp, Calendar, FileText } from 'lucide-react';

export const PayrollDashboard: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <DollarSign className="mr-3 h-8 w-8" />
        Payroll Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Current Period</p>
              <p className="text-2xl font-bold">$245,000</p>
            </div>
            <DollarSign className="h-10 w-10 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">YTD Payroll</p>
              <p className="text-2xl font-bold">$2.4M</p>
            </div>
            <TrendingUp className="h-10 w-10 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Next Payroll</p>
              <p className="text-2xl font-bold">Jan 31</p>
            </div>
            <Calendar className="h-10 w-10 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Employees</p>
              <p className="text-2xl font-bold">245</p>
            </div>
            <FileText className="h-10 w-10 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Pay Stubs</h2>
          <div className="space-y-3">
            {['January 15, 2024', 'January 1, 2024', 'December 15, 2023'].map((date, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{date}</p>
                  <p className="text-sm text-gray-500">Gross: $4,200 | Net: $3,150</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Deductions</h2>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>Federal Tax</span>
              <span className="font-medium">$650</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>State Tax</span>
              <span className="font-medium">$280</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>Social Security</span>
              <span className="font-medium">$260</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>Medicare</span>
              <span className="font-medium">$61</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>401(k)</span>
              <span className="font-medium">$210</span>
            </div>
            <div className="flex justify-between p-3 bg-blue-50 rounded font-semibold">
              <span>Total Deductions</span>
              <span>$1,461</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
