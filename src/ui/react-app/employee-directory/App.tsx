import React, { useState, useMemo } from 'react';
import { Search, Filter, Mail, Phone } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  status: string;
}

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg p-6">{children}</div>
);

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const employees: Employee[] = [
    { id: '1', name: 'Sarah Johnson', title: 'Senior Software Engineer', department: 'Engineering', email: 'sarah.j@company.com', phone: '555-0101', location: 'San Francisco', status: 'Active' },
    { id: '2', name: 'Mike Chen', title: 'Product Manager', department: 'Product', email: 'mike.c@company.com', phone: '555-0102', location: 'New York', status: 'Active' },
    { id: '3', name: 'Emily Davis', title: 'UX Designer', department: 'Design', email: 'emily.d@company.com', phone: '555-0103', location: 'Austin', status: 'Active' },
    { id: '4', name: 'James Wilson', title: 'DevOps Engineer', department: 'Engineering', email: 'james.w@company.com', phone: '555-0104', location: 'Seattle', status: 'Active' },
    { id: '5', name: 'Lisa Anderson', title: 'Marketing Director', department: 'Marketing', email: 'lisa.a@company.com', phone: '555-0105', location: 'Boston', status: 'Active' },
    { id: '6', name: 'David Brown', title: 'Sales Manager', department: 'Sales', email: 'david.b@company.com', phone: '555-0106', location: 'Chicago', status: 'Active' },
    { id: '7', name: 'Jennifer Taylor', title: 'HR Manager', department: 'HR', email: 'jen.t@company.com', phone: '555-0107', location: 'Denver', status: 'Active' },
    { id: '8', name: 'Robert Martinez', title: 'Software Engineer', department: 'Engineering', email: 'rob.m@company.com', phone: '555-0108', location: 'San Francisco', status: 'Inactive' }
  ];

  const departments = ['All', ...Array.from(new Set(employees.map(e => e.department)))];

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = filterDept === 'All' || emp.department === filterDept;
      const matchesStatus = filterStatus === 'All' || emp.status === filterStatus;
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [searchTerm, filterDept, filterStatus, employees]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Employee Directory</h1>

        {/* Search and Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept} Department</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <p className="text-slate-400 text-sm">
            Showing {filteredEmployees.length} of {employees.length} employees
          </p>
        </Card>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id}>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate">{employee.name}</h3>
                  <p className="text-sm text-slate-400 truncate">{employee.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{employee.department}</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <a href={`mailto:${employee.email}`} className="text-blue-400 hover:underline truncate">
                    {employee.email}
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-green-400" />
                  <span className="text-slate-300">{employee.phone}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-400">{employee.location}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  employee.status === 'Active' ? 'bg-green-600 text-white' : 'bg-slate-600 text-slate-300'
                }`}>
                  {employee.status}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No employees found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
