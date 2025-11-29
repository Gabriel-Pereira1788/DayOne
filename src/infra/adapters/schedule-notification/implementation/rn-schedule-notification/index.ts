import rnScheduleNotification from "react-native-scheduled-notifications";
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
) {
  rnScheduleNotification.schedule("daily", notification, {
    hour: date.hour,
    minute: date.minute,
    dayOfMonth: date.dayOfMonth,
    dayOfWeek: date.dayOfWeek,
  });
}

function cancel(id: string) {
  rnScheduleNotification.cancel(id);
}

function addListener(listener: (id: string) => void) {
  return rnScheduleNotification.addListener(listener);
}

export const rnScheduleNotificationImpl: ScheduleNotificationImpl = {
  schedule,
  cancel,
  addListener,
};
