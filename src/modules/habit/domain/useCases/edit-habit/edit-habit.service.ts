import { Habit, HabitDTO, HabitId } from "../../habit.model";
import { Collection, IBaseRepositoryBuilder } from "@/infra/repository";
import { FrequencyValidationError } from "../../error";

export async function editHabitService(
  id: HabitId,
  body: Partial<HabitDTO>,
  repositoryService: IBaseRepositoryBuilder,
) {

  if (body.frequency === "weekly" && body.dayOfWeek === undefined) {
    throw new FrequencyValidationError(
      "dayOfWeek is required when frequency is weekly",
    );
  }

  if (body.frequency === "monthly" && body.dayOfMonth === undefined) {
    throw new FrequencyValidationError(
      "dayOfMonth is required when frequency is monthly",
    );
  }

  if (body.frequency === "weekly" && body.dayOfWeek !== undefined) {
    if (body.dayOfWeek < 0 || body.dayOfWeek > 6) {
      throw new FrequencyValidationError(
        "dayOfWeek must be between 0 (Sunday) and 6 (Saturday)",
      );
    }
  }

  if (body.frequency === "monthly" && body.dayOfMonth !== undefined) {
    if (body.dayOfMonth < 1 || body.dayOfMonth > 31) {
      throw new FrequencyValidationError("dayOfMonth must be between 1 and 31");
    }
  }

  if (body.dayOfWeek !== undefined && body.frequency !== "weekly") {
    const habitRepository = repositoryService.collection<Habit>(
      Collection.HABITS,
    );
    const currentHabit = await habitRepository.findById(id);

    if (currentHabit?.frequency !== "weekly") {
      throw new FrequencyValidationError(
        "dayOfWeek can only be set when frequency is weekly",
      );
    }

    if (body.dayOfWeek < 0 || body.dayOfWeek > 6) {
      throw new FrequencyValidationError(
        "dayOfWeek must be between 0 (Sunday) and 6 (Saturday)",
      );
    }
  }

  if (body.dayOfMonth !== undefined && body.frequency !== "monthly") {
    const habitRepository = repositoryService.collection<Habit>(
      Collection.HABITS,
    );
    const currentHabit = await habitRepository.findById(id);

    if (currentHabit?.frequency !== "monthly") {
      throw new FrequencyValidationError(
        "dayOfMonth can only be set when frequency is monthly",
      );
    }

    if (body.dayOfMonth < 1 || body.dayOfMonth > 31) {
      throw new FrequencyValidationError("dayOfMonth must be between 1 and 31");
    }
  }

  if (body.hours !== undefined) {
    if (body.hours < 0 || body.hours > 23) {
      throw new FrequencyValidationError("hours must be between 0 and 23");
    }
  }

  if (body.minutes !== undefined) {
    if (body.minutes < 0 || body.minutes > 59) {
      throw new FrequencyValidationError("minutes must be between 0 and 59");
    }
  }

  const habitRepository = repositoryService.collection<Habit>(
    Collection.HABITS,
  );

  return await habitRepository.update(id, body);
}
