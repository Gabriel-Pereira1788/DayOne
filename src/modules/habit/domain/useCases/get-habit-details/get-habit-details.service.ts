import { repositoryService } from "@/shared/services/repository";
import { Habit, HabitId } from "../../habit.model";
import { Collection } from "@/infra/repository";

export async function getHabitDetailsService(id: HabitId) {
  const habitsRepository = repositoryService.collection<Habit>(
    Collection.HABITS,
  );

  const result = await habitsRepository.findById(id);

  return result;
}
