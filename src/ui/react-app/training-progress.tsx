import React from 'react';
import { BookOpen, Award, Clock, CheckCircle } from 'lucide-react';

export const TrainingProgress: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <BookOpen className="mr-3 h-8 w-8" />
        Training Progress
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Enrolled</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <BookOpen className="h-10 w-10 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">In Progress</p>
              <p className="text-3xl font-bold">5</p>
            </div>
            <Clock className="h-10 w-10 text-orange-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-3xl font-bold">7</p>
            </div>
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Certifications</p>
              <p className="text-3xl font-bold">3</p>
            </div>
            <Award className="h-10 w-10 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Active Courses</h2>
        <div className="space-y-4">
          {[
            { title: 'React Advanced Patterns', progress: 65, dueDate: '2024-02-15', hours: 8 },
            { title: 'Leadership Fundamentals', progress: 40, dueDate: '2024-03-01', hours: 12 },
            { title: 'Data Privacy & GDPR', progress: 85, dueDate: '2024-01-31', hours: 4 },
          ].map((course, i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-sm text-gray-600">
                    {course.hours} hours • Due: {course.dueDate}
                  </p>
                </div>
                <span className="text-blue-600 font-bold">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Continue Course →
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
            Completed Courses
          </h2>
          <div className="space-y-3">
            {[
              { title: 'Effective Communication', completedDate: '2024-01-10', hours: 6 },
              { title: 'Time Management', completedDate: '2023-12-15', hours: 4 },
              { title: 'Conflict Resolution', completedDate: '2023-11-20', hours: 5 },
            ].map((course, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-green-50 rounded">
                <div>
                  <p className="font-medium">{course.title}</p>
                  <p className="text-sm text-gray-600">Completed: {course.completedDate}</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Award className="mr-2 h-5 w-5 text-purple-600" />
            Earned Certifications
          </h2>
          <div className="space-y-3">
            {[
              { title: 'AWS Certified Developer', issuedDate: '2023-10-15', expiryDate: '2026-10-15' },
              { title: 'Scrum Master Certified', issuedDate: '2023-06-01', expiryDate: '2025-06-01' },
              { title: 'Security+ Certified', issuedDate: '2023-03-10', expiryDate: '2026-03-10' },
            ].map((cert, i) => (
              <div key={i} className="p-3 bg-purple-50 rounded">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{cert.title}</p>
                    <p className="text-sm text-gray-600">Issued: {cert.issuedDate}</p>
                    <p className="text-sm text-gray-600">Expires: {cert.expiryDate}</p>
                  </div>
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
