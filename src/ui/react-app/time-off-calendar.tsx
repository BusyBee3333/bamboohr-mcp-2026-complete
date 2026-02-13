import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export const TimeOffCalendar: React.FC = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Calendar className="mr-3 h-8 w-8" />
        Time Off Calendar
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <button className="p-2 hover:bg-gray-100 rounded">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-semibold">January 2024</h2>
          <button className="p-2 hover:bg-gray-100 rounded">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <div key={day} className="text-center font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
          {dates.map((date) => (
            <div
              key={date}
              className={`border rounded p-2 h-24 ${
                date === 15 || date === 22 ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
              }`}
            >
              <div className="text-sm font-medium">{date}</div>
              {date === 15 && (
                <div className="mt-1 text-xs bg-blue-500 text-white rounded px-1 py-0.5">
                  John - PTO
                </div>
              )}
              {date === 22 && (
                <div className="mt-1 text-xs bg-green-500 text-white rounded px-1 py-0.5">
                  Sarah - Sick
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm">PTO</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm">Sick Leave</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
            <span className="text-sm">Personal</span>
          </div>
        </div>
      </div>
    </div>
  );
};
