import { Habit, HabitDTO } from "../../habit.model";
import { Collection, IBaseRepositoryBuilder } from "@/infra/repository";
import { FrequencyValidationError } from "../../error";

export async function createNewHabitService(
  habitDTO: HabitDTO,
  repositoryService: IBaseRepositoryBuilder,
) {
  if (habitDTO.frequency === "weekly" && habitDTO.dayOfWeek === undefined) {
    throw new FrequencyValidationError(
      "dayOfWeek is required when frequency is weekly",
    );
  }

  if (habitDTO.frequency === "monthly" && habitDTO.dayOfMonth === undefined) {
    throw new FrequencyValidationError(
      "dayOfMonth is required when frequency is monthly",
    );
  }

  if (habitDTO.frequency === "weekly" && habitDTO.dayOfWeek !== undefined) {
    if (habitDTO.dayOfWeek < 0 || habitDTO.dayOfWeek > 6) {
      throw new FrequencyValidationError(
        "dayOfWeek must be between 0 (Sunday) and 6 (Saturday)",
      );
    }
  }

  if (habitDTO.frequency === "monthly" && habitDTO.dayOfMonth !== undefined) {
    if (habitDTO.dayOfMonth < 1 || habitDTO.dayOfMonth > 31) {
      throw new FrequencyValidationError("dayOfMonth must be between 1 and 31");
    }
  }

  if (
    habitDTO.hours === undefined ||
    habitDTO.hours < 0 ||
    habitDTO.hours > 23
  ) {
    throw new FrequencyValidationError(
      "hours is required and must be between 0 and 23",
    );
  }

  if (
    habitDTO.minutes === undefined ||
    habitDTO.minutes < 0 ||
    habitDTO.minutes > 59
  ) {
    throw new FrequencyValidationError(
      "minutes is required and must be between 0 and 59",
    );
  }

  const habitRepository = repositoryService.collection<Habit>(
    Collection.HABITS,
  );

  const startDate = new Date();

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + (habitDTO?.targetDurationInDays || 30));

  const habitCompleteData: Habit = {
    ...habitDTO,
    id: new Date().getTime().toString(),
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    completed: false,
  };

  return await habitRepository.create(habitCompleteData);
}
