import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Briefcase, DollarSign, MapPin, Award } from 'lucide-react';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  jobTitle: string;
  hireDate: string;
  location: string;
  salary: string;
  manager: string;
  status: string;
}

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-slate-800 rounded-lg shadow-lg p-6 ${className}`}>{children}</div>
);

const InfoRow: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3 p-3 bg-slate-700 rounded-lg">
    <div className="text-blue-400 mt-1">{icon}</div>
    <div className="flex-1">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </div>
  </div>
);

export default function App() {
  const [employee] = useState<Employee>({
    id: '12345',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    jobTitle: 'Senior Software Engineer',
    hireDate: 'January 15, 2020',
    location: 'San Francisco, CA',
    salary: '$125,000',
    manager: 'John Smith',
    status: 'Active'
  });

  const customFields = [
    { label: 'Employee Type', value: 'Full-time' },
    { label: 'Work Schedule', value: 'Monday - Friday, 9:00 AM - 5:00 PM' },
    { label: 'Emergency Contact', value: 'Michael Johnson - +1 (555) 987-6543' },
    { label: 'T-Shirt Size', value: 'Medium' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
              {employee.firstName[0]}{employee.lastName[0]}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                {employee.firstName} {employee.lastName}
              </h1>
              <p className="text-xl text-slate-400">{employee.jobTitle}</p>
            </div>
          </div>
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
            employee.status === 'Active' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}>
            {employee.status}
          </span>
        </div>

        {/* Main Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <h2 className="text-xl font-semibold mb-4 text-white">Contact Information</h2>
            <div className="space-y-3">
              <InfoRow icon={<Mail className="h-5 w-5" />} label="Email" value={employee.email} />
              <InfoRow icon={<Phone className="h-5 w-5" />} label="Phone" value={employee.phone} />
              <InfoRow icon={<MapPin className="h-5 w-5" />} label="Location" value={employee.location} />
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4 text-white">Job Information</h2>
            <div className="space-y-3">
              <InfoRow icon={<Briefcase className="h-5 w-5" />} label="Department" value={employee.department} />
              <InfoRow icon={<User className="h-5 w-5" />} label="Manager" value={employee.manager} />
              <InfoRow icon={<Calendar className="h-5 w-5" />} label="Hire Date" value={employee.hireDate} />
            </div>
          </Card>
        </div>

        {/* Compensation */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-green-400" />
            Compensation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-700 rounded-lg">
              <p className="text-sm text-slate-400 mb-1">Annual Salary</p>
              <p className="text-2xl font-bold text-white">{employee.salary}</p>
            </div>
            <div className="p-4 bg-slate-700 rounded-lg">
              <p className="text-sm text-slate-400 mb-1">Last Review</p>
              <p className="text-2xl font-bold text-white">Dec 2024</p>
            </div>
            <div className="p-4 bg-slate-700 rounded-lg">
              <p className="text-sm text-slate-400 mb-1">Next Review</p>
              <p className="text-2xl font-bold text-white">Jun 2025</p>
            </div>
          </div>
        </Card>

        {/* Custom Fields */}
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
            <Award className="mr-2 h-5 w-5 text-purple-400" />
            Additional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {customFields.map((field, idx) => (
              <div key={idx} className="p-3 bg-slate-700 rounded-lg">
                <p className="text-sm text-slate-400">{field.label}</p>
                <p className="text-white font-medium">{field.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
