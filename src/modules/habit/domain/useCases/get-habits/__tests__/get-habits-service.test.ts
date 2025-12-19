import { Collection } from "@/infra/repository";
import { habitListMock } from "@/modules/habit/__mocks__/habit-list.mock";

import { inAppRepositoryBuilder } from "@/infra/repository/implementation/inApp/in-app-repository";
import { getHabitsService } from "../get-habits.service";

beforeAll(() => {
  const habitRepository = inAppRepositoryBuilder.collection(Collection.HABITS);
  habitRepository.setMock?.(habitListMock);
});

afterAll(() => {
  const habitRepository = inAppRepositoryBuilder.collection(Collection.HABITS);
  habitRepository.setMock?.([]);
});

describe("GetHabitDetailsService", () => {
  it("should be get habit by id", async () => {
    const result = await getHabitsService(inAppRepositoryBuilder);
    expect(result.length).toEqual(habitListMock.length);
  });
});
