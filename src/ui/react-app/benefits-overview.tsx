import React from 'react';
import { Heart, Shield, Eye, DollarSign } from 'lucide-react';

export const BenefitsOverview: React.FC = () => {
  const benefits = [
    { icon: Heart, name: 'Health Insurance', plan: 'PPO Gold', cost: '$450/mo', coverage: 'Family' },
    { icon: Shield, name: 'Dental Insurance', plan: 'Premium', cost: '$75/mo', coverage: 'Family' },
    { icon: Eye, name: 'Vision Insurance', plan: 'Standard', cost: '$25/mo', coverage: 'Individual' },
    { icon: DollarSign, name: '401(k)', plan: '5% Match', cost: '$0', coverage: 'Active' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Benefits Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {benefits.map((benefit) => (
          <div key={benefit.name} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <benefit.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-lg">{benefit.name}</h3>
                <p className="text-gray-600 text-sm">{benefit.plan}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Coverage:</span>
                <span className="font-medium">{benefit.coverage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cost:</span>
                <span className="font-medium">{benefit.cost}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Enrolled Dependents</h2>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Relationship</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">DOB</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Coverage</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="px-4 py-3">Jane Doe</td>
              <td className="px-4 py-3">Spouse</td>
              <td className="px-4 py-3">03/15/1988</td>
              <td className="px-4 py-3">Health, Dental, Vision</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Tim Doe</td>
              <td className="px-4 py-3">Child</td>
              <td className="px-4 py-3">08/22/2015</td>
              <td className="px-4 py-3">Health, Dental, Vision</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
