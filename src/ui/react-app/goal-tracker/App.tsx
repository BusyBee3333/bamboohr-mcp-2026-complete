import React, { useState } from 'react';
import { Target, TrendingUp, Clock, CheckCircle } from 'lucide-react';

interface Goal {
  id: string;
  employee: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  status: 'On Track' | 'At Risk' | 'Completed';
  category: string;
}

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg p-6">{children}</div>
);

export default function App() {
  const goals: Goal[] = [
    { id: '1', employee: 'Sarah Johnson', title: 'Q1 Revenue Growth', description: 'Increase quarterly revenue by 15%', progress: 75, dueDate: '2025-03-31', status: 'On Track', category: 'Performance' },
    { id: '2', employee: 'Sarah Johnson', title: 'Team Leadership', description: 'Lead 2 major projects', progress: 50, dueDate: '2025-06-30', status: 'On Track', category: 'Leadership' },
    { id: '3', employee: 'Mike Chen', title: 'Product Launch', description: 'Launch new product feature', progress: 90, dueDate: '2025-02-15', status: 'On Track', category: 'Development' },
    { id: '4', employee: 'Mike Chen', title: 'Code Quality', description: 'Reduce bug count by 30%', progress: 30, dueDate: '2025-04-30', status: 'At Risk', category: 'Quality' },
    { id: '5', employee: 'Emily Davis', title: 'Design System', description: 'Complete design system overhaul', progress: 100, dueDate: '2025-01-15', status: 'Completed', category: 'Design' },
    { id: '6', employee: 'James Wilson', title: 'Infrastructure Upgrade', description: 'Migrate to new cloud infrastructure', progress: 65, dueDate: '2025-05-31', status: 'On Track', category: 'Infrastructure' },
  ];

  const stats = {
    total: goals.length,
    onTrack: goals.filter(g => g.status === 'On Track').length,
    atRisk: goals.filter(g => g.status === 'At Risk').length,
    completed: goals.filter(g => g.status === 'Completed').length
  };

  const groupedGoals = goals.reduce((acc, goal) => {
    if (!acc[goal.employee]) {
      acc[goal.employee] = [];
    }
    acc[goal.employee].push(goal);
    return acc;
  }, {} as Record<string, Goal[]>);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <Target className="mr-3 h-10 w-10 text-purple-400" />
          Goal Tracker
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Goals</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <Target className="h-10 w-10 text-blue-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">On Track</p>
                <p className="text-3xl font-bold text-white">{stats.onTrack}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-green-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">At Risk</p>
                <p className="text-3xl font-bold text-white">{stats.atRisk}</p>
              </div>
              <Clock className="h-10 w-10 text-orange-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Completed</p>
                <p className="text-3xl font-bold text-white">{stats.completed}</p>
              </div>
              <CheckCircle className="h-10 w-10 text-purple-400" />
            </div>
          </Card>
        </div>

        {/* Goals by Employee */}
        <div className="space-y-6">
          {Object.entries(groupedGoals).map(([employee, employeeGoals]) => (
            <Card key={employee}>
              <div className="flex items-center mb-6 pb-4 border-b border-slate-700">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-lg font-bold mr-4">
                  {employee.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{employee}</h3>
                  <p className="text-sm text-slate-400">{employeeGoals.length} goal{employeeGoals.length > 1 ? 's' : ''}</p>
                </div>
              </div>

              <div className="space-y-4">
                {employeeGoals.map((goal) => (
                  <div key={goal.id} className="p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-1">{goal.title}</h4>
                        <p className="text-sm text-slate-400 mb-2">{goal.description}</p>
                        <div className="flex items-center space-x-4 text-xs">
                          <span className="text-slate-400">
                            <Clock className="h-3 w-3 inline mr-1" />
                            Due: {goal.dueDate}
                          </span>
                          <span className="px-2 py-1 bg-slate-600 rounded text-slate-300">
                            {goal.category}
                          </span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-4 ${
                        goal.status === 'Completed' ? 'bg-purple-600 text-white' :
                        goal.status === 'On Track' ? 'bg-green-600 text-white' :
                        'bg-orange-600 text-white'
                      }`}>
                        {goal.status}
                      </span>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-white font-medium">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            goal.status === 'Completed' ? 'bg-purple-500' :
                            goal.status === 'On Track' ? 'bg-gradient-to-r from-green-500 to-blue-500' :
                            'bg-orange-500'
                          }`}
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
