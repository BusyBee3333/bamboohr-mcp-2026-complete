import React from 'react';
import { Heart, Users, DollarSign, Shield } from 'lucide-react';

interface BenefitPlan {
  id: string;
  name: string;
  type: string;
  enrolled: number;
  total: number;
  cost: string;
  provider: string;
}

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg p-6">{children}</div>
);

export default function App() {
  const plans: BenefitPlan[] = [
    { id: '1', name: 'Health Insurance - PPO', type: 'Health', enrolled: 185, total: 245, cost: '$450/mo', provider: 'BlueCross' },
    { id: '2', name: 'Health Insurance - HMO', type: 'Health', enrolled: 45, total: 245, cost: '$350/mo', provider: 'BlueCross' },
    { id: '3', name: 'Dental Insurance', type: 'Dental', enrolled: 210, total: 245, cost: '$50/mo', provider: 'Delta Dental' },
    { id: '4', name: 'Vision Insurance', type: 'Vision', enrolled: 195, total: 245, cost: '$25/mo', provider: 'VSP' },
    { id: '5', name: '401(k) Plan', type: 'Retirement', enrolled: 220, total: 245, cost: 'Varies', provider: 'Fidelity' },
    { id: '6', name: 'Life Insurance', type: 'Life', enrolled: 245, total: 245, cost: '$15/mo', provider: 'MetLife' },
    { id: '7', name: 'Disability Insurance', type: 'Disability', enrolled: 230, total: 245, cost: '$30/mo', provider: 'Unum' },
    { id: '8', name: 'FSA', type: 'Flexible Spending', enrolled: 120, total: 245, cost: 'N/A', provider: 'WageWorks' },
  ];

  const stats = {
    totalEnrolled: plans.reduce((sum, plan) => sum + plan.enrolled, 0),
    avgEnrollment: Math.round((plans.reduce((sum, plan) => sum + (plan.enrolled / plan.total), 0) / plans.length) * 100),
    totalPlans: plans.length,
    employees: 245
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Health': return <Heart className="h-6 w-6" />;
      case 'Dental': return <Heart className="h-6 w-6" />;
      case 'Vision': return <Heart className="h-6 w-6" />;
      case 'Retirement': return <DollarSign className="h-6 w-6" />;
      case 'Life': return <Shield className="h-6 w-6" />;
      case 'Disability': return <Shield className="h-6 w-6" />;
      default: return <Shield className="h-6 w-6" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'Health': return 'from-blue-500 to-blue-600';
      case 'Dental': return 'from-green-500 to-green-600';
      case 'Vision': return 'from-purple-500 to-purple-600';
      case 'Retirement': return 'from-yellow-500 to-yellow-600';
      case 'Life': return 'from-red-500 to-red-600';
      case 'Disability': return 'from-indigo-500 to-indigo-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <Heart className="mr-3 h-10 w-10 text-blue-400" />
          Benefits Overview
        </h1>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Plans</p>
                <p className="text-3xl font-bold text-white">{stats.totalPlans}</p>
              </div>
              <Shield className="h-10 w-10 text-blue-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Employees</p>
                <p className="text-3xl font-bold text-white">{stats.employees}</p>
              </div>
              <Users className="h-10 w-10 text-green-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Enrollment</p>
                <p className="text-3xl font-bold text-white">{stats.avgEnrollment}%</p>
              </div>
              <DollarSign className="h-10 w-10 text-purple-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Enrollments</p>
                <p className="text-3xl font-bold text-white">{stats.totalEnrolled}</p>
              </div>
              <Heart className="h-10 w-10 text-red-400" />
            </div>
          </Card>
        </div>

        {/* Benefits Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const enrollmentPercentage = (plan.enrolled / plan.total) * 100;
            return (
              <Card key={plan.id}>
                <div className={`w-12 h-12 bg-gradient-to-br ${getColor(plan.type)} rounded-lg flex items-center justify-center text-white mb-4`}>
                  {getIcon(plan.type)}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{plan.provider}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Enrollment</span>
                    <span className="text-white font-medium">{plan.enrolled} / {plan.total}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${getColor(plan.type)} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${enrollmentPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-slate-700">
                    <span className="text-slate-400">Cost</span>
                    <span className="text-white font-medium">{plan.cost}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
