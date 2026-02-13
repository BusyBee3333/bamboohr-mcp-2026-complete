import React, { useState } from 'react';
import { FileText, Folder, Download, Upload, Search, Calendar } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  category: string;
  employee: string;
  size?: string;
  uploadDate: string;
}

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg p-6">{children}</div>
);

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const files: FileItem[] = [
    { id: '1', name: 'Employee Handbook 2025', type: 'file', category: 'Policies', employee: 'HR Department', size: '2.5 MB', uploadDate: '2025-01-01' },
    { id: '2', name: 'Tax Documents', type: 'folder', category: 'Tax', employee: 'Sarah Johnson', uploadDate: '2025-01-15' },
    { id: '3', name: 'W-2 Form 2024', type: 'file', category: 'Tax', employee: 'Sarah Johnson', size: '156 KB', uploadDate: '2025-01-15' },
    { id: '4', name: 'Performance Review Q4', type: 'file', category: 'Reviews', employee: 'Mike Chen', size: '890 KB', uploadDate: '2024-12-20' },
    { id: '5', name: 'Benefits Enrollment', type: 'folder', category: 'Benefits', employee: 'Emily Davis', uploadDate: '2024-11-01' },
    { id: '6', name: 'Training Certificates', type: 'folder', category: 'Training', employee: 'James Wilson', uploadDate: '2024-12-10' },
    { id: '7', name: 'Employment Contract', type: 'file', category: 'Contracts', employee: 'Lisa Anderson', size: '1.2 MB', uploadDate: '2024-06-15' },
    { id: '8', name: 'Time Off Request Form', type: 'file', category: 'Forms', employee: 'David Brown', size: '450 KB', uploadDate: '2025-01-08' },
  ];

  const categories = ['All', ...Array.from(new Set(files.map(f => f.category)))];

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.employee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || file.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    totalFiles: files.filter(f => f.type === 'file').length,
    totalFolders: files.filter(f => f.type === 'folder').length,
    recentUploads: files.filter(f => new Date(f.uploadDate) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <FileText className="mr-3 h-10 w-10 text-blue-400" />
          File Manager
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Files</p>
                <p className="text-3xl font-bold text-white">{stats.totalFiles}</p>
              </div>
              <FileText className="h-10 w-10 text-blue-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Folders</p>
                <p className="text-3xl font-bold text-white">{stats.totalFolders}</p>
              </div>
              <Folder className="h-10 w-10 text-yellow-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Recent Uploads</p>
                <p className="text-3xl font-bold text-white">{stats.recentUploads}</p>
              </div>
              <Upload className="h-10 w-10 text-green-400" />
            </div>
          </Card>
        </div>

        {/* Toolbar */}
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
                ))}
              </select>
            </div>
            <button className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center space-x-2 transition-colors">
              <Upload className="h-5 w-5" />
              <span>Upload</span>
            </button>
          </div>
        </Card>

        {/* Files List */}
        <div className="mt-8 space-y-3">
          {filteredFiles.map((file) => (
            <Card key={file.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    file.type === 'folder' 
                      ? 'bg-yellow-600' 
                      : 'bg-blue-600'
                  }`}>
                    {file.type === 'folder' ? (
                      <Folder className="h-6 w-6 text-white" />
                    ) : (
                      <FileText className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{file.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-400 mt-1">
                      <span>{file.employee}</span>
                      <span>•</span>
                      <span className="px-2 py-0.5 bg-slate-700 rounded">{file.category}</span>
                      {file.size && (
                        <>
                          <span>•</span>
                          <span>{file.size}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-slate-400 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {file.uploadDate}
                    </p>
                  </div>
                  {file.type === 'file' && (
                    <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                      <Download className="h-5 w-5 text-white" />
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {filteredFiles.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No files found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
