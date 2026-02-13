import React, { useState } from 'react';
import { Search, Filter, Mail, Phone, MapPin } from 'lucide-react';

export const EmployeeDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('all');

  const employees = [
    { id: 1, name: 'John Doe', title: 'Software Engineer', dept: 'Engineering', email: 'john@company.com', phone: '555-0101', location: 'San Francisco' },
    { id: 2, name: 'Jane Smith', title: 'Product Manager', dept: 'Product', email: 'jane@company.com', phone: '555-0102', location: 'New York' },
    { id: 3, name: 'Mike Johnson', title: 'Designer', dept: 'Design', email: 'mike@company.com', phone: '555-0103', location: 'Austin' },
    { id: 4, name: 'Sarah Williams', title: 'HR Manager', dept: 'HR', email: 'sarah@company.com', phone: '555-0104', location: 'Chicago' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Employee Directory</h1>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterDept}
              onChange={(e) => setFilterDept((e.target as HTMLSelectElement).value)}
            >
              <option value="all">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Design">Design</option>
              <option value="HR">HR</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <div key={employee.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-lg">{employee.name}</h3>
                <p className="text-gray-600 text-sm">{employee.title}</p>
                <p className="text-gray-500 text-xs">{employee.dept}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {employee.email}
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {employee.phone}
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {employee.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
