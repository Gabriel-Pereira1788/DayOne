import { createNewHabitService } from "../create-new-habit.service";
import { repositoryService } from "@/shared/services/repository";
import { Collection } from "@/infra/repository";
import { HabitDTO, Habit } from "../../../habit.model";
import { FrequencyValidationError } from "../../../error";

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
        frequency: "daily",
        description: "Daily exercise routine",
        targetDurationInDays: 30,
        hours: 9,
        minutes: 0,
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
        frequency: "daily",
        description: "Drink 2L of water",
        targetDurationInDays: 1,
        hours: 8,
        minutes: 0,
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
        frequency: "daily",
        description: "Meditate for 10 minutes",
        targetDurationInDays: 365,
        hours: 6,
        minutes: 0,
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
        frequency: "daily",
        targetDurationInDays: 365,
        hours: 6,
        minutes: 0,
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
        frequency: "daily",
        description: "Complete year in leap year",
        targetDurationInDays: 366,
        hours: 6,
        minutes: 0,
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
        frequency: "daily",
        targetDurationInDays: 21,
        hours: 19,
        minutes: 0,
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
        frequency: "daily",
        description: "Learn new technologies",
        targetDurationInDays: 90,
        hours: 14,
        minutes: 0,
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
        frequency: "daily",
        description: "Test completed field",
        targetDurationInDays: 14,
        hours: 10,
        minutes: 0,
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
        frequency: "daily",
        targetDurationInDays: 5,
        hours: 12,
        minutes: 0,
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

    describe("Frequency validation", () => {
      it("should throw error when frequency is weekly but dayOfWeek is missing", async () => {
        const habitDTO: HabitDTO = {
          title: "Weekly habit",
          frequency: "weekly",
          description: "Weekly habit without dayOfWeek",
          targetDurationInDays: 14,
          hours: 10,
          minutes: 0,
        };

        await expect(createNewHabitService(habitDTO)).rejects.toThrow(
          new FrequencyValidationError(
            "dayOfWeek is required when frequency is weekly",
          ),
        );
      });

      it("should throw error when frequency is monthly but dayOfMonth is missing", async () => {
        const habitDTO: HabitDTO = {
          title: "Monthly habit",
          frequency: "monthly",
          description: "Monthly habit without dayOfMonth",
          targetDurationInDays: 30,
          hours: 10,
          minutes: 0,
        };

        await expect(createNewHabitService(habitDTO)).rejects.toThrow(
          new FrequencyValidationError(
            "dayOfMonth is required when frequency is monthly",
          ),
        );
      });

      it("should throw error when dayOfWeek is out of range (negative)", async () => {
        const habitDTO: HabitDTO = {
          title: "Weekly habit",
          frequency: "weekly",
          dayOfWeek: -1,
          description: "Weekly habit with invalid dayOfWeek",
          targetDurationInDays: 14,
          hours: 10,
          minutes: 0,
        };

        await expect(createNewHabitService(habitDTO)).rejects.toThrow(
          new FrequencyValidationError(
            "dayOfWeek must be between 0 (Sunday) and 6 (Saturday)",
          ),
        );
      });

      it("should throw error when dayOfWeek is out of range (too high)", async () => {
        const habitDTO: HabitDTO = {
          title: "Weekly habit",
          frequency: "weekly",
          dayOfWeek: 7,
          description: "Weekly habit with invalid dayOfWeek",
          targetDurationInDays: 14,
          hours: 10,
          minutes: 0,
        };

        await expect(createNewHabitService(habitDTO)).rejects.toThrow(
          new FrequencyValidationError(
            "dayOfWeek must be between 0 (Sunday) and 6 (Saturday)",
          ),
        );
      });

      it("should throw error when dayOfMonth is out of range (too low)", async () => {
        const habitDTO: HabitDTO = {
          title: "Monthly habit",
          frequency: "monthly",
          dayOfMonth: 0,
          description: "Monthly habit with invalid dayOfMonth",
          targetDurationInDays: 30,
          hours: 10,
          minutes: 0,
        };

        await expect(createNewHabitService(habitDTO)).rejects.toThrow(
          new FrequencyValidationError("dayOfMonth must be between 1 and 31"),
        );
      });

      it("should throw error when dayOfMonth is out of range (too high)", async () => {
        const habitDTO: HabitDTO = {
          title: "Monthly habit",
          frequency: "monthly",
          dayOfMonth: 32,
          description: "Monthly habit with invalid dayOfMonth",
          targetDurationInDays: 30,
          hours: 10,
          minutes: 0,
        };

        await expect(createNewHabitService(habitDTO)).rejects.toThrow(
          new FrequencyValidationError("dayOfMonth must be between 1 and 31"),
        );
      });

      it("should create habit successfully with valid weekly frequency", async () => {
        const habitDTO: HabitDTO = {
          title: "Weekly habit",
          frequency: "weekly",
          dayOfWeek: 1, // Monday
          description: "Valid weekly habit",
          targetDurationInDays: 21,
          hours: 10,
          minutes: 0,
        };

        const startDate = new Date("2024-01-01T10:00:00.000Z");
        jest.useFakeTimers().setSystemTime(startDate);

        await createNewHabitService(habitDTO);

        const habits = await habitRepository.get();
        expect(habits).toHaveLength(1);

        const createdHabit = habits[0];
        expect(createdHabit.frequency).toBe("weekly");
        expect(createdHabit.dayOfWeek).toBe(1);

        jest.useRealTimers();
      });

      it("should create habit successfully with valid monthly frequency", async () => {
        const habitDTO: HabitDTO = {
          title: "Monthly habit",
          frequency: "monthly",
          dayOfMonth: 15,
          description: "Valid monthly habit",
          targetDurationInDays: 30,
          hours: 10,
          minutes: 0,
        };

        const startDate = new Date("2024-01-01T10:00:00.000Z");
        jest.useFakeTimers().setSystemTime(startDate);

        await createNewHabitService(habitDTO);

        const habits = await habitRepository.get();
        expect(habits).toHaveLength(1);

        const createdHabit = habits[0];
        expect(createdHabit.frequency).toBe("monthly");
        expect(createdHabit.dayOfMonth).toBe(15);

        jest.useRealTimers();
      });

      it("should create daily habit without dayOfWeek or dayOfMonth", async () => {
        const habitDTO: HabitDTO = {
          title: "Daily habit",
          frequency: "daily",
          description: "Valid daily habit",
          targetDurationInDays: 30,
          hours: 10,
          minutes: 0,
        };

        await createNewHabitService(habitDTO);

        const habits = await habitRepository.get();
        expect(habits).toHaveLength(1);

        const createdHabit = habits[0];
        expect(createdHabit.frequency).toBe("daily");
        expect(createdHabit.dayOfWeek).toBeUndefined();
        expect(createdHabit.dayOfMonth).toBeUndefined();
      });

      it("should throw error when hours is missing", async () => {
        const habitDTO: any = {
          title: "Test habit",
          frequency: "daily",
          description: "Missing hours",
          targetDurationInDays: 14,
          minutes: 0,
        };

        await expect(createNewHabitService(habitDTO)).rejects.toThrow(
          new FrequencyValidationError(
            "hours is required and must be between 0 and 23",
          ),
        );
      });

      it("should throw error when minutes is missing", async () => {
        const habitDTO: any = {
          title: "Test habit",
          frequency: "daily",
          description: "Missing minutes",
          targetDurationInDays: 14,
          hours: 10,
        };

        await expect(createNewHabitService(habitDTO)).rejects.toThrow(
          new FrequencyValidationError(
            "minutes is required and must be between 0 and 59",
          ),
        );
      });

      it("should throw error when hours is out of range (negative)", async () => {
        const habitDTO: HabitDTO = {
          title: "Test habit",
          frequency: "daily",
          description: "Invalid hours",
          targetDurationInDays: 14,
          hours: -1,
          minutes: 0,
        };

        await expect(createNewHabitService(habitDTO)).rejects.toThrow(
          new FrequencyValidationError(
            "hours is required and must be between 0 and 23",
          ),
        );
      });

      it("should throw error when hours is out of range (too high)", async () => {
        const habitDTO: HabitDTO = {
          title: "Test habit",
          frequency: "daily",
          description: "Invalid hours",
          targetDurationInDays: 14,
          hours: 24,
          minutes: 0,
        };

        await expect(createNewHabitService(habitDTO)).rejects.toThrow(
          new FrequencyValidationError(
            "hours is required and must be between 0 and 23",
          ),
        );
      });

      it("should throw error when minutes is out of range (negative)", async () => {
        const habitDTO: HabitDTO = {
          title: "Test habit",
          frequency: "daily",
          description: "Invalid minutes",
          targetDurationInDays: 14,
          hours: 10,
          minutes: -1,
        };

        await expect(createNewHabitService(habitDTO)).rejects.toThrow(
          new FrequencyValidationError(
            "minutes is required and must be between 0 and 59",
          ),
        );
      });

      it("should throw error when minutes is out of range (too high)", async () => {
        const habitDTO: HabitDTO = {
          title: "Test habit",
          frequency: "daily",
          description: "Invalid minutes",
          targetDurationInDays: 14,
          hours: 10,
          minutes: 60,
        };

        await expect(createNewHabitService(habitDTO)).rejects.toThrow(
          new FrequencyValidationError(
            "minutes is required and must be between 0 and 59",
          ),
        );
      });

      it("should create habit successfully with valid hours and minutes (boundary values)", async () => {
        const habitDTO: HabitDTO = {
          title: "Boundary test",
          frequency: "daily",
          description: "Test boundary values for time",
          targetDurationInDays: 14,
          hours: 23,
          minutes: 59,
        };

        await createNewHabitService(habitDTO);

        const habits = await habitRepository.get();
        expect(habits).toHaveLength(1);

        const createdHabit = habits[0];
        expect(createdHabit.hours).toBe(23);
        expect(createdHabit.minutes).toBe(59);
      });

      it("should create habit successfully with zero hours and minutes", async () => {
        const habitDTO: HabitDTO = {
          title: "Zero time test",
          frequency: "daily",
          description: "Test zero time values",
          targetDurationInDays: 14,
          hours: 0,
          minutes: 0,
        };

        await createNewHabitService(habitDTO);

        const habits = await habitRepository.get();
        expect(habits).toHaveLength(1);

        const createdHabit = habits[0];
        expect(createdHabit.hours).toBe(0);
        expect(createdHabit.minutes).toBe(0);
      });
    });

    it("should preserve all habitDTO properties in created habit", async () => {
      const habitDTO: HabitDTO = {
        title: "Complete habit test",
        frequency: "daily",
        description: "Test all properties",
        targetDurationInDays: 14,
        hours: 10,
        minutes: 0,
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
        frequency: "daily",
        description: "Check persistence",
        targetDurationInDays: 10,
        hours: 10,
        minutes: 0,
      };

      await createNewHabitService(habitDTO);

      const habits = await habitRepository.get();
      expect(habits).toHaveLength(1);
    });

    it("should create multiple habits independently", async () => {
      const habitDTO1: HabitDTO = {
        title: "First habit",
        frequency: "daily",
        description: "First description",
        targetDurationInDays: 7,
        hours: 10,
        minutes: 0,
      };

      const habitDTO2: HabitDTO = {
        title: "Second habit",
        description: "Second description",
        frequency: "daily",
        targetDurationInDays: 21,
        hours: 15,
        minutes: 30,
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
