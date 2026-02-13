import React, { useState } from 'react';
import { FileText, Plus, X } from 'lucide-react';

export const ReportBuilder: React.FC = () => {
  const [selectedFields, setSelectedFields] = useState<string[]>(['firstName', 'lastName', 'department']);

  const availableFields = [
    'firstName', 'lastName', 'email', 'department', 'jobTitle', 'hireDate',
    'supervisor', 'location', 'employeeNumber', 'status', 'salary', 'workPhone'
  ];

  const addField = (field: string) => {
    if (!selectedFields.includes(field)) {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const removeField = (field: string) => {
    setSelectedFields(selectedFields.filter(f => f !== field));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileText className="mr-3 h-8 w-8" />
        Report Builder
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Available Fields</h2>
          <div className="space-y-2">
            {availableFields.map((field) => (
              <button
                key={field}
                onClick={() => addField(field)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-blue-50 transition-colors"
                disabled={selectedFields.includes(field)}
              >
                <span className={selectedFields.includes(field) ? 'text-gray-400' : ''}>
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <Plus className={`h-5 w-5 ${selectedFields.includes(field) ? 'text-gray-400' : 'text-blue-600'}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Selected Fields ({selectedFields.length})</h2>
          {selectedFields.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No fields selected. Add fields from the left.</p>
          ) : (
            <div className="space-y-2 mb-6">
              {selectedFields.map((field, index) => (
                <div key={field} className="flex items-center justify-between p-3 bg-blue-50 rounded">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-3">{index + 1}.</span>
                    <span>{field.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                  <button
                    onClick={() => removeField(field)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Report Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="My Custom Report"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>CSV</option>
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>JSON</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter</label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Employees</option>
                  <option>Active Only</option>
                  <option>By Department</option>
                  <option>By Location</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Generate Report
            </button>
            <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">
              Save Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
