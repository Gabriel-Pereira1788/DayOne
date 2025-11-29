import { ScheduleNotificationImpl } from "@/infra/adapters/schedule-notification";

export let scheduleNotification: ScheduleNotificationImpl;

export function setScheduleNotification(impl: ScheduleNotificationImpl) {
  scheduleNotification = impl;
}
