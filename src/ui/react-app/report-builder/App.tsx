import React, { useState } from 'react';
import { FileText, Plus, Trash2, Download } from 'lucide-react';

interface ReportField {
  id: string;
  name: string;
  type: string;
}

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg p-6">{children}</div>
);

export default function App() {
  const [reportName, setReportName] = useState('Custom Employee Report');
  const [selectedFields, setSelectedFields] = useState<ReportField[]>([
    { id: '1', name: 'Employee Name', type: 'text' },
    { id: '2', name: 'Department', type: 'text' },
    { id: '3', name: 'Hire Date', type: 'date' }
  ]);

  const availableFields: ReportField[] = [
    { id: '4', name: 'Job Title', type: 'text' },
    { id: '5', name: 'Email', type: 'text' },
    { id: '6', name: 'Phone', type: 'text' },
    { id: '7', name: 'Location', type: 'text' },
    { id: '8', name: 'Manager', type: 'text' },
    { id: '9', name: 'Salary', type: 'currency' },
    { id: '10', name: 'Status', type: 'select' },
    { id: '11', name: 'Birth Date', type: 'date' },
    { id: '12', name: 'Address', type: 'text' },
    { id: '13', name: 'Employee ID', type: 'number' }
  ].filter(field => !selectedFields.find(sf => sf.id === field.id));

  const addField = (field: ReportField) => {
    setSelectedFields([...selectedFields, field]);
  };

  const removeField = (fieldId: string) => {
    setSelectedFields(selectedFields.filter(f => f.id !== fieldId));
  };

  const handleGenerateReport = () => {
    alert('Report generated! In a real app, this would export the data.');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <FileText className="mr-3 h-10 w-10 text-blue-400" />
          Report Builder
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-xl font-semibold mb-4 text-white">Report Configuration</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Report Name
                  </label>
                  <input
                    type="text"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Report Type
                  </label>
                  <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Employee List</option>
                    <option>Time Off Summary</option>
                    <option>Compensation Report</option>
                    <option>Headcount Report</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Export Format
                  </label>
                  <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>CSV</option>
                    <option>Excel (XLSX)</option>
                    <option>PDF</option>
                  </select>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold mb-4 text-white">Available Fields</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {availableFields.map((field) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <div>
                      <p className="text-white font-medium">{field.name}</p>
                      <p className="text-xs text-slate-400">{field.type}</p>
                    </div>
                    <button
                      onClick={() => addField(field)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-xl font-semibold mb-4 text-white">Selected Fields</h2>
              <div className="space-y-2 min-h-[200px]">
                {selectedFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-slate-400 font-mono text-sm">{index + 1}</span>
                      <div>
                        <p className="text-white font-medium">{field.name}</p>
                        <p className="text-xs text-slate-400">{field.type}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeField(field.id)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ))}
                {selectedFields.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    No fields selected. Add fields from the left panel.
                  </div>
                )}
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold mb-4 text-white">Report Preview</h2>
              <div className="bg-slate-700 rounded-lg p-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-600">
                      {selectedFields.map((field) => (
                        <th key={field.id} className="text-left py-2 px-3 text-slate-300 font-medium">
                          {field.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-600">
                      {selectedFields.map((field) => (
                        <td key={field.id} className="py-2 px-3 text-slate-400">
                          Sample data
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {selectedFields.map((field) => (
                        <td key={field.id} className="py-2 px-3 text-slate-400">
                          Sample data
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <button
              onClick={handleGenerateReport}
              disabled={selectedFields.length === 0}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold text-white flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Download className="h-5 w-5" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
