import z from "zod";

export const userRoleEnum = z.enum(["worker", "recruiter", "admin", "guest"]);

export const signupModel = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().max(255).optional(),
  role: userRoleEnum,
  email: z.email().min(6).max(255).lowercase().trim(),
  password: z.string().min(8).max(255),
});

export const signinModel = z.object({
  email: z.email().min(6).max(255).lowercase().trim(),
  password: z.string().min(8).max(255),
});

export const forgotPasswordModel = z.object({
  email: z.email().min(6).max(255).lowercase().trim(),
});

export const resetPasswordModel = z
  .object({
    token: z.string().min(1, "Token is required."),
    newPassword: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type UserRole = z.infer<typeof userRoleEnum>;
