import z from "zod";

export const payPeriodEnum = z.enum(["hourly", "monthly", "yearly"]);
export const applicationStatusEnum = z.enum([
  "accepted",
  "pending",
  "rejected",
]);

export const recruiterApplicationSchema = z.object({
  firstName: z
    .string()
    // .min(1, "First name is required")
    .max(255, "First name cannot exceed 255 characters")
    .trim(),

  lastName: z
    .string()
    .max(255, "Last name cannot exceed 255 characters")
    .trim()
    .nullish(),

  jobTitle: z
    .string()
    .min(2, "Job title must be at least 2 characters")
    .max(255, "Job title cannot exceed 255 characters")
    .trim(),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .trim(),

  skills: z.array(z.string().trim()).nullish(),

  experienceRequired: z
    .number()
    .int("Experience required must be a whole number")
    .nonnegative("Experience cannot be negative")
    .nullish(),

  employmentType: z
    .string()
    .max(50, "Employment type cannot exceed 50 characters")
    .trim()
    .nullish(),

  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(255, "Company name cannot exceed 255 characters")
    .trim(),

  industry: z
    .string()
    .max(100, "Industry cannot exceed 100 characters")
    .trim()
    .nullish(),

  salary: z
    .number()
    .positive("Salary must be a positive number")
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

  phone: z
    .string()
    .min(5, "Phone number is too short")
    .max(20, "Phone number cannot exceed 20 characters")
    .trim()
    .nullish(),
});

export const recruiterApplicationUpdateSchema = recruiterApplicationSchema
  .partial()
  .extend({
    status: applicationStatusEnum.optional(),
  });

export type RecruiterApplicationInput = z.infer<
  typeof recruiterApplicationSchema
>;
