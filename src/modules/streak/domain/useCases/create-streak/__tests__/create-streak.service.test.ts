import { createStreakService } from "../create-streak.service";
import { repositoryService } from "@/shared/services/repository";
import { Collection } from "@/infra/repository";
import { Streak } from "../../../streak.model";

describe("createStreakService", () => {
  let streaksRepository: any;

  beforeEach(() => {
    jest.clearAllMocks();
    streaksRepository = repositoryService.collection<Streak>(Collection.STREAKS);
    streaksRepository.setMock?.([]);
  });

  it("should create a new streak with correct properties", async () => {
    const habitId = "habit-123";

    const result = await createStreakService(habitId);

    expect(result).toEqual({
      id: expect.any(String),
      habitId: habitId,
      createdAt: expect.any(String),
    });
  });

  it("should create streak with habitId provided", async () => {
    const habitId = "habit-456";

    const result = await createStreakService(habitId);

    expect(result.habitId).toBe(habitId);
    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeDefined();
  });
});
