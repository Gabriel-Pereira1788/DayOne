import { Collection } from "@/infra/repository";
import { newHabitSchema } from "@/modules/habit/ui/screens/new-habit/library/new-habit-schema";
import { repositoryService } from "@/shared/services/repository";
import { Habit } from "../../habit.model";

export async function getHabitsService() {
  const habitsRepository = repositoryService.collection<Habit>(
    Collection.HABITS,
  );

  const result = await habitsRepository.get();

  return result;
}
