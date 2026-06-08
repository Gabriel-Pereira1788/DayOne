import { LoggerImpl } from "./types";

export let logger: LoggerImpl;

export function setLoggerImpl(loggerImpl: LoggerImpl) {
  logger = loggerImpl;
}
