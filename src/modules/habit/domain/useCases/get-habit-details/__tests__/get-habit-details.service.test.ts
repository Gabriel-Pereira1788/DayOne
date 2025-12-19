import { Collection } from "@/infra/repository";
import { habitListMock } from "@/modules/habit/__mocks__/habit-list.mock";
import { getHabitDetailsService } from "../get-habit-details.service";
import { inAppRepositoryBuilder } from "@/infra/repository/implementation/inApp/in-app-repository";

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
    const result = await getHabitDetailsService(
      habitListMock[0].id,
      inAppRepositoryBuilder,
    );
    expect(result).toEqual(habitListMock[0]);
  });

  it("should be get undefined data", async () => {
    const result = await getHabitDetailsService("123", inAppRepositoryBuilder);
    expect(result).toBeUndefined();
  });
});
