// BambooHR Types

export interface BambooHRConfig {
  companyDomain: string;
  apiKey: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  preferredName?: string;
  jobTitle?: string;
  workEmail?: string;
  workPhone?: string;
  mobilePhone?: string;
  department?: string;
  division?: string;
  location?: string;
  hireDate?: string;
  employeeNumber?: string;
  status?: string;
  supervisor?: string;
  supervisorId?: string;
  gender?: string;
  dateOfBirth?: string;
  maritalStatus?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  photoUrl?: string;
  [key: string]: any;
}

export interface EmployeeDirectory {
  fields: Array<{
    id: string;
    type: string;
    name: string;
  }>;
  employees: Employee[];
}

export interface CustomField {
  id: string;
  name: string;
  type: string;
  alias?: string;
  options?: string[];
}

export interface TimeOffRequest {
  id: string;
  employeeId: string;
  name?: string;
  status: string;
  start: string;
  end: string;
  created: string;
  type: {
    id: string;
    name: string;
  };
  amount: {
    unit: string;
    amount: number;
  };
  notes?: {
    employee?: string;
    manager?: string;
  };
  dates?: Array<{
    date: string;
    amount: number;
  }>;
}

export interface TimeOffPolicy {
  id: string;
  timeOffTypeId: string;
  name: string;
  accrualRate?: number;
  accrualPeriod?: string;
  accrualMethod?: string;
  carryoverAmount?: number;
}

export interface TimeOffBalance {
  employeeId: string;
  timeOffTypeId: string;
  name: string;
  balance: number;
  end?: string;
  used?: number;
  scheduled?: number;
  accrued?: number;
  policyType?: string;
}

export interface TimeOffType {
  id: string;
  name: string;
  units: string;
  color?: string;
}

export interface Report {
  id: string;
  name: string;
  type: string;
}

export interface CustomReport {
  title: string;
  fields: string[];
  filters?: {
    [key: string]: any;
  };
}

export interface Table {
  alias: string;
  name: string;
  fields?: Array<{
    id: string;
    name: string;
    type: string;
  }>;
}

export interface TableRow {
  id: string;
  employeeId: string;
  [key: string]: any;
}

export interface BenefitPlan {
  id: string;
  name: string;
  planType?: string;
  carrier?: string;
  active?: boolean;
}

export interface BenefitEnrollment {
  id: string;
  employeeId: string;
  planId: string;
  startDate: string;
  endDate?: string;
  coverage?: string;
}

export interface BenefitDependent {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  relationship: string;
  dateOfBirth?: string;
}

export interface PayStub {
  id: string;
  employeeId: string;
  payDate: string;
  checkNumber?: string;
  grossPay?: number;
  netPay?: number;
  [key: string]: any;
}

export interface PayrollDeduction {
  id: string;
  name: string;
  amount?: number;
  percentage?: number;
  type?: string;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  percentComplete?: number;
  alignsWithOptionId?: string;
  sharedWithEmployeeIds?: string[];
  dueDate?: string;
  completionDate?: string;
  status?: string;
}

export interface GoalComment {
  id: string;
  goalId: string;
  employeeId: string;
  text: string;
  created: string;
}

export interface TrainingCourse {
  id: string;
  name: string;
  description?: string;
  categoryId?: string;
  typeId?: string;
  required?: boolean;
  dueDate?: string;
}

export interface TrainingCategory {
  id: string;
  name: string;
}

export interface TrainingType {
  id: string;
  name: string;
}

export interface File {
  id: string;
  name: string;
  originalFileName: string;
  size?: number;
  dateCreated?: string;
  createdBy?: string;
  categoryId?: string;
  shareWithEmployee?: boolean;
}

export interface FileCategory {
  id: string;
  name: string;
}

export interface Webhook {
  id: string;
  name: string;
  url: string;
  format?: string;
  frequency?: string;
  limit?: number;
  postFields?: string[];
}

export interface BambooHRError {
  message: string;
  status?: number;
  errors?: any[];
}
