import React, { useState, useEffect } from 'react';
import { Users, Clock, Target, TrendingUp, TrendingDown, UserPlus } from 'lucide-react';

interface Stats {
  totalEmployees: number;
  activeEmployees: number;
  newHires: number;
  turnoverRate: number;
}

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-slate-800 rounded-lg shadow-lg p-6 ${className}`}>{children}</div>
);

const StatCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode; color: string }> = 
  ({ label, value, icon, color }) => (
  <Card>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-sm mb-1">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className={`${color} p-3 rounded-lg`}>
        {icon}
      </div>
    </div>
  </Card>
);

export default function App() {
  const [stats, setStats] = useState<Stats>({
    totalEmployees: 245,
    activeEmployees: 238,
    newHires: 12,
    turnoverRate: 2.8
  });

  const [timeOffRequests] = useState([
    { id: 1, name: 'Sarah Johnson', dates: 'Jan 15 - Jan 17', status: 'Pending' },
    { id: 2, name: 'Mike Chen', dates: 'Jan 18 - Jan 20', status: 'Approved' },
    { id: 3, name: 'Emily Davis', dates: 'Jan 22 - Jan 24', status: 'Pending' },
    { id: 4, name: 'James Wilson', dates: 'Jan 25 - Jan 27', status: 'Pending' }
  ]);

  const [activeGoals] = useState([
    { id: 1, title: 'Q1 Revenue Growth', progress: 75 },
    { id: 2, title: 'Customer Satisfaction', progress: 60 },
    { id: 3, title: 'Team Productivity', progress: 85 },
    { id: 4, title: 'Product Development', progress: 50 }
  ]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Employee Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            label="Total Employees" 
            value={stats.totalEmployees}
            icon={<Users className="h-8 w-8 text-white" />}
            color="bg-blue-600"
          />
          <StatCard 
            label="Active Employees" 
            value={stats.activeEmployees}
            icon={<TrendingUp className="h-8 w-8 text-white" />}
            color="bg-green-600"
          />
          <StatCard 
            label="New This Month" 
            value={stats.newHires}
            icon={<UserPlus className="h-8 w-8 text-white" />}
            color="bg-purple-600"
          />
          <StatCard 
            label="Turnover Rate" 
            value={`${stats.turnoverRate}%`}
            icon={<TrendingDown className="h-8 w-8 text-white" />}
            color="bg-orange-600"
          />
        </div>

        {/* Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Time Off Requests */}
          <Card>
            <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
              <Clock className="mr-2 h-5 w-5 text-blue-400" />
              Recent Time Off Requests
            </h2>
            <div className="space-y-3">
              {timeOffRequests.map((request) => (
                <div key={request.id} className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{request.name}</p>
                    <p className="text-sm text-slate-400">{request.dates}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    request.status === 'Approved' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-yellow-600 text-white'
                  }`}>
                    {request.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Active Goals */}
          <Card>
            <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
              <Target className="mr-2 h-5 w-5 text-purple-400" />
              Active Goals
            </h2>
            <div className="space-y-4">
              {activeGoals.map((goal) => (
                <div key={goal.id} className="p-3 bg-slate-700 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium text-white">{goal.title}</p>
                    <span className="text-sm text-slate-400">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
