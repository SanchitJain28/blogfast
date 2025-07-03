import { z } from "zod";

export const ProfileSchemma = z.object({
  full_name: z
    .string()
    .min(2, { message: "Full name must be bigger than 2 characters" }),

  username: z
    .string()
    .min(3, { message: "Username must be bigger than 2 characters" })
    .max(20, { message: "Username must be smaller than 20 characters" })
    .regex(/^[a-z_]+$/, {
      message:
        "Username must only contain lowercase letters and underscores (_) with no spaces or special characters",
    }),

  bio: z
    .string()
    .min(10, { message: "Bio must be at least 10 characters long" }),
});
