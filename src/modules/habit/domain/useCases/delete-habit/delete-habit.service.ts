import { Collection } from "@/infra/repository";
import { repositoryService } from "@/shared/services/repository";

export async function deleteHabitService(id: string) {
  const habitRepository = repositoryService.collection(Collection.HABITS);
  await habitRepository.delete(id);
}
