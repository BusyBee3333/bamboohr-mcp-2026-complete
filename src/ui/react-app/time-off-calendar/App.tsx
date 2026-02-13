import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface TimeOffRequest {
  id: string;
  employee: string;
  type: string;
  startDate: Date;
  endDate: Date;
  status: 'Approved' | 'Pending' | 'Denied';
}

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-800 rounded-lg shadow-lg p-6">{children}</div>
);

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // January 2025
  
  const timeOffRequests: TimeOffRequest[] = [
    { id: '1', employee: 'Sarah Johnson', type: 'Vacation', startDate: new Date(2025, 0, 15), endDate: new Date(2025, 0, 17), status: 'Approved' },
    { id: '2', employee: 'Mike Chen', type: 'Sick Leave', startDate: new Date(2025, 0, 8), endDate: new Date(2025, 0, 8), status: 'Approved' },
    { id: '3', employee: 'Emily Davis', type: 'Vacation', startDate: new Date(2025, 0, 22), endDate: new Date(2025, 0, 24), status: 'Pending' },
    { id: '4', employee: 'James Wilson', type: 'Personal', startDate: new Date(2025, 0, 10), endDate: new Date(2025, 0, 10), status: 'Approved' },
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getRequestsForDay = (day: number) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return timeOffRequests.filter(req => {
      return checkDate >= req.startDate && checkDate <= req.endDate;
    });
  };

  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 bg-slate-700/30 border border-slate-700"></div>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const requests = getRequestsForDay(day);
    days.push(
      <div key={day} className="h-24 bg-slate-700 border border-slate-600 p-2 overflow-hidden hover:bg-slate-600 transition-colors">
        <div className="font-semibold text-white mb-1">{day}</div>
        <div className="space-y-1">
          {requests.slice(0, 2).map((req, idx) => (
            <div
              key={idx}
              className={`text-xs px-1 py-0.5 rounded truncate ${
                req.status === 'Approved' ? 'bg-green-600 text-white' :
                req.status === 'Pending' ? 'bg-yellow-600 text-white' :
                'bg-red-600 text-white'
              }`}
              title={`${req.employee} - ${req.type}`}
            >
              {req.employee.split(' ')[0]}
            </div>
          ))}
          {requests.length > 2 && (
            <div className="text-xs text-slate-400">+{requests.length - 2} more</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
          <Calendar className="mr-3 h-10 w-10 text-blue-400" />
          Time Off Calendar
        </h1>

        <Card>
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <h2 className="text-2xl font-bold text-white">{monthName}</h2>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-0 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold text-slate-400 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-0">
            {days}
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-600 rounded"></div>
              <span className="text-slate-300">Approved</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-600 rounded"></div>
              <span className="text-slate-300">Pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-600 rounded"></div>
              <span className="text-slate-300">Denied</span>
            </div>
          </div>
        </Card>

        {/* Upcoming Requests */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Upcoming Requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {timeOffRequests.map(req => (
              <Card key={req.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{req.employee}</h3>
                    <p className="text-sm text-slate-400">{req.type}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {req.startDate.toLocaleDateString()} - {req.endDate.toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    req.status === 'Approved' ? 'bg-green-600 text-white' :
                    req.status === 'Pending' ? 'bg-yellow-600 text-white' :
                    'bg-red-600 text-white'
                  }`}>
                    {req.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
