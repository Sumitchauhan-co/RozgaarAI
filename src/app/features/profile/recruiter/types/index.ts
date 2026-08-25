export interface UserSession {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface RecruiterApplicationItem {
  id: string;
  recruiterId: string;
  jobTitle: string;
  description: string | null;
  companyName: string;
  skills: string[];
  experienceRequired: number | null;
  employmentType: string | null;
  industry: string | null;
  locality: string | null;
  city: string;
  country: string;
  salary: number | null;
  currency: string;
  payPeriod: "hourly" | "monthly" | "yearly";
  phone: string | null;
  status: "pending" | "rejected" | "accepted";
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Recruiter {
  id: string;
  userId: string;
  companyName: string;
  companyDescription?: string | null;
  industry?: string | null;
  city?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Worker {
  id: string;
  userId: string;
  age?: number | null;
  profession?: string[] | null;
  skills?: string[] | null;
  experienceYears?: number | null;
  bio?: string | null;
  city?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
