import { Collection, IBaseRepositoryBuilder } from "@/infra/repository";

import { Streak } from "../../streak.model";

export async function createStreakService(
  habitId: string,
  repositoryService: IBaseRepositoryBuilder,
) {
  const streakerRepository = repositoryService.collection<Streak>(
    Collection.STREAKS,
  );

  return await streakerRepository.create<Streak>({
    id: new Date().getTime().toString(),
    habitId,
    createdAt: new Date().toISOString(),
  });
}
