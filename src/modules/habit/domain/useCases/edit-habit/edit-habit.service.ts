import { repositoryService } from "@/shared/services/repository";
import { Habit, HabitDTO, HabitId } from "../../habit.model";
import { Collection } from "@/infra/repository";

export async function editHabitService(id: HabitId, body: Partial<HabitDTO>) {
  const habitRepository = repositoryService.collection<Habit>(
    Collection.HABITS,
  );

  return await habitRepository.update(id, body);
}
