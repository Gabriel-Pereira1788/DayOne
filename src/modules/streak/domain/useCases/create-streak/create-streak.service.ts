import { Collection } from "@/infra/repository";
import { repositoryService } from "@/shared/services/repository";
import { Streak } from "../../streak.model";

export async function createStreakService(habitId: string) {
  const streakerRepository = repositoryService.collection<Streak>(
    Collection.STREAKS,
  );

  return await streakerRepository.create<Streak>({
    id: new Date().getTime().toString(),
    habitId,
    createdAt: new Date().toISOString(),
  });
}
