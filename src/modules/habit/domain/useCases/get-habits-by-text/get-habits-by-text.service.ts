import { repositoryService } from "@/shared/services/repository";
import { Habit } from "../../habit.model";
import { Collection } from "@/infra/repository";

export async function getHabitsByText(text: string): Promise<Habit[]> {
  const habitsRepository = repositoryService.collection<Habit>(
    Collection.HABITS,
  );

  const result = await habitsRepository.findBy({
    title: text,
  });
  return result;
}
