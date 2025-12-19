import { Habit } from "../../habit.model";
import { Collection, type IBaseRepositoryBuilder } from "@/infra/repository";

export async function getHabitsByText(
  text: string,
  repositoryService: IBaseRepositoryBuilder,
): Promise<Habit[]> {
  const habitsRepository = repositoryService.collection<Habit>(
    Collection.HABITS,
  );

  const result = await habitsRepository.findBy({
    title: text,
  });

  return result;
}
