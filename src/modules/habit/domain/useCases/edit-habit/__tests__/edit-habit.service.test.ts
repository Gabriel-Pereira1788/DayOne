import { repositoryService } from "@/shared/services/repository";
import { editHabitService } from "../edit-habit.service";
import { Collection } from "@/infra/repository";
import { habitListMock } from "@/modules/habit/__mocks__/habit-list.mock";
import { HabitDTO } from "../../../habit.model";

beforeEach(() => {
  const habitRepository = repositoryService.collection(Collection.HABITS);
  habitRepository.setMock?.(habitListMock);
});

afterEach(() => {
  const habitRepository = repositoryService.collection(Collection.HABITS);
  habitRepository.setMock?.([]);
});

describe("editHabitService", () => {
  it("should edit habit title", async () => {
    const result = await editHabitService(habitListMock[0].id, {
      title: "John doe Title",
    });

    expect(result.title).toBe("John doe Title");
    expect(result.id).toBe(habitListMock[0].id);
  });

  it("should edit habit description", async () => {
    const newDescription = "Nova descrição para o hábito de exercícios";
    const result = await editHabitService(habitListMock[0].id, {
      description: newDescription,
    });

    expect(result.description).toBe(newDescription);
    expect(result.title).toBe(habitListMock[0].title); // título deve permanecer inalterado
  });

  it("should edit habit targetDurationInDays", async () => {
    const newDuration = 120;
    const result = await editHabitService(habitListMock[2].id, {
      targetDurationInDays: newDuration,
    });

    expect(result.targetDurationInDays).toBe(newDuration);
    expect(result.title).toBe(habitListMock[2].title);
  });

  it("should edit habit icon", async () => {
    const newIcon = "smiley";
    const result = await editHabitService(habitListMock[1].id, {
      icon: newIcon,
    });

    expect(result.icon).toBe(newIcon);
    expect(result.title).toBe(habitListMock[1].title);
  });

  it("should edit multiple properties simultaneously", async () => {
    const updates = {
      title: "Título Atualizado",
      description: "Descrição atualizada com mais detalhes",
      targetDurationInDays: 200,
    };

    const result = await editHabitService(habitListMock[4].id, updates);

    expect(result.title).toBe(updates.title);
    expect(result.description).toBe(updates.description);
    expect(result.targetDurationInDays).toBe(updates.targetDurationInDays);
    expect(result.id).toBe(habitListMock[4].id);
  });

  it("should handle editing with empty partial object", async () => {
    const result = await editHabitService(habitListMock[0].id, {});

    expect(result.id).toBe(habitListMock[0].id);
    expect(result.title).toBe(habitListMock[0].title);
  });

  it("should edit only provided fields and keep others unchanged", async () => {
    const originalHabit = habitListMock[2]; // "Ler livros"
    const result = await editHabitService(originalHabit.id, {
      title: "Ler mais livros",
    });

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
    const result = await editHabitService(habitListMock[1].id, {
      description: "Praticar meditação mindfulness por 15 minutos",
      targetDurationInDays: 60,
    });

    expect(result.description).toBe(
      "Praticar meditação mindfulness por 15 minutos",
    );
    expect(result.targetDurationInDays).toBe(60);
    expect(result.title).toBe(habitListMock[1].title);
  });

  it("should throw error when trying to edit non-existent habit", async () => {
    await expect(
      editHabitService("non-existent-id", { title: "Test" }),
    ).rejects.toThrow();
  });

  it("should edit habit with all possible DTO fields", async () => {
    const completeUpdate: HabitDTO = {
      title: "Hábito Completamente Atualizado",
      description: "Descrição completa e detalhada do novo hábito",
      targetDurationInDays: 365,
    };

    const result = await editHabitService(habitListMock[3].id, completeUpdate);

    expect(result.title).toBe(completeUpdate.title);
    expect(result.description).toBe(completeUpdate.description);
    expect(result.icon).toBe(completeUpdate.icon);
    expect(result.targetDurationInDays).toBe(
      completeUpdate.targetDurationInDays,
    );
  });
});
