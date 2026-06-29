import z from "zod";

export const userRoleEnum = z.enum(["worker", "recruiter", "admin", "guest"]);

export const signupModel = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().max(255).nullish(),
  role: userRoleEnum,
  email: z.email().min(6).max(255).lowercase().trim(),
  password: z.string().min(8).max(255),
});

export const signinModel = z.object({
  email: z.email().min(6).max(255).lowercase().trim(),
  password: z.string().min(8).max(255),
});

export type UserRole = z.infer<typeof userRoleEnum>;
