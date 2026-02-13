import React from 'react';
import { TrendingDown, AlertCircle, Users, Calendar } from 'lucide-react';

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg p-6">{children}</div>
);

export default function App() {
  const monthlyTurnover = [
    { month: 'Jul 2024', voluntary: 1, involuntary: 1, total: 2, rate: 0.9 },
    { month: 'Aug 2024', voluntary: 2, involuntary: 0, total: 2, rate: 0.9 },
    { month: 'Sep 2024', voluntary: 1, involuntary: 0, total: 1, rate: 0.4 },
    { month: 'Oct 2024', voluntary: 2, involuntary: 1, total: 3, rate: 1.3 },
    { month: 'Nov 2024', voluntary: 1, involuntary: 1, total: 2, rate: 0.8 },
    { month: 'Dec 2024', voluntary: 2, involuntary: 0, total: 2, rate: 0.8 },
    { month: 'Jan 2025', voluntary: 1, involuntary: 0, total: 1, rate: 0.4 }
  ];

  const departmentTurnover = [
    { dept: 'Engineering', terminations: 3, avgTenure: '2.5 years', rate: 3.5, risk: 'Low' },
    { dept: 'Sales', terminations: 5, avgTenure: '1.8 years', rate: 11.1, risk: 'High' },
    { dept: 'Marketing', terminations: 2, avgTenure: '2.2 years', rate: 7.1, risk: 'Medium' },
    { dept: 'Product', terminations: 1, avgTenure: '3.1 years', rate: 3.1, risk: 'Low' },
    { dept: 'Operations', terminations: 2, avgTenure: '1.5 years', rate: 20.0, risk: 'High' }
  ];

  const exitReasons = [
    { reason: 'Better Opportunity', count: 5, percentage: 38 },
    { reason: 'Compensation', count: 3, percentage: 23 },
    { reason: 'Relocation', count: 2, percentage: 15 },
    { reason: 'Career Growth', count: 2, percentage: 15 },
    { reason: 'Other', count: 1, percentage: 8 }
  ];

  const totalTerminations = monthlyTurnover.reduce((sum, m) => sum + m.total, 0);
  const avgTurnoverRate = (monthlyTurnover.reduce((sum, m) => sum + m.rate, 0) / monthlyTurnover.length).toFixed(1);
  const voluntaryTerminations = monthlyTurnover.reduce((sum, m) => sum + m.voluntary, 0);
  const involuntaryTerminations = monthlyTurnover.reduce((sum, m) => sum + m.involuntary, 0);

  const maxRate = Math.max(...monthlyTurnover.map(m => m.rate));

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <TrendingDown className="mr-3 h-10 w-10 text-red-400" />
          Turnover Report
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Terminations</p>
                <p className="text-3xl font-bold text-white">{totalTerminations}</p>
                <p className="text-xs text-slate-500 mt-1">Last 6 months</p>
              </div>
              <Users className="h-10 w-10 text-red-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Turnover Rate</p>
                <p className="text-3xl font-bold text-white">{avgTurnoverRate}%</p>
                <p className="text-xs text-slate-500 mt-1">Monthly average</p>
              </div>
              <TrendingDown className="h-10 w-10 text-orange-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Voluntary</p>
                <p className="text-3xl font-bold text-white">{voluntaryTerminations}</p>
                <p className="text-xs text-slate-500 mt-1">{((voluntaryTerminations/totalTerminations)*100).toFixed(0)}% of total</p>
              </div>
              <Calendar className="h-10 w-10 text-yellow-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Involuntary</p>
                <p className="text-3xl font-bold text-white">{involuntaryTerminations}</p>
                <p className="text-xs text-slate-500 mt-1">{((involuntaryTerminations/totalTerminations)*100).toFixed(0)}% of total</p>
              </div>
              <AlertCircle className="h-10 w-10 text-blue-400" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Trend */}
          <Card>
            <h2 className="text-xl font-semibold mb-6 text-white">Monthly Turnover Rate</h2>
            <div className="space-y-4">
              {monthlyTurnover.map((data, idx) => {
                const barHeight = (data.rate / maxRate) * 100;
                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400 w-24">{data.month}</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-slate-400">V:{data.voluntary} I:{data.involuntary}</span>
                        <span className="text-lg font-bold text-white">{data.rate}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-6">
                      <div
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-6 rounded-full transition-all duration-500"
                        style={{ width: `${barHeight}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* By Department */}
          <Card>
            <h2 className="text-xl font-semibold mb-6 text-white">Department Analysis</h2>
            <div className="space-y-4">
              {departmentTurnover.map((dept, idx) => (
                <div key={idx} className="p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">{dept.dept}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      dept.risk === 'High' ? 'bg-red-600 text-white' :
                      dept.risk === 'Medium' ? 'bg-yellow-600 text-white' :
                      'bg-green-600 text-white'
                    }`}>
                      {dept.risk} Risk
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">Terminations</p>
                      <p className="text-white font-bold">{dept.terminations}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Rate</p>
                      <p className="text-white font-bold">{dept.rate}%</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Avg Tenure</p>
                      <p className="text-white font-bold">{dept.avgTenure}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Exit Reasons */}
        <Card className="mt-8">
          <h2 className="text-xl font-semibold mb-6 text-white">Exit Reasons (Voluntary)</h2>
          <div className="space-y-4">
            {exitReasons.map((reason, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{reason.reason}</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-400">{reason.count} employee{reason.count > 1 ? 's' : ''}</span>
                    <span className="text-white font-bold">{reason.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${reason.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
