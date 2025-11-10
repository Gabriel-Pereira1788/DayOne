import { createNewHabitService } from "../create-new-habit.service";
import { repositoryService } from "@/shared/services/repository";
import { Collection } from "@/infra/repository";
import { HabitDTO, Habit } from "../../../habit.model";

describe("CreateNewHabitService", () => {
  let habitRepository: any;

  beforeEach(() => {
    jest.clearAllMocks();
    habitRepository = repositoryService.collection<Habit>(Collection.HABITS);
    // Clear any existing data
    habitRepository.setMock([]);
  });

  describe("When creating a new habit", () => {
    it("should calculate end date correctly with targetDurationInDays", async () => {
      const habitDTO: HabitDTO = {
        title: "Exercise",
        description: "Daily exercise routine",
        targetDurationInDays: 30,
      };

      const startDate = new Date("2024-01-01T10:00:00.000Z");
      jest.useFakeTimers().setSystemTime(startDate);

      await createNewHabitService(habitDTO);

      const habits = await habitRepository.get();
      expect(habits).toHaveLength(1);

      const createdHabit = habits[0];
      expect(createdHabit.startDate).toEqual("2024-01-01T10:00:00.000Z");
      expect(createdHabit.endDate).toEqual("2024-01-31T10:00:00.000Z"); // 30 days after start date

      jest.useRealTimers();
    });

    it("should create habit with short targetDurationInDays (1 day)", async () => {
      const habitDTO: HabitDTO = {
        title: "Drink water",
        description: "Drink 2L of water",
        targetDurationInDays: 1,
      };

      const startDate = new Date("2024-02-15T08:30:00.000Z");
      jest.useFakeTimers().setSystemTime(startDate);

      await createNewHabitService(habitDTO);

      const habits = await habitRepository.get();
      const createdHabit = habits[0];

      expect(createdHabit.startDate).toBe("2024-02-15T08:30:00.000Z");
      expect(createdHabit.endDate).toBe("2024-02-16T08:30:00.000Z"); // 1 day after

      jest.useRealTimers();
    });

    it("should create habit with long targetDurationInDays (365 days) in leap year", async () => {
      const habitDTO: HabitDTO = {
        title: "Meditate",
        description: "Meditate for 10 minutes",
        targetDurationInDays: 365,
      };

      const startDate = new Date("2024-01-01T06:00:00.000Z");
      jest.useFakeTimers().setSystemTime(startDate);

      await createNewHabitService(habitDTO);

      const habits = await habitRepository.get();
      const createdHabit = habits[0];

      expect(createdHabit.startDate).toBe("2024-01-01T06:00:00.000Z");
      expect(createdHabit.endDate).toBe("2024-12-31T06:00:00.000Z"); // 365 days after (2024 is leap year)

      jest.useRealTimers();
    });

    it("should create habit with long targetDurationInDays (365 days) in non-leap year", async () => {
      const habitDTO: HabitDTO = {
        title: "Meditate",
        description: "Meditate for 10 minutes",

        targetDurationInDays: 365,
      };

      const startDate = new Date("2023-01-01T06:00:00.000Z");
      jest.useFakeTimers().setSystemTime(startDate);

      await createNewHabitService(habitDTO);

      const habits = await habitRepository.get();
      const createdHabit = habits[0];

      expect(createdHabit.startDate).toBe("2023-01-01T06:00:00.000Z");
      expect(createdHabit.endDate).toBe("2024-01-01T06:00:00.000Z"); // 365 days after (2023 is not leap year)

      jest.useRealTimers();
    });

    it("should create habit with exact leap year duration (366 days)", async () => {
      const habitDTO: HabitDTO = {
        title: "Year-long commitment",
        description: "Complete year in leap year",

        targetDurationInDays: 366,
      };

      const startDate = new Date("2024-01-01T06:00:00.000Z");
      jest.useFakeTimers().setSystemTime(startDate);

      await createNewHabitService(habitDTO);

      const habits = await habitRepository.get();
      const createdHabit = habits[0];

      expect(createdHabit.startDate).toBe("2024-01-01T06:00:00.000Z");
      expect(createdHabit.endDate).toBe("2025-01-01T06:00:00.000Z"); // 366 days after (full leap year)

      jest.useRealTimers();
    });

    it("should create habit with weekly frequency", async () => {
      const habitDTO: HabitDTO = {
        title: "Reading",
        description: "Read for 1 hour",

        targetDurationInDays: 21,
      };

      const startDate = new Date("2024-03-10T19:00:00.000Z");
      jest.useFakeTimers().setSystemTime(startDate);

      await createNewHabitService(habitDTO);

      const habits = await habitRepository.get();
      const createdHabit = habits[0];

      expect(createdHabit.endDate).toBe("2024-03-31T19:00:00.000Z"); // 21 days after

      jest.useRealTimers();
    });

    it("should create habit with custom frequency", async () => {
      const habitDTO: HabitDTO = {
        title: "Study programming",
        description: "Learn new technologies",

        targetDurationInDays: 90,
      };

      const startDate = new Date("2024-06-01T14:00:00.000Z");
      jest.useFakeTimers().setSystemTime(startDate);

      await createNewHabitService(habitDTO);

      const habits = await habitRepository.get();
      const createdHabit = habits[0];

      expect(createdHabit.endDate).toBe("2024-08-30T14:00:00.000Z"); // 90 days after

      jest.useRealTimers();
    });

    it("should set completed to false by default", async () => {
      const habitDTO: HabitDTO = {
        title: "New habit",
        description: "Test completed field",

        targetDurationInDays: 14,
      };

      await createNewHabitService(habitDTO);

      const habits = await habitRepository.get();
      const createdHabit = habits[0];

      expect(createdHabit.completed).toBe(false);
    });

    it("should handle month change in endDate calculation", async () => {
      const habitDTO: HabitDTO = {
        title: "End of month habit",
        description: "Test month change",

        targetDurationInDays: 5,
      };

      // Start on January 28th
      const startDate = new Date("2024-01-28T12:00:00.000Z");
      jest.useFakeTimers().setSystemTime(startDate);

      await createNewHabitService(habitDTO);

      const habits = await habitRepository.get();
      const createdHabit = habits[0];

      expect(createdHabit.startDate).toBe("2024-01-28T12:00:00.000Z");
      expect(createdHabit.endDate).toBe("2024-02-02T12:00:00.000Z"); // 5 days after, crossing to February

      jest.useRealTimers();
    });

    it("should preserve all habitDTO properties in created habit", async () => {
      const habitDTO: HabitDTO = {
        title: "Complete habit test",
        description: "Test all properties",

        targetDurationInDays: 14,
      };

      await createNewHabitService(habitDTO);

      const habits = await habitRepository.get();
      const createdHabit = habits[0];

      expect(createdHabit.title).toBe(habitDTO.title);
      expect(createdHabit.description).toBe(habitDTO.description);

      expect(createdHabit.targetDurationInDays).toBe(
        habitDTO.targetDurationInDays,
      );
    });
  });

  describe("Repository integration", () => {
    it("should persist habit in repository", async () => {
      const habitDTO: HabitDTO = {
        title: "Repository test",
        description: "Check persistence",

        targetDurationInDays: 10,
      };

      await createNewHabitService(habitDTO);

      const habits = await habitRepository.get();
      expect(habits).toHaveLength(1);
    });

    it("should create multiple habits independently", async () => {
      const habitDTO1: HabitDTO = {
        title: "First habit",
        description: "First description",

        targetDurationInDays: 7,
      };

      const habitDTO2: HabitDTO = {
        title: "Second habit",
        description: "Second description",

        targetDurationInDays: 21,
      };

      await createNewHabitService(habitDTO1);
      await createNewHabitService(habitDTO2);

      const habits = await habitRepository.get();
      expect(habits).toHaveLength(2);
      expect(habits[0].title).toBe("First habit");
      expect(habits[1].title).toBe("Second habit");
    });
  });
});
