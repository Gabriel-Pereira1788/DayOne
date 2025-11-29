import { inAppScheduleNotification } from "@/infra/adapters/schedule-notification/implementation/inApp/in-app-schedule-notification";
import { inAppStorage } from "@/infra/adapters/storage/implementation/inApp";
import { inAppRepositoryBuilder } from "@/infra/repository/implementation/inApp/in-app-repository";

import { setRepositoryService } from "@/shared/services/repository/repository.service";
import { setScheduleNotification } from "@/shared/services/schedule-notification";

import { setStorage } from "@/shared/services/storage";

import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);
// @ts-ignore
global.FormData = require("react-native/Libraries/Network/FormData");

jest.mock("react-native-keyboard-controller", () =>
  require("react-native-keyboard-controller/jest"),
);

setStorage(inAppStorage);
setRepositoryService(inAppRepositoryBuilder);
setScheduleNotification(inAppScheduleNotification);
