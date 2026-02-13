import React from 'react';
import { Users, TrendingUp, Building, Calendar } from 'lucide-react';

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg p-6">{children}</div>
);

export default function App() {
  const monthlyData = [
    { month: 'Jul 2024', headcount: 220, hires: 5, terminations: 2 },
    { month: 'Aug 2024', headcount: 225, hires: 7, terminations: 2 },
    { month: 'Sep 2024', headcount: 230, hires: 6, terminations: 1 },
    { month: 'Oct 2024', headcount: 235, hires: 8, terminations: 3 },
    { month: 'Nov 2024', headcount: 238, hires: 5, terminations: 2 },
    { month: 'Dec 2024', headcount: 242, hires: 6, terminations: 2 },
    { month: 'Jan 2025', headcount: 245, hires: 4, terminations: 1 }
  ];

  const departmentBreakdown = [
    { dept: 'Engineering', count: 85, change: '+5' },
    { dept: 'Product', count: 32, change: '+2' },
    { dept: 'Design', count: 18, change: '+1' },
    { dept: 'Marketing', count: 28, change: '+3' },
    { dept: 'Sales', count: 45, change: '+4' },
    { dept: 'HR', count: 12, change: '0' },
    { dept: 'Finance', count: 15, change: '+1' },
    { dept: 'Operations', count: 10, change: '0' }
  ];

  const currentHeadcount = monthlyData[monthlyData.length - 1].headcount;
  const previousHeadcount = monthlyData[0].headcount;
  const growthRate = ((currentHeadcount - previousHeadcount) / previousHeadcount * 100).toFixed(1);

  const maxHeadcount = Math.max(...monthlyData.map(d => d.headcount));

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <Users className="mr-3 h-10 w-10 text-blue-400" />
          Headcount Analytics
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Current Headcount</p>
                <p className="text-3xl font-bold text-white">{currentHeadcount}</p>
              </div>
              <Users className="h-10 w-10 text-blue-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">6-Month Growth</p>
                <p className="text-3xl font-bold text-green-400">+{growthRate}%</p>
              </div>
              <TrendingUp className="h-10 w-10 text-green-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Departments</p>
                <p className="text-3xl font-bold text-white">{departmentBreakdown.length}</p>
              </div>
              <Building className="h-10 w-10 text-purple-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Net Change</p>
                <p className="text-3xl font-bold text-white">+{currentHeadcount - previousHeadcount}</p>
              </div>
              <Calendar className="h-10 w-10 text-orange-400" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trend Chart */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-semibold mb-6 text-white">Headcount Trend</h2>
              <div className="space-y-4">
                {monthlyData.map((data, idx) => {
                  const barWidth = (data.headcount / maxHeadcount) * 100;
                  return (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400 w-24">{data.month}</span>
                        <span className="text-lg font-bold text-white">{data.headcount}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-8 relative overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-8 rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                          style={{ width: `${barWidth}%` }}
                        >
                          <div className="flex items-center space-x-2 text-xs font-medium text-white">
                            <span className="bg-green-600 px-2 py-0.5 rounded">+{data.hires}</span>
                            <span className="bg-red-600 px-2 py-0.5 rounded">-{data.terminations}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-600 rounded"></div>
                  <span className="text-slate-300">New Hires</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-600 rounded"></div>
                  <span className="text-slate-300">Terminations</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Department Breakdown */}
          <div>
            <Card>
              <h2 className="text-xl font-semibold mb-6 text-white">By Department</h2>
              <div className="space-y-4">
                {departmentBreakdown.map((dept, idx) => {
                  const percentage = (dept.count / currentHeadcount) * 100;
                  return (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{dept.dept}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-bold">{dept.count}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            dept.change.startsWith('+') 
                              ? 'bg-green-600 text-white' 
                              : 'bg-slate-600 text-slate-300'
                          }`}>
                            {dept.change}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{percentage.toFixed(1)}% of total</p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
