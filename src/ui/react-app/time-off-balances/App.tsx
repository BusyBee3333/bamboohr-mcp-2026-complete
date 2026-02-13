import React, { useState } from 'react';
import { Calendar, TrendingUp, Search } from 'lucide-react';

interface EmployeeBalance {
  id: string;
  employee: string;
  department: string;
  vacation: { used: number; total: number };
  sick: { used: number; total: number };
  personal: { used: number; total: number };
}

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg p-6">{children}</div>
);

const ProgressBar: React.FC<{ used: number; total: number; color: string }> = ({ used, total, color }) => {
  const percentage = (used / total) * 100;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-400">{used} / {total} days</span>
        <span className="text-slate-400">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const balances: EmployeeBalance[] = [
    {
      id: '1',
      employee: 'Sarah Johnson',
      department: 'Engineering',
      vacation: { used: 8, total: 15 },
      sick: { used: 2, total: 10 },
      personal: { used: 1, total: 5 }
    },
    {
      id: '2',
      employee: 'Mike Chen',
      department: 'Product',
      vacation: { used: 12, total: 15 },
      sick: { used: 3, total: 10 },
      personal: { used: 2, total: 5 }
    },
    {
      id: '3',
      employee: 'Emily Davis',
      department: 'Design',
      vacation: { used: 5, total: 15 },
      sick: { used: 1, total: 10 },
      personal: { used: 0, total: 5 }
    },
    {
      id: '4',
      employee: 'James Wilson',
      department: 'Engineering',
      vacation: { used: 10, total: 15 },
      sick: { used: 4, total: 10 },
      personal: { used: 3, total: 5 }
    },
    {
      id: '5',
      employee: 'Lisa Anderson',
      department: 'Marketing',
      vacation: { used: 14, total: 15 },
      sick: { used: 5, total: 10 },
      personal: { used: 4, total: 5 }
    },
  ];

  const filteredBalances = balances.filter(balance =>
    balance.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    balance.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStats = balances.reduce((acc, balance) => ({
    vacation: acc.vacation + balance.vacation.used,
    sick: acc.sick + balance.sick.used,
    personal: acc.personal + balance.personal.used
  }), { vacation: 0, sick: 0, personal: 0 });

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <Calendar className="mr-3 h-10 w-10 text-blue-400" />
          Time Off Balances
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">Vacation Days Used</h3>
              <TrendingUp className="h-6 w-6 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-white">{totalStats.vacation}</p>
            <p className="text-sm text-slate-400 mt-1">Across all employees</p>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">Sick Days Used</h3>
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-white">{totalStats.sick}</p>
            <p className="text-sm text-slate-400 mt-1">Across all employees</p>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">Personal Days Used</h3>
              <TrendingUp className="h-6 w-6 text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-white">{totalStats.personal}</p>
            <p className="text-sm text-slate-400 mt-1">Across all employees</p>
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

        {/* Balances List */}
        <div className="mt-8 space-y-4">
          {filteredBalances.map((balance) => (
            <Card key={balance.id}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-lg font-bold mr-4">
                  {balance.employee.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{balance.employee}</h3>
                  <p className="text-sm text-slate-400">{balance.department}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-16">
                <div>
                  <p className="text-sm font-medium text-blue-400 mb-2">Vacation</p>
                  <ProgressBar 
                    used={balance.vacation.used} 
                    total={balance.vacation.total}
                    color="bg-blue-500"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-400 mb-2">Sick Leave</p>
                  <ProgressBar 
                    used={balance.sick.used} 
                    total={balance.sick.total}
                    color="bg-green-500"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-400 mb-2">Personal</p>
                  <ProgressBar 
                    used={balance.personal.used} 
                    total={balance.personal.total}
                    color="bg-purple-500"
                  />
                </div>
              </div>
            </Card>
          ))}

          {filteredBalances.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">No employees found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
