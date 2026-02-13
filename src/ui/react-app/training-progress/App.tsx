import React, { useState } from 'react';
import { BookOpen, CheckCircle, Clock, Award, Search } from 'lucide-react';

interface EmployeeProgress {
  id: string;
  employee: string;
  department: string;
  coursesCompleted: number;
  coursesInProgress: number;
  totalCourses: number;
  hoursCompleted: number;
  lastActivity: string;
}

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg p-6">{children}</div>
);

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const progress: EmployeeProgress[] = [
    { id: '1', employee: 'Sarah Johnson', department: 'Engineering', coursesCompleted: 8, coursesInProgress: 2, totalCourses: 12, hoursCompleted: 32, lastActivity: '2 days ago' },
    { id: '2', employee: 'Mike Chen', department: 'Product', coursesCompleted: 5, coursesInProgress: 1, totalCourses: 8, hoursCompleted: 20, lastActivity: '1 week ago' },
    { id: '3', employee: 'Emily Davis', department: 'Design', coursesCompleted: 10, coursesInProgress: 0, totalCourses: 10, hoursCompleted: 38, lastActivity: '3 days ago' },
    { id: '4', employee: 'James Wilson', department: 'Engineering', coursesCompleted: 6, coursesInProgress: 3, totalCourses: 12, hoursCompleted: 24, lastActivity: 'Today' },
    { id: '5', employee: 'Lisa Anderson', department: 'Marketing', coursesCompleted: 7, coursesInProgress: 2, totalCourses: 10, hoursCompleted: 28, lastActivity: '4 days ago' },
  ];

  const filteredProgress = progress.filter(p =>
    p.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalEmployees: progress.length,
    avgCompletion: Math.round((progress.reduce((sum, p) => sum + (p.coursesCompleted / p.totalCourses), 0) / progress.length) * 100),
    totalHours: progress.reduce((sum, p) => sum + p.hoursCompleted, 0),
    activeEmployees: progress.filter(p => p.coursesInProgress > 0).length
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <BookOpen className="mr-3 h-10 w-10 text-blue-400" />
          Training Progress
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Employees</p>
                <p className="text-3xl font-bold text-white">{stats.totalEmployees}</p>
              </div>
              <Award className="h-10 w-10 text-blue-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Completion</p>
                <p className="text-3xl font-bold text-white">{stats.avgCompletion}%</p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Hours</p>
                <p className="text-3xl font-bold text-white">{stats.totalHours}</p>
              </div>
              <Clock className="h-10 w-10 text-purple-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Learners</p>
                <p className="text-3xl font-bold text-white">{stats.activeEmployees}</p>
              </div>
              <BookOpen className="h-10 w-10 text-orange-400" />
            </div>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by employee or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </Card>

        {/* Progress List */}
        <div className="mt-8 space-y-4">
          {filteredProgress.map((employee) => {
            const completionRate = Math.round((employee.coursesCompleted / employee.totalCourses) * 100);
            return (
              <Card key={employee.id}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-lg font-bold mr-4">
                      {employee.employee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{employee.employee}</h3>
                      <p className="text-sm text-slate-400">{employee.department}</p>
                      <p className="text-xs text-slate-500 mt-1">Last active: {employee.lastActivity}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 ml-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-400">{employee.coursesCompleted}</p>
                      <p className="text-xs text-slate-400">Completed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-400">{employee.coursesInProgress}</p>
                      <p className="text-xs text-slate-400">In Progress</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-400">{employee.hoursCompleted}h</p>
                      <p className="text-xs text-slate-400">Hours</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Overall Progress</span>
                    <span className="text-white font-medium">
                      {employee.coursesCompleted} / {employee.totalCourses} ({completionRate}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}

          {filteredProgress.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No employees found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
