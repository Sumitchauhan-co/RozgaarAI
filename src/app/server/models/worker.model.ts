import z from "zod";

export const workerModel = z.object({
  age: z
    .number()
    .min(14, "You must be at least 14 years old to work")
    .max(100, "Invalid age")
    .nullish(),

  profession: z
    .array(
      z
        .string()
        .min(2, "Profession name is too short")
        .max(100, "Profession name is too long")
        .trim()
    )
    .nullish(),

  skills: z
    .array(
      z
        .string()
        .min(2, "Skill name is too short")
        .max(100, "Skill name is too long")
        .trim()
    )
    .nullish(),

  experienceYears: z
    .number()
    .min(0, "Experience years cannot be negative")
    .max(70, "Invalid experience years")
    .nullish(),

  bio: z.string().trim().nullish(),

  city: z
    .string()
    .max(100, "City cannot exceed 100 characters")
    .trim()
    .nullish(),
});

export type Worker = z.infer<typeof workerModel>;

export const workerUpdateModel = workerModel.partial();

export type UpdateWorker = z.infer<typeof workerUpdateModel>;
