import z from "zod";
import { payPeriodEnum } from "./recruiterApplication.model";

export const workerApplicationStatusEnum = z.enum([
  "accepted",
  "pending",
  "rejected",
]);

export const workerApplicationSchema = z.object({
  salaryExpectation: z
    .number()
    .positive("Salary expectation must be a positive number")
    .max(2147483647, "Salary value is too high")
    .nullish(),

  currency: z
    .string()
    .length(3, "Currency must be a 3-letter ISO code (e.g., INR)")
    .toUpperCase()
    .default("INR"),

  payPeriod: payPeriodEnum.default("yearly"),

  locality: z
    .string()
    .max(150, "Locality cannot exceed 150 characters")
    .trim()
    .nullish(),

  city: z
    .string()
    .min(2, "City name must be at least 2 characters")
    .max(100, "City cannot exceed 100 characters")
    .trim(),

  country: z
    .string()
    .min(2, "Country name must be at least 2 characters")
    .max(100, "Country cannot exceed 100 characters")
    .trim(),

  industry: z
    .string()
    .min(2, "Industry must be at least 2 characters")
    .max(100, "Industry cannot exceed 100 characters")
    .trim(),

  phone: z
    .string()
    .min(5, "Phone number is too short")
    .max(20, "Phone number cannot exceed 20 characters")
    .trim()
    .nullish(),
});

export type WorkerApplicationInput = z.infer<typeof workerApplicationSchema>;

export const updateWorkerApplicationSchema = z.object({
  salaryExpectation: z
    .number()
    .positive("Salary expectation must be a positive number")
    .max(2147483647, "Salary value is too high")
    .nullish(),

  currency: z
    .string()
    .length(3, "Currency must be a 3-letter ISO code (e.g., INR)")
    .toUpperCase()
    .optional(),

  payPeriod: payPeriodEnum.optional(),

  locality: z
    .string()
    .max(150, "Locality cannot exceed 150 characters")
    .trim()
    .nullish(),

  city: z
    .string()
    .min(2, "City name must be at least 2 characters")
    .max(100, "City cannot exceed 100 characters")
    .trim()
    .optional(),

  country: z
    .string()
    .min(2, "Country name must be at least 2 characters")
    .max(100, "Country cannot exceed 100 characters")
    .trim()
    .optional(),

  industry: z
    .string()
    .min(2, "Industry must be at least 2 characters")
    .max(100, "Industry cannot exceed 100 characters")
    .trim()
    .optional(),

  phone: z
    .string()
    .min(5, "Phone number is too short")
    .max(20, "Phone number cannot exceed 20 characters")
    .trim()
    .nullish(),

  status: workerApplicationStatusEnum.optional(),
});
