import { editHabitService } from "../edit-habit.service";
import { Collection } from "@/infra/repository";
import { habitListMock } from "@/modules/habit/__mocks__/habit-list.mock";
import { HabitDTO } from "../../../habit.model";
import { FrequencyValidationError } from "../../../error";

import { inAppRepositoryBuilder } from "@/infra/repository/implementation/inApp/in-app-repository";
beforeEach(() => {
  const habitRepository = inAppRepositoryBuilder.collection(Collection.HABITS);
  habitRepository.setMock?.(habitListMock);
});

afterEach(() => {
  const habitRepository = inAppRepositoryBuilder.collection(Collection.HABITS);
  habitRepository.setMock?.([]);
});

describe("editHabitService", () => {
  describe("Basic editing functionality", () => {
    it("should edit habit title", async () => {
      const result = await editHabitService(
        habitListMock[0].id,
        {
          title: "John doe Title",
        },
        inAppRepositoryBuilder,
      );

      expect(result.title).toBe("John doe Title");
      expect(result.id).toBe(habitListMock[0].id);
    });

    it("should edit habit description", async () => {
      const newDescription = "Nova descrição para o hábito de exercícios";
      const result = await editHabitService(
        habitListMock[0].id,
        {
          description: newDescription,
        },
        inAppRepositoryBuilder,
      );

      expect(result.description).toBe(newDescription);
      expect(result.title).toBe(habitListMock[0].title); // título deve permanecer inalterado
    });

    it("should edit habit targetDurationInDays", async () => {
      const newDuration = 120;
      const result = await editHabitService(
        habitListMock[2].id,
        {
          targetDurationInDays: newDuration,
        },
        inAppRepositoryBuilder,
      );

      expect(result.targetDurationInDays).toBe(newDuration);
      expect(result.title).toBe(habitListMock[2].title);
    });

    it("should edit habit icon", async () => {
      const newIcon = "smiley";
      const result = await editHabitService(
        habitListMock[1].id,
        {
          icon: newIcon,
        },
        inAppRepositoryBuilder,
      );

      expect(result.icon).toBe(newIcon);
      expect(result.title).toBe(habitListMock[1].title);
    });

    it("should edit multiple properties simultaneously", async () => {
      const updates = {
        title: "Título Atualizado",
        description: "Descrição atualizada com mais detalhes",
        targetDurationInDays: 200,
      };

      const result = await editHabitService(
        habitListMock[4].id,
        updates,
        inAppRepositoryBuilder,
      );

      expect(result.title).toBe(updates.title);
      expect(result.description).toBe(updates.description);
      expect(result.targetDurationInDays).toBe(updates.targetDurationInDays);
      expect(result.id).toBe(habitListMock[4].id);
    });

    it("should handle editing with empty partial object", async () => {
      const result = await editHabitService(
        habitListMock[0].id,
        {},
        inAppRepositoryBuilder,
      );

      expect(result.id).toBe(habitListMock[0].id);
      expect(result.title).toBe(habitListMock[0].title);
    });

    it("should edit only provided fields and keep others unchanged", async () => {
      const originalHabit = habitListMock[2]; // "Ler livros"
      const result = await editHabitService(
        originalHabit.id,
        {
          title: "Ler mais livros",
        },
        inAppRepositoryBuilder,
      );

      expect(result.title).toBe("Ler mais livros");
      expect(result.description).toBe(originalHabit.description);
      expect(result.targetDurationInDays).toBe(
        originalHabit.targetDurationInDays,
      );
      expect(result.startDate).toBe(originalHabit.startDate);
      expect(result.endDate).toBe(originalHabit.endDate);
      expect(result.completed).toBe(originalHabit.completed);
    });

    it("should edit habit that has optional fields undefined", async () => {
      const result = await editHabitService(
        habitListMock[1].id,
        {
          description: "Praticar meditação mindfulness por 15 minutos",
          targetDurationInDays: 60,
        },
        inAppRepositoryBuilder,
      );

      expect(result.description).toBe(
        "Praticar meditação mindfulness por 15 minutos",
      );
      expect(result.targetDurationInDays).toBe(60);
      expect(result.title).toBe(habitListMock[1].title);
    });

    it("should throw error when trying to edit non-existent habit", async () => {
      await expect(
        editHabitService(
          "non-existent-id",
          { title: "Test" },
          inAppRepositoryBuilder,
        ),
      ).rejects.toThrow();
    });

    it("should edit habit with all possible DTO fields", async () => {
      const completeUpdate: HabitDTO = {
        title: "Hábito Completamente Atualizado",
        description: "Descrição completa e detalhada do novo hábito",
        targetDurationInDays: 365,
        frequency: "daily",
        hours: 10,
        minutes: 30,
      };

      const result = await editHabitService(
        habitListMock[3].id,
        completeUpdate,
        inAppRepositoryBuilder,
      );

      expect(result.title).toBe(completeUpdate.title);
      expect(result.description).toBe(completeUpdate.description);
      expect(result.icon).toBe(completeUpdate.icon);
      expect(result.targetDurationInDays).toBe(
        completeUpdate.targetDurationInDays,
      );
      expect(result.frequency).toBe(completeUpdate.frequency);
      expect(result.hours).toBe(completeUpdate.hours);
      expect(result.minutes).toBe(completeUpdate.minutes);
    });
  });

  describe("Frequency validation", () => {
    it("should throw error when frequency is weekly but dayOfWeek is missing", async () => {
      await expect(
        editHabitService(
          habitListMock[0].id,
          {
            frequency: "weekly",
            // dayOfWeek is missing
          },
          inAppRepositoryBuilder,
        ),
      ).rejects.toThrow(
        new FrequencyValidationError(
          "dayOfWeek is required when frequency is weekly",
        ),
      );
    });

    it("should throw error when frequency is monthly but dayOfMonth is missing", async () => {
      await expect(
        editHabitService(
          habitListMock[0].id,
          {
            frequency: "monthly",
            // dayOfMonth is missing
          },
          inAppRepositoryBuilder,
        ),
      ).rejects.toThrow(
        new FrequencyValidationError(
          "dayOfMonth is required when frequency is monthly",
        ),
      );
    });

    it("should throw error when dayOfWeek is out of range (negative)", async () => {
      await expect(
        editHabitService(
          habitListMock[0].id,
          {
            frequency: "weekly",
            dayOfWeek: -1,
          },
          inAppRepositoryBuilder,
        ),
      ).rejects.toThrow(
        new FrequencyValidationError(
          "dayOfWeek must be between 0 (Sunday) and 6 (Saturday)",
        ),
      );
    });

    it("should throw error when dayOfWeek is out of range (too high)", async () => {
      await expect(
        editHabitService(
          habitListMock[0].id,
          {
            frequency: "weekly",
            dayOfWeek: 7,
          },
          inAppRepositoryBuilder,
        ),
      ).rejects.toThrow(
        new FrequencyValidationError(
          "dayOfWeek must be between 0 (Sunday) and 6 (Saturday)",
        ),
      );
    });

    it("should throw error when dayOfMonth is out of range (too low)", async () => {
      await expect(
        editHabitService(
          habitListMock[0].id,
          {
            frequency: "monthly",
            dayOfMonth: 0,
          },
          inAppRepositoryBuilder,
        ),
      ).rejects.toThrow(
        new FrequencyValidationError("dayOfMonth must be between 1 and 31"),
      );
    });

    it("should throw error when dayOfMonth is out of range (too high)", async () => {
      await expect(
        editHabitService(
          habitListMock[0].id,
          {
            frequency: "monthly",
            dayOfMonth: 32,
          },
          inAppRepositoryBuilder,
        ),
      ).rejects.toThrow(
        new FrequencyValidationError("dayOfMonth must be between 1 and 31"),
      );
    });

    it("should successfully edit habit with valid weekly frequency", async () => {
      const result = await editHabitService(
        habitListMock[0].id,
        {
          frequency: "weekly",
          dayOfWeek: 3, // Wednesday
        },
        inAppRepositoryBuilder,
      );

      expect(result.frequency).toBe("weekly");
      expect(result.dayOfWeek).toBe(3);
      expect(result.id).toBe(habitListMock[0].id);
    });

    it("should successfully edit habit with valid monthly frequency", async () => {
      const result = await editHabitService(
        habitListMock[0].id,
        {
          frequency: "monthly",
          dayOfMonth: 15,
        },
        inAppRepositoryBuilder,
      );

      expect(result.frequency).toBe("monthly");
      expect(result.dayOfMonth).toBe(15);
      expect(result.id).toBe(habitListMock[0].id);
    });

    it("should successfully edit daily habit without dayOfWeek or dayOfMonth", async () => {
      const result = await editHabitService(
        habitListMock[0].id,
        {
          frequency: "daily",
          title: "Updated daily habit",
        },
        inAppRepositoryBuilder,
      );

      expect(result.frequency).toBe("daily");
      expect(result.title).toBe("Updated daily habit");
      expect(result.id).toBe(habitListMock[0].id);
    });
  });

  describe("Hours and minutes validation", () => {
    it("should throw error when hours is out of range (negative)", async () => {
      await expect(
        editHabitService(
          habitListMock[0].id,
          {
            hours: -1,
          },
          inAppRepositoryBuilder,
        ),
      ).rejects.toThrow(
        new FrequencyValidationError("hours must be between 0 and 23"),
      );
    });

    it("should throw error when hours is out of range (too high)", async () => {
      await expect(
        editHabitService(
          habitListMock[0].id,
          {
            hours: 24,
          },
          inAppRepositoryBuilder,
        ),
      ).rejects.toThrow(
        new FrequencyValidationError("hours must be between 0 and 23"),
      );
    });

    it("should throw error when minutes is out of range (negative)", async () => {
      await expect(
        editHabitService(
          habitListMock[0].id,
          {
            minutes: -1,
          },
          inAppRepositoryBuilder,
        ),
      ).rejects.toThrow(
        new FrequencyValidationError("minutes must be between 0 and 59"),
      );
    });

    it("should throw error when minutes is out of range (too high)", async () => {
      await expect(
        editHabitService(
          habitListMock[0].id,
          {
            minutes: 60,
          },
          inAppRepositoryBuilder,
        ),
      ).rejects.toThrow(
        new FrequencyValidationError("minutes must be between 0 and 59"),
      );
    });

    it("should successfully edit habit with valid hours and minutes (boundary values)", async () => {
      const result = await editHabitService(
        habitListMock[0].id,
        {
          hours: 23,
          minutes: 59,
        },
        inAppRepositoryBuilder,
      );

      expect(result.hours).toBe(23);
      expect(result.minutes).toBe(59);
      expect(result.id).toBe(habitListMock[0].id);
    });

    it("should successfully edit habit with zero hours and minutes", async () => {
      const result = await editHabitService(
        habitListMock[0].id,
        {
          hours: 0,
          minutes: 0,
        },
        inAppRepositoryBuilder,
      );

      expect(result.hours).toBe(0);
      expect(result.minutes).toBe(0);
      expect(result.id).toBe(habitListMock[0].id);
    });
  });

  describe("Cross-field validation scenarios", () => {
    it("should allow editing dayOfWeek for existing weekly habit", async () => {
      // First, create a weekly habit
      await editHabitService(
        habitListMock[0].id,
        {
          frequency: "weekly",
          dayOfWeek: 1,
        },
        inAppRepositoryBuilder,
      );

      // Then update just the dayOfWeek
      const result = await editHabitService(
        habitListMock[0].id,
        {
          dayOfWeek: 5, // Friday
        },
        inAppRepositoryBuilder,
      );

      expect(result.dayOfWeek).toBe(5);
      expect(result.frequency).toBe("weekly");
    });

    it("should allow editing dayOfMonth for existing monthly habit", async () => {
      // First, create a monthly habit
      await editHabitService(
        habitListMock[0].id,
        {
          frequency: "monthly",
          dayOfMonth: 1,
        },
        inAppRepositoryBuilder,
      );

      // Then update just the dayOfMonth
      const result = await editHabitService(
        habitListMock[0].id,
        {
          dayOfMonth: 15,
        },
        inAppRepositoryBuilder,
      );

      expect(result.dayOfMonth).toBe(15);
      expect(result.frequency).toBe("monthly");
    });

    it("should throw error when trying to set dayOfWeek on daily habit", async () => {
      // First, ensure habit is daily
      await editHabitService(
        habitListMock[0].id,
        {
          frequency: "daily",
        },
        inAppRepositoryBuilder,
      );

      // Then try to set dayOfWeek
      await expect(
        editHabitService(
          habitListMock[0].id,
          {
            dayOfWeek: 3,
          },
          inAppRepositoryBuilder,
        ),
      ).rejects.toThrow(
        new FrequencyValidationError(
          "dayOfWeek can only be set when frequency is weekly",
        ),
      );
    });

    it("should throw error when trying to set dayOfMonth on daily habit", async () => {
      // First, ensure habit is daily
      await editHabitService(
        habitListMock[0].id,
        {
          frequency: "daily",
        },
        inAppRepositoryBuilder,
      );

      // Then try to set dayOfMonth
      await expect(
        editHabitService(
          habitListMock[0].id,
          {
            dayOfMonth: 15,
          },
          inAppRepositoryBuilder,
        ),
      ).rejects.toThrow(
        new FrequencyValidationError(
          "dayOfMonth can only be set when frequency is monthly",
        ),
      );
    });

    it("should validate dayOfWeek range when updating existing weekly habit", async () => {
      // First, create a weekly habit
      await editHabitService(
        habitListMock[0].id,
        {
          frequency: "weekly",
          dayOfWeek: 1,
        },
        inAppRepositoryBuilder,
      );

      // Then try to update with invalid dayOfWeek
      await expect(
        editHabitService(
          habitListMock[0].id,
          {
            dayOfWeek: -1,
          },
          inAppRepositoryBuilder,
        ),
      ).rejects.toThrow(
        new FrequencyValidationError(
          "dayOfWeek must be between 0 (Sunday) and 6 (Saturday)",
        ),
      );
    });

    it("should validate dayOfMonth range when updating existing monthly habit", async () => {
      // First, create a monthly habit
      await editHabitService(
        habitListMock[0].id,
        {
          frequency: "monthly",
          dayOfMonth: 15,
        },
        inAppRepositoryBuilder,
      );

      // Then try to update with invalid dayOfMonth
      await expect(
        editHabitService(
          habitListMock[0].id,
          {
            dayOfMonth: 32,
          },
          inAppRepositoryBuilder,
        ),
      ).rejects.toThrow(
        new FrequencyValidationError("dayOfMonth must be between 1 and 31"),
      );
    });

    it("should successfully edit complex combination of fields", async () => {
      const updates = {
        title: "Advanced Weekly Habit",
        frequency: "weekly" as const,
        dayOfWeek: 2, // Tuesday
        hours: 14,
        minutes: 30,
        description: "Complete habit with all validations",
        targetDurationInDays: 90,
      };

      const result = await editHabitService(
        habitListMock[0].id,
        updates,
        inAppRepositoryBuilder,
      );

      expect(result.title).toBe(updates.title);
      expect(result.frequency).toBe(updates.frequency);
      expect(result.dayOfWeek).toBe(updates.dayOfWeek);
      expect(result.hours).toBe(updates.hours);
      expect(result.minutes).toBe(updates.minutes);
      expect(result.description).toBe(updates.description);
      expect(result.targetDurationInDays).toBe(updates.targetDurationInDays);
    });
  });
});
