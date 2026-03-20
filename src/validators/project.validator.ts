import { z } from "zod";

export const createProjectValidator = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Project name is required")
    .max(100, "Project name cannot exceed 100 characters"),

  key: z
    .string()
    .min(1, "Project key is required")
    .max(10, "Project key cannot exceed 10 characters")
    .transform((val) => val.toUpperCase()),

  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  owner: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid owner id"),

  members: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid member id"))
    .optional(),

  access: z.enum(["PUBLIC", "PRIVATE"]).default("PUBLIC"),

  isArchived: z.boolean().optional(),
});
