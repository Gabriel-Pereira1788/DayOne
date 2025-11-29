export type ScheduleFrequency = "daily" | "monthly" | "weekly";

export interface Notification {
  id: string;
  message: string;
  title: string;
}

export interface ScheduleDate {
  hour: number;
  minute: number;
  dayOfMonth?: number;
  dayOfWeek?: number;
}

export interface ScheduleNotificationImpl {
  schedule: (
    frequency: ScheduleFrequency,
    notification: Notification,
    date: ScheduleDate,
  ) => void;
  cancel: (id: string) => void;
  addListener: (listener: (id: string) => void) => () => void;
}
