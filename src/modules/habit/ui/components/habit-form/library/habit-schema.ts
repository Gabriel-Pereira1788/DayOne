import { IconProps } from "@/shared/ui";
import { z } from "zod";

export const habitSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(500),
  icon: z.string().optional() as z.ZodType<IconProps['iconName'] | undefined>,
  targetDurationInDays: z.string().min(2).max(3, {
    message: "Target duration limit",
  }),
});

export type HabitSchema = z.infer<typeof habitSchema>
