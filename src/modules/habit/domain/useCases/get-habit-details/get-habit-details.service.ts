import { Habit, HabitId } from "../../habit.model";
import { Collection, IBaseRepositoryBuilder } from "@/infra/repository";

export async function getHabitDetailsService(
  id: HabitId,
  repositoryService: IBaseRepositoryBuilder,
) {
  const habitsRepository = repositoryService.collection<Habit>(
    Collection.HABITS,
  );

  const result = await habitsRepository.findById(id);

  return result;
}
