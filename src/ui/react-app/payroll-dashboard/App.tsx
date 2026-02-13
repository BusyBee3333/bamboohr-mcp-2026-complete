import React, { useState } from 'react';
import { DollarSign, TrendingUp, FileText, Calendar } from 'lucide-react';

interface PayStub {
  id: string;
  period: string;
  grossPay: number;
  netPay: number;
  deductions: number;
  date: string;
}

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg p-6">{children}</div>
);

export default function App() {
  const payStubs: PayStub[] = [
    { id: '1', period: 'Jan 1-15, 2025', grossPay: 5200, netPay: 3850, deductions: 1350, date: '2025-01-15' },
    { id: '2', period: 'Dec 16-31, 2024', grossPay: 5200, netPay: 3850, deductions: 1350, date: '2024-12-31' },
    { id: '3', period: 'Dec 1-15, 2024', grossPay: 5200, netPay: 3850, deductions: 1350, date: '2024-12-15' },
    { id: '4', period: 'Nov 16-30, 2024', grossPay: 5200, netPay: 3850, deductions: 1350, date: '2024-11-30' },
  ];

  const deductionsBreakdown = [
    { name: 'Federal Tax', amount: 780 },
    { name: 'State Tax', amount: 310 },
    { name: 'Social Security', amount: 120 },
    { name: 'Medicare', amount: 80 },
    { name: 'Health Insurance', amount: 450 },
    { name: '401(k)', amount: 260 },
  ];

  const ytdStats = {
    grossPay: 10400,
    netPay: 7700,
    totalDeductions: 2700,
    avgDeductions: 1350
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <DollarSign className="mr-3 h-10 w-10 text-green-400" />
          Payroll Dashboard
        </h1>

        {/* YTD Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">YTD Gross Pay</p>
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-white">${ytdStats.grossPay.toLocaleString()}</p>
          </Card>
          <Card>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">YTD Net Pay</p>
              <DollarSign className="h-6 w-6 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-white">${ytdStats.netPay.toLocaleString()}</p>
          </Card>
          <Card>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">Total Deductions</p>
              <FileText className="h-6 w-6 text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-white">${ytdStats.totalDeductions.toLocaleString()}</p>
          </Card>
          <Card>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">Avg Deductions</p>
              <Calendar className="h-6 w-6 text-orange-400" />
            </div>
            <p className="text-3xl font-bold text-white">${ytdStats.avgDeductions.toLocaleString()}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pay Stubs */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-white">Recent Pay Stubs</h2>
            <div className="space-y-4">
              {payStubs.map((stub) => (
                <Card key={stub.id}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{stub.period}</h3>
                      <p className="text-sm text-slate-400">Paid on {stub.date}</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                      Download
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-slate-700 rounded-lg">
                      <p className="text-xs text-slate-400 mb-1">Gross Pay</p>
                      <p className="text-xl font-bold text-white">${stub.grossPay.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-slate-700 rounded-lg">
                      <p className="text-xs text-slate-400 mb-1">Deductions</p>
                      <p className="text-xl font-bold text-red-400">-${stub.deductions.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-green-900/30 border border-green-600 rounded-lg">
                      <p className="text-xs text-green-400 mb-1">Net Pay</p>
                      <p className="text-xl font-bold text-green-400">${stub.netPay.toLocaleString()}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Deductions Breakdown */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Deductions Breakdown</h2>
            <Card>
              <div className="space-y-4">
                {deductionsBreakdown.map((deduction, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{deduction.name}</span>
                      <span className="text-white font-bold">${deduction.amount}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${(deduction.amount / 1350) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-xl font-bold text-white">
                      ${deductionsBreakdown.reduce((sum, d) => sum + d.amount, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tax Documents */}
            <Card className="mt-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Tax Documents</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                  <span className="text-white">W-2 Form 2024</span>
                  <FileText className="h-5 w-5 text-blue-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                  <span className="text-white">1099 Form 2024</span>
                  <FileText className="h-5 w-5 text-blue-400" />
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
