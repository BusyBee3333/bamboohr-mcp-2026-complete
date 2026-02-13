import React from 'react';
import { Target, CheckCircle, Clock } from 'lucide-react';

export const GoalTracker: React.FC = () => {
  const goals = [
    { id: 1, title: 'Complete React Training', progress: 75, dueDate: '2024-02-15', status: 'active' },
    { id: 2, title: 'Q1 Sales Target', progress: 60, dueDate: '2024-03-31', status: 'active' },
    { id: 3, title: 'Team Leadership Course', progress: 100, dueDate: '2024-01-10', status: 'completed' },
    { id: 4, title: 'Improve Customer Satisfaction', progress: 40, dueDate: '2024-04-30', status: 'active' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Target className="mr-3 h-8 w-8" />
        Goal Tracker
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Goals</p>
              <p className="text-3xl font-bold">8</p>
            </div>
            <Target className="h-12 w-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-3xl font-bold text-green-600">3</p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">In Progress</p>
              <p className="text-3xl font-bold text-blue-600">5</p>
            </div>
            <Clock className="h-12 w-12 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{goal.title}</h3>
                <p className="text-sm text-gray-500">Due: {goal.dueDate}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                goal.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {goal.status === 'completed' ? 'Completed' : 'In Progress'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className={`h-3 rounded-full ${
                  goal.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${goal.progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{goal.progress}% complete</span>
              {goal.status === 'active' && (
                <button className="text-blue-600 hover:text-blue-800">Update Progress</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
