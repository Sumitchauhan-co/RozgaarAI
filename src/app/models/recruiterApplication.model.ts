import z from "zod";

export const payPeriodEnum = z.enum(["hourly", "monthly", "yearly"]);
export const applicationStatusEnum = z.enum([
  "accepted",
  "pending",
  "rejected",
]);

export const recruiterApplicationSchema = z.object({
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

export const recruiterApplicationModel = recruiterApplicationSchema;
export type RecruiterApplication = z.infer<typeof recruiterApplicationSchema>;
