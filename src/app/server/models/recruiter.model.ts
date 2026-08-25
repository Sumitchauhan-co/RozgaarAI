import z from "zod";

export const recruiterModel = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(255, "Company name cannot exceed 255 characters")
    .trim(),

  companyDescription: z.string().trim().nullish(),

  industry: z
    .string()
    .max(100, "Industry cannot exceed 100 characters")
    .trim()
    .nullish(),

  city: z
    .string()
    .max(100, "City cannot exceed 100 characters")
    .trim()
    .nullish(),
});

export type Recruiter = z.infer<typeof recruiterModel>;

export const recruiterUpdateModel = recruiterModel.partial();

export type UpdateRecruiter = z.infer<typeof recruiterUpdateModel>;
