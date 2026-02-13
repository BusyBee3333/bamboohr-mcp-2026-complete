import React, { useState } from 'react';
import { BookOpen, Users, Clock, Star } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  enrolled: number;
  completed: number;
  rating: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg p-6">{children}</div>
);

export default function App() {
  const [filterCategory, setFilterCategory] = useState('All');

  const courses: Course[] = [
    { id: '1', title: 'Leadership Essentials', category: 'Leadership', duration: '4 hours', enrolled: 45, completed: 32, rating: 4.8, difficulty: 'Intermediate' },
    { id: '2', title: 'Communication Skills', category: 'Soft Skills', duration: '3 hours', enrolled: 65, completed: 58, rating: 4.6, difficulty: 'Beginner' },
    { id: '3', title: 'Project Management', category: 'Management', duration: '6 hours', enrolled: 38, completed: 25, rating: 4.7, difficulty: 'Advanced' },
    { id: '4', title: 'Data Analytics Basics', category: 'Technical', duration: '5 hours', enrolled: 52, completed: 40, rating: 4.5, difficulty: 'Beginner' },
    { id: '5', title: 'Advanced Excel', category: 'Technical', duration: '4 hours', enrolled: 30, completed: 22, rating: 4.9, difficulty: 'Advanced' },
    { id: '6', title: 'Diversity & Inclusion', category: 'Compliance', duration: '2 hours', enrolled: 85, completed: 75, rating: 4.4, difficulty: 'Beginner' },
    { id: '7', title: 'Agile Methodology', category: 'Development', duration: '5 hours', enrolled: 42, completed: 30, rating: 4.7, difficulty: 'Intermediate' },
    { id: '8', title: 'Customer Service Excellence', category: 'Soft Skills', duration: '3 hours', enrolled: 55, completed: 48, rating: 4.6, difficulty: 'Beginner' },
  ];

  const categories = ['All', ...Array.from(new Set(courses.map(c => c.category)))];

  const filteredCourses = filterCategory === 'All' 
    ? courses 
    : courses.filter(c => c.category === filterCategory);

  const stats = {
    totalCourses: courses.length,
    totalEnrolled: courses.reduce((sum, c) => sum + c.enrolled, 0),
    totalCompleted: courses.reduce((sum, c) => sum + c.completed, 0),
    avgRating: (courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <BookOpen className="mr-3 h-10 w-10 text-blue-400" />
          Training Catalog
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Courses</p>
                <p className="text-3xl font-bold text-white">{stats.totalCourses}</p>
              </div>
              <BookOpen className="h-10 w-10 text-blue-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Enrolled</p>
                <p className="text-3xl font-bold text-white">{stats.totalEnrolled}</p>
              </div>
              <Users className="h-10 w-10 text-green-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Completed</p>
                <p className="text-3xl font-bold text-white">{stats.totalCompleted}</p>
              </div>
              <Clock className="h-10 w-10 text-purple-400" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Rating</p>
                <p className="text-3xl font-bold text-white">{stats.avgRating}</p>
              </div>
              <Star className="h-10 w-10 text-yellow-400" />
            </div>
          </Card>
        </div>

        {/* Filter */}
        <Card>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
            ))}
          </select>
          <span className="ml-4 text-slate-400 text-sm">
            Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
          </span>
        </Card>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredCourses.map((course) => {
            const completionRate = Math.round((course.completed / course.enrolled) * 100);
            return (
              <Card key={course.id}>
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white flex-1">{course.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ml-2 ${
                      course.difficulty === 'Beginner' ? 'bg-green-600 text-white' :
                      course.difficulty === 'Intermediate' ? 'bg-yellow-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {course.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{course.category}</p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </span>
                    <span className="text-slate-400 flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      {course.rating}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Enrolled</span>
                    <span className="text-white font-medium">{course.enrolled}</span>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Completion Rate</span>
                      <span className="text-white">{completionRate}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>
                </div>

                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
                  View Details
                </button>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
