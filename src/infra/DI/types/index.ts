import type { AuthServiceImpl } from "@/infra/adapters/auth/types";
import type { LLMServiceImpl } from "@/infra/adapters/llm/types";
import type { ScheduleNotificationImpl } from "@/infra/adapters/schedule-notification/types";
import type { StorageImpl } from "@/infra/adapters/storage/types";
import type { IBaseRepositoryBuilder } from "@/infra/repository/types";

export type ServiceKey = string | symbol;
export type ServiceMap = Map<ServiceKey, any>;

export const enum DIKeys {
  Repository = "Repository",
  Storage = "Storage",
  LLMService = "LLMService",
  ScheduleNotification = "ScheduleNotification",
  AuthService = "AuthService",
}
export interface DIValues {
  [DIKeys.Repository]: IBaseRepositoryBuilder;
  [DIKeys.Storage]: StorageImpl;
  [DIKeys.LLMService]: LLMServiceImpl;
  [DIKeys.ScheduleNotification]: ScheduleNotificationImpl;
  [DIKeys.AuthService]: AuthServiceImpl;
}
