import React from 'react';
import { FileText, Download, Filter } from 'lucide-react';

export const CustomReport: React.FC = () => {
  const reportData = [
    { id: 1, firstName: 'John', lastName: 'Doe', department: 'Engineering', jobTitle: 'Senior Engineer', hireDate: '2020-01-15', status: 'Active' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', department: 'Product', jobTitle: 'Product Manager', hireDate: '2019-03-20', status: 'Active' },
    { id: 3, firstName: 'Mike', lastName: 'Johnson', department: 'Design', jobTitle: 'UX Designer', hireDate: '2021-06-10', status: 'Active' },
    { id: 4, firstName: 'Sarah', lastName: 'Williams', department: 'HR', jobTitle: 'HR Manager', hireDate: '2018-09-01', status: 'Active' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <FileText className="mr-3 h-8 w-8" />
          Custom Report
        </h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            <Filter className="h-5 w-5" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="h-5 w-5" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Report Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Name</label>
            <input
              type="text"
              value="Active Employees by Department"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
            <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Table View</option>
              <option>CSV</option>
              <option>PDF</option>
              <option>Excel</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter</label>
            <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Product</option>
              <option>Design</option>
              <option>HR</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Report Results</h2>
            <span className="text-sm text-gray-600">{reportData.length} records</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">First Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hire Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{row.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{row.firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{row.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.jobTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.hireDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Summary Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-gray-500 text-sm">Total Records</p>
            <p className="text-2xl font-bold">{reportData.length}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Unique Departments</p>
            <p className="text-2xl font-bold">4</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Active Status</p>
            <p className="text-2xl font-bold text-green-600">100%</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Avg Tenure</p>
            <p className="text-2xl font-bold">3.2 years</p>
          </div>
        </div>
      </div>
    </div>
  );
};
