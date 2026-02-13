import React, { useState } from 'react';
import { Network, Users, ChevronDown, ChevronRight } from 'lucide-react';

interface OrgNode {
  id: string;
  name: string;
  title: string;
  department: string;
  reports: OrgNode[];
}

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg p-6">{children}</div>
);

const OrgCard: React.FC<{ node: OrgNode; depth: number }> = ({ node, depth }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="relative">
      <div className={`flex items-center space-x-2 mb-2 ${depth > 0 ? 'ml-8' : ''}`}>
        {node.reports.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-slate-700 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-slate-400" />
            )}
          </button>
        )}
        <div className="flex-1 p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
              {node.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h4 className="font-semibold text-white">{node.name}</h4>
              <p className="text-sm text-slate-400">{node.title}</p>
              {node.reports.length > 0 && (
                <p className="text-xs text-slate-500 mt-1">
                  {node.reports.length} direct report{node.reports.length > 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {isExpanded && node.reports.length > 0 && (
        <div className="mt-2">
          {node.reports.map((report) => (
            <OrgCard key={report.id} node={report} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const orgData: OrgNode = {
    id: '1',
    name: 'Jennifer Taylor',
    title: 'CEO',
    department: 'Executive',
    reports: [
      {
        id: '2',
        name: 'John Smith',
        title: 'CTO',
        department: 'Technology',
        reports: [
          {
            id: '5',
            name: 'Sarah Johnson',
            title: 'Engineering Manager',
            department: 'Engineering',
            reports: [
              { id: '8', name: 'Mike Chen', title: 'Senior Engineer', department: 'Engineering', reports: [] },
              { id: '9', name: 'James Wilson', title: 'DevOps Engineer', department: 'Engineering', reports: [] }
            ]
          },
          {
            id: '6',
            name: 'Emily Davis',
            title: 'Design Lead',
            department: 'Design',
            reports: [
              { id: '10', name: 'Alex Martinez', title: 'UX Designer', department: 'Design', reports: [] }
            ]
          }
        ]
      },
      {
        id: '3',
        name: 'Lisa Anderson',
        title: 'VP Marketing',
        department: 'Marketing',
        reports: [
          { id: '7', name: 'David Brown', title: 'Marketing Manager', department: 'Marketing', reports: [] },
          { id: '11', name: 'Rachel Green', title: 'Content Manager', department: 'Marketing', reports: [] }
        ]
      },
      {
        id: '4',
        name: 'Robert Martinez',
        title: 'CFO',
        department: 'Finance',
        reports: [
          { id: '12', name: 'Tom Harris', title: 'Controller', department: 'Finance', reports: [] }
        ]
      }
    ]
  };

  const countEmployees = (node: OrgNode): number => {
    return 1 + node.reports.reduce((sum, report) => sum + countEmployees(report), 0);
  };

  const countManagers = (node: OrgNode): number => {
    return (node.reports.length > 0 ? 1 : 0) + 
           node.reports.reduce((sum, report) => sum + countManagers(report), 0);
  };

  const stats = {
    totalEmployees: countEmployees(orgData),
    totalManagers: countManagers(orgData),
    departments: 5
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <Network className="mr-3 h-10 w-10 text-purple-400" />
          Organization Chart
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Employees</p>
                <p className="text-3xl font-bold text-white">{stats.totalEmployees}</p>
              </div>
              <Users className="h-10 w-10 text-blue-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Managers</p>
                <p className="text-3xl font-bold text-white">{stats.totalManagers}</p>
              </div>
              <Network className="h-10 w-10 text-green-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Departments</p>
                <p className="text-3xl font-bold text-white">{stats.departments}</p>
              </div>
              <Users className="h-10 w-10 text-purple-400" />
            </div>
          </Card>
        </div>

        {/* Organization Tree */}
        <Card>
          <div className="mb-4 pb-4 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white">Organizational Hierarchy</h2>
            <p className="text-sm text-slate-400 mt-1">Click the arrows to expand/collapse</p>
          </div>
          <OrgCard node={orgData} depth={0} />
        </Card>
      </div>
    </div>
  );
}
