import { Collection } from "@/infra/repository";
import { habitListMock } from "@/modules/habit/__mocks__/habit-list.mock";
import { repositoryService } from "@/shared/services/repository";
import { getHabitDetailsService } from "../get-habit-details.service";

beforeAll(() => {
  const habitRepository = repositoryService.collection(Collection.HABITS);
  habitRepository.setMock?.(habitListMock);
});

afterAll(() => {
  const habitRepository = repositoryService.collection(Collection.HABITS);
  habitRepository.setMock?.([]);
});

describe("GetHabitDetailsService", () => {
  it("should be get habit by id", async () => {
    const result = await getHabitDetailsService(habitListMock[0].id);
    expect(result).toEqual(habitListMock[0]);
  });

  it("should be get undefined data", async () => {
    const result = await getHabitDetailsService("123");
    expect(result).toBeUndefined();
  });
});
