export type PayPeriod = "hourly" | "monthly" | "yearly";
export type ApplicationStatus = "pending" | "rejected" | "accepted";

export interface RecruiterApplicationItem {
  id: string;
  recruiterId: string;
  firstName: string;
  lastName: string | null;
  jobTitle: string;
  description: string;
  skills: string[] | null;
  experienceRequired: number | null;
  employmentType: string | null;
  companyName: string;
  industry: string | null;
  salary: number | null;
  currency: string;
  payPeriod: PayPeriod;
  locality: string | null;
  city: string;
  country: string;
  phone: string | null;
  status: ApplicationStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface RecruiterApplicationContentProps {
  applications: RecruiterApplicationItem[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface WorkerFormInputs {
  firstName: string;
  lastName?: string;
  profession?: string[];
  skills?: string[];
  experienceYears?: string;
  industry: string;
  city: string;
  country: string;
  locality?: string;
  salaryExpectation?: string;
  currency: string;
  payPeriod: PayPeriod;
  phone?: string;
  status: ApplicationStatus;
}

export interface CreateWorkerApplicationProps {
  isOpen: boolean;
  onClose: () => void;
  statusMessage: string | null;
  setStatusMessage: (msg: string | null) => void;
  onSuccess: () => void;
}
