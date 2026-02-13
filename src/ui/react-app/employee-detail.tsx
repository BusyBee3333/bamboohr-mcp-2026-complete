import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';

export const EmployeeDetail: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <div className="flex items-start gap-6">
          <div className="h-32 w-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold">
            JD
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">John Doe</h1>
            <p className="text-xl text-gray-600 mb-4">Senior Software Engineer</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2" />
                john.doe@company.com
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-2" />
                (555) 123-4567
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                San Francisco, CA
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                Hired: Jan 15, 2020
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Edit
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              Actions
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Briefcase className="mr-2 h-5 w-5" />
              Employment Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">Engineering</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Division</p>
                <p className="font-medium">Product Development</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Manager</p>
                <p className="font-medium">Sarah Johnson</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Employee ID</p>
                <p className="font-medium">EMP-12345</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium text-green-600">Active</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Employment Type</p>
                <p className="font-medium">Full Time</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Performance Goals</h2>
            <div className="space-y-4">
              {[
                { title: 'Complete React Training', progress: 75 },
                { title: 'Lead Q1 Project', progress: 60 },
                { title: 'Mentor Junior Developers', progress: 90 },
              ].map((goal, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{goal.title}</span>
                    <span className="text-sm text-gray-600">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Time Off Balances</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">PTO</span>
                <span className="font-bold text-blue-600">15 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sick Leave</span>
                <span className="font-bold text-green-600">8 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Personal</span>
                <span className="font-bold text-purple-600">3 days</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Documents</h2>
            <div className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                Employment Contract.pdf
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                W2 Form 2023.pdf
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                Performance Review Q4.pdf
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full text-left p-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
                Request Time Off
              </button>
              <button className="w-full text-left p-2 bg-green-50 text-green-700 rounded hover:bg-green-100">
                View Pay Stubs
              </button>
              <button className="w-full text-left p-2 bg-purple-50 text-purple-700 rounded hover:bg-purple-100">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
