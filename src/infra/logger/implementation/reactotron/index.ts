import Reactotron from "reactotron-react-native";
import { LoggerImpl } from "../../types";

Reactotron.configure({}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

function log(...args: string[]) {
  if (__DEV__) {
    Reactotron.log(args);
  }
}

function warn(...args: string[]) {
  if (__DEV__) {
    Reactotron.warn(args);
  }
}

function error(message: string) {
  if (__DEV__) {
    Reactotron.error(message, new Error(message));
  }
}

export const reactotronLoggerImpl: LoggerImpl = {
  log,
  warn,
  error,
};
