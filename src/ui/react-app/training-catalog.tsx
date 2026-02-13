import React, { useState } from 'react';
import { BookOpen, Award, Clock, Filter } from 'lucide-react';

export const TrainingCatalog: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const courses = [
    { id: 1, title: 'React Advanced Patterns', category: 'Engineering', duration: '8 hours', required: true, enrolled: false },
    { id: 2, title: 'Leadership Fundamentals', category: 'Management', duration: '12 hours', required: false, enrolled: true },
    { id: 3, title: 'Data Privacy & GDPR', category: 'Compliance', duration: '4 hours', required: true, enrolled: true },
    { id: 4, title: 'Effective Communication', category: 'Soft Skills', duration: '6 hours', required: false, enrolled: false },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <BookOpen className="mr-3 h-8 w-8" />
        Training Catalog
      </h1>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter((e.target as HTMLSelectElement).value)}
          >
            <option value="all">All Courses</option>
            <option value="required">Required</option>
            <option value="enrolled">My Courses</option>
            <option value="available">Available</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Award className="h-4 w-4 mr-1" />
                    {course.category}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </span>
                </div>
              </div>
              {course.required && (
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                  Required
                </span>
              )}
            </div>
            <button
              className={`w-full py-2 rounded-lg transition-colors ${
                course.enrolled
                  ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {course.enrolled ? 'Continue Course' : 'Enroll Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
