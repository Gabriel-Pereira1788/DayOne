import {
  Notification,
  ScheduleDate,
  ScheduleFrequency,
  ScheduleNotificationImpl,
} from "../../types";

function schedule(
  frequency: ScheduleFrequency,
  notification: Notification,
  date: ScheduleDate,
) {}

function cancel(id: string) {}

function addListener(listener: (id: string) => void) {
  return () => {};
}
export const inAppScheduleNotification: ScheduleNotificationImpl = {
  schedule,
  cancel,
  addListener,
};
