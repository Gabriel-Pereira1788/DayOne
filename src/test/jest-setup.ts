import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

// @ts-ignore
global.FormData = require("react-native/Libraries/Network/FormData");

jest.mock("react-native-keyboard-controller", () =>
  require("react-native-keyboard-controller/jest"),
);
