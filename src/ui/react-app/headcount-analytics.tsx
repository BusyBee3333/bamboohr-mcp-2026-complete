import React from 'react';
import { Users, TrendingUp, Building, MapPin } from 'lucide-react';

export const HeadcountAnalytics: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Users className="mr-3 h-8 w-8" />
        Headcount Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm mb-1">Total Employees</p>
          <p className="text-3xl font-bold">245</p>
          <p className="text-green-600 text-sm mt-2">+12 this quarter</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm mb-1">Full Time</p>
          <p className="text-3xl font-bold">220</p>
          <p className="text-gray-500 text-sm mt-2">89.8% of total</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm mb-1">Part Time</p>
          <p className="text-3xl font-bold">18</p>
          <p className="text-gray-500 text-sm mt-2">7.3% of total</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm mb-1">Contractors</p>
          <p className="text-3xl font-bold">7</p>
          <p className="text-gray-500 text-sm mt-2">2.9% of total</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Building className="mr-2 h-5 w-5" />
            By Department
          </h2>
          <div className="space-y-3">
            {[
              { dept: 'Engineering', count: 85, color: 'blue' },
              { dept: 'Sales', count: 52, color: 'green' },
              { dept: 'Product', count: 28, color: 'purple' },
              { dept: 'HR', count: 18, color: 'orange' },
              { dept: 'Finance', count: 24, color: 'red' },
              { dept: 'Operations', count: 38, color: 'teal' },
            ].map((item) => (
              <div key={item.dept}>
                <div className="flex justify-between mb-1">
                  <span>{item.dept}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`bg-${item.color}-500 h-2 rounded-full`}
                    style={{ width: `${(item.count / 245) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            By Location
          </h2>
          <div className="space-y-4">
            {[
              { location: 'San Francisco, CA', count: 98 },
              { location: 'New York, NY', count: 67 },
              { location: 'Austin, TX', count: 42 },
              { location: 'Chicago, IL', count: 28 },
              { location: 'Remote', count: 10 },
            ].map((item) => (
              <div key={item.location} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>{item.location}</span>
                <span className="font-bold text-blue-600">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Growth Trend
        </h2>
        <div className="h-64 flex items-end justify-between gap-2">
          {[180, 195, 208, 220, 228, 235, 240, 242, 243, 244, 244, 245].map((count, i) => (
            <div key={i} className="flex-1 bg-blue-500 rounded-t" style={{ height: `${(count / 245) * 100}%` }}>
              <div className="text-center text-xs text-white mt-1">{count}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
      </div>
    </div>
  );
};
