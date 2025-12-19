import { Collection, IBaseRepositoryBuilder } from "@/infra/repository";

export async function deleteHabitService(
  id: string,
  repositoryService: IBaseRepositoryBuilder,
) {
  const habitRepository = repositoryService.collection(Collection.HABITS);
  await habitRepository.delete(id);
  return id;
}
