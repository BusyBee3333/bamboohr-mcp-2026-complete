import React, { useState } from 'react';
import { Folder, File, Upload, Download, Search } from 'lucide-react';

export const FileManager: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState('all');

  const folders = [
    { name: 'All Files', count: 24 },
    { name: 'Performance Reviews', count: 8 },
    { name: 'Tax Documents', count: 6 },
    { name: 'Certifications', count: 5 },
    { name: 'Contracts', count: 3 },
    { name: 'Personal', count: 2 },
  ];

  const files = [
    { name: '2023_W2_Form.pdf', category: 'Tax Documents', date: '2024-01-15', size: '245 KB' },
    { name: 'Q4_Performance_Review.pdf', category: 'Performance Reviews', date: '2024-01-10', size: '512 KB' },
    { name: 'Employment_Contract.pdf', category: 'Contracts', date: '2023-12-01', size: '1.2 MB' },
    { name: 'AWS_Certification.pdf', category: 'Certifications', date: '2023-11-15', size: '890 KB' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Folder className="mr-3 h-8 w-8" />
        File Manager
      </h1>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Upload className="h-5 w-5" />
            Upload
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-semibold mb-4">Categories</h2>
          <div className="space-y-2">
            {folders.map((folder) => (
              <button
                key={folder.name}
                className={`w-full flex items-center justify-between p-2 rounded hover:bg-gray-50 ${
                  selectedFolder === folder.name ? 'bg-blue-50 text-blue-600' : ''
                }`}
                onClick={() => setSelectedFolder(folder.name)}
              >
                <div className="flex items-center">
                  <Folder className="h-4 w-4 mr-2" />
                  <span className="text-sm">{folder.name}</span>
                </div>
                <span className="text-xs text-gray-500">{folder.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {files.map((file, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <File className="h-5 w-5 text-gray-400 mr-2" />
                      {file.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Download className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
