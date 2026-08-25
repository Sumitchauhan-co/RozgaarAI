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

export interface WorkerApplicationItem {
  id: string;
  workerId: string;
  firstName: string;
  lastName: string | null;
  profession?: string[] | null;
  skills?: string[] | null;
  experienceYears?: number | null;
  salaryExpectation: number | null;
  currency: string;
  payPeriod: "hourly" | "monthly" | "yearly";
  industry: string | null;
  locality: string | null;
  city: string;
  country: string;
  phone: string | null;
  status: "pending" | "rejected" | "accepted";
  createdAt: string | Date;
  updatedAt: string | Date;
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

export type LocalWorkerState = Partial<Worker> & {
  professionRawString?: string;
  skillsRawString?: string;
};
