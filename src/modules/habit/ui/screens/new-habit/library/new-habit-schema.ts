import { z } from "zod";

export const newHabitSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(500),
  icon: z.string().optional(),
  targetDurationInDays: z.string().min(2).max(3, {
    message: "Target duration limit",
  }),
});

export type NewHabitSchema = z.infer<typeof newHabitSchema>;
