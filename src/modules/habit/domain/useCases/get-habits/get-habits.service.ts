import { Collection, IBaseRepositoryBuilder } from "@/infra/repository";

import { Habit } from "../../habit.model";

export async function getHabitsService(
  repositoryService: IBaseRepositoryBuilder,
) {
  const habitsRepository = repositoryService.collection<Habit>(
    Collection.HABITS,
  );
  const result = await habitsRepository.get();

  return result;
}
