export type PayPeriod = "hourly" | "monthly" | "yearly";
export type ApplicationStatus = "pending" | "rejected" | "accepted";

export interface WorkerApplicationItem {
  id: string;
  workerId: string;
  firstName: string;
  lastName: string | null;
  profession: string[] | null;
  skills: string[] | null;
  experienceYears: number | null;
  salaryExpectation: number | null;
  currency: string;
  payPeriod: PayPeriod;
  locality: string | null;
  city: string;
  country: string;
  industry: string;
  phone: string | null;
  status: ApplicationStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface WorkerApplicationContentProps {
  applications: WorkerApplicationItem[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface RecruiterFormInputs {
  firstName?: string;
  lastName?: string;
  jobTitle: string;
  description: string;
  skills?: string[];
  experienceRequired?: number;
  employmentType?: string;
  companyName: string;
  industry: string;
  city: string;
  country: string;
  locality?: string;
  salary?: number;
  currency: string;
  payPeriod: PayPeriod;
  phone?: string;
  status: ApplicationStatus;
}

export interface CreateRecruiterApplicationProps {
  isOpen: boolean;
  onClose: () => void;
  statusMessage: string | null;
  setStatusMessage: (msg: string | null) => void;
  onSuccess: () => void;
}
