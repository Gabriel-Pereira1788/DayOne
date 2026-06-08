export interface LoggerImpl {
  log(...message: any[]): void;
  warn(message: string): void;
  error(message: string): void;
}
