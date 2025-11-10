import { repositoryService } from "@/shared/services/repository";
import { Habit, HabitDTO } from "../../habit.model";
import { Collection } from "@/infra/repository";

export async function createNewHabitService(habitDTO: HabitDTO) {
  const habitRepository = repositoryService.collection<Habit>(
    Collection.HABITS,
  );

  const startDate = new Date();

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + habitDTO.targetDurationInDays);

  const habitCompleteData: Habit = {
    ...habitDTO,
    id: new Date().getTime().toString(),
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    completed: false,
  };

  return await habitRepository.create(habitCompleteData);
}
