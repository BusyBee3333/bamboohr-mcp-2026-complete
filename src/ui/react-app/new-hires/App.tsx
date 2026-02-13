import React, { useState } from 'react';
import { UserPlus, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface NewHire {
  id: string;
  name: string;
  title: string;
  department: string;
  startDate: string;
  manager: string;
  onboardingProgress: number;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  daysUntilStart?: number;
}

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg p-6">{children}</div>
);

export default function App() {
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const newHires: NewHire[] = [
    { id: '1', name: 'Alex Martinez', title: 'Software Engineer', department: 'Engineering', startDate: '2025-01-20', manager: 'Sarah Johnson', onboardingProgress: 100, status: 'Completed', daysUntilStart: 0 },
    { id: '2', name: 'Rachel Green', title: 'Product Designer', department: 'Design', startDate: '2025-02-01', manager: 'Emily Davis', onboardingProgress: 65, status: 'In Progress', daysUntilStart: 12 },
    { id: '3', name: 'Tom Harris', title: 'Marketing Specialist', department: 'Marketing', startDate: '2025-02-05', manager: 'Lisa Anderson', onboardingProgress: 30, status: 'In Progress', daysUntilStart: 16 },
    { id: '4', name: 'Jessica Lee', title: 'Sales Representative', department: 'Sales', startDate: '2025-02-10', manager: 'David Brown', onboardingProgress: 0, status: 'Scheduled', daysUntilStart: 21 },
    { id: '5', name: 'Kevin Wu', title: 'Data Analyst', department: 'Engineering', startDate: '2025-02-15', manager: 'Mike Chen', onboardingProgress: 0, status: 'Scheduled', daysUntilStart: 26 },
    { id: '6', name: 'Maria Garcia', title: 'HR Coordinator', department: 'HR', startDate: '2025-01-15', manager: 'Jennifer Taylor', onboardingProgress: 100, status: 'Completed', daysUntilStart: 0 },
  ];

  const filteredHires = filterStatus === 'All' 
    ? newHires 
    : newHires.filter(h => h.status === filterStatus);

  const stats = {
    total: newHires.length,
    scheduled: newHires.filter(h => h.status === 'Scheduled').length,
    inProgress: newHires.filter(h => h.status === 'In Progress').length,
    completed: newHires.filter(h => h.status === 'Completed').length
  };

  const onboardingTasks = [
    'Complete HR paperwork',
    'Set up workstation',
    'IT account creation',
    'Benefits enrollment',
    'Team introductions',
    'First week training'
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <UserPlus className="mr-3 h-10 w-10 text-green-400" />
          New Hires
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total New Hires</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <UserPlus className="h-10 w-10 text-blue-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Scheduled</p>
                <p className="text-3xl font-bold text-white">{stats.scheduled}</p>
              </div>
              <Calendar className="h-10 w-10 text-purple-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">In Progress</p>
                <p className="text-3xl font-bold text-white">{stats.inProgress}</p>
              </div>
              <Clock className="h-10 w-10 text-yellow-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Completed</p>
                <p className="text-3xl font-bold text-white">{stats.completed}</p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* New Hires List */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Upcoming & Recent Hires</h2>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="space-y-4">
                {filteredHires.map((hire) => (
                  <div key={hire.id} className="p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-lg font-bold">
                          {hire.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{hire.name}</h3>
                          <p className="text-sm text-slate-400">{hire.title}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        hire.status === 'Completed' ? 'bg-green-600 text-white' :
                        hire.status === 'In Progress' ? 'bg-yellow-600 text-white' :
                        'bg-blue-600 text-white'
                      }`}>
                        {hire.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <p className="text-slate-400">Department</p>
                        <p className="text-white">{hire.department}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Manager</p>
                        <p className="text-white">{hire.manager}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Start Date</p>
                        <p className="text-white">{hire.startDate}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Days Until Start</p>
                        <p className="text-white">
                          {hire.daysUntilStart === 0 ? 'Started' : `${hire.daysUntilStart} days`}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Onboarding Progress</span>
                        <span className="text-white font-medium">{hire.onboardingProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            hire.onboardingProgress === 100 
                              ? 'bg-green-500' 
                              : 'bg-gradient-to-r from-blue-500 to-purple-500'
                          }`}
                          style={{ width: `${hire.onboardingProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Onboarding Checklist */}
          <div>
            <Card>
              <h2 className="text-xl font-semibold mb-6 text-white">Onboarding Checklist</h2>
              <div className="space-y-3">
                {onboardingTasks.map((task, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 bg-slate-700 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-white">{task}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="mt-6">
              <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-orange-400" />
                Quick Stats
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">This Month</span>
                  <span className="text-white font-bold">3 hires</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Next Month</span>
                  <span className="text-white font-bold">3 hires</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg Onboarding Time</span>
                  <span className="text-white font-bold">14 days</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
