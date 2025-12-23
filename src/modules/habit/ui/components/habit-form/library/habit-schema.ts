import { IconProps } from "@/shared/ui";
import { z } from "zod";

export const habitSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters long",
    })
    .max(100),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters long",
    })
    .max(500),
  icon: z.string().optional() as z.ZodType<IconProps["iconName"] | undefined>,
  targetDurationInDays: z.string().min(1).max(3, {
    message: "Target duration limit",
  }).default("30"),
  frequency: z.enum(["daily", "weekly", "monthly"]).default("daily"),
  dayOfWeek: z.number().min(0).max(6).optional(),
  dayOfMonth: z.number().min(1).max(31).optional(),
  time: z
    .string({
      required_error: "Time is required",
    })
    .min(1)
    .max(5),
});

export type HabitSchema = z.infer<typeof habitSchema>;
