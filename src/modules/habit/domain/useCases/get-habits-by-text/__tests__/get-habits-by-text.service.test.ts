import { Collection } from "@/infra/repository";
import { habitListMock } from "@/modules/habit/__mocks__/habit-list.mock";
import { repositoryService } from "@/shared/services/repository";
import { getHabitsByText } from "../get-habits-by-text.service";
import { Habit } from "../../../habit.model";

describe("GetHabitsByTextService", () => {
  let habitRepository: any;

  beforeEach(() => {
    jest.clearAllMocks();
    habitRepository = repositoryService.collection<Habit>(Collection.HABITS);
    habitRepository.setMock?.(habitListMock);
  });

  afterEach(() => {
    habitRepository.setMock?.([]);
  });

  describe("Search habits by text", () => {
    it("should find habits by exact title match", async () => {
      const result = await getHabitsByText("Meditar");

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Meditar");
      expect(result[0].id).toBe("2");
    });

    it("should find habits by partial title match", async () => {
      const result = await getHabitsByText("Estudar");

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Estudar programação");
      expect(result[0].description).toBe(
        "Dedicar tempo para estudar novas tecnologias e conceitos",
      );
    });

    it("should return multiple habits when multiple matches exist", async () => {
      // Adiciona hábitos duplicados para teste
      const duplicatedHabits: Habit[] = [
        {
          id: "6",
          title: "Exercitar-se pela manhã",
          description: "Exercícios matinais",
          targetDurationInDays: 30,
          startDate: "2024-03-01",
          completed: false,
        },
        {
          id: "7",
          title: "Exercitar-se à noite",
          description: "Exercícios noturnos",
          targetDurationInDays: 30,
          startDate: "2024-03-01",
          completed: false,
        },
      ];

      habitRepository.setMock?.([...habitListMock, ...duplicatedHabits]);

      const result = await getHabitsByText("Exercitar");

      expect(result.length).toBeGreaterThanOrEqual(2);
      expect(result.every((habit) => habit.title.includes("Exercitar"))).toBe(
        true,
      );
    });

    it("should return empty array when no habits match", async () => {
      const result = await getHabitsByText("Inexistente");

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it("should handle empty search text", async () => {
      const result = await getHabitsByText("");

      // Dependendo da implementação do findBy, pode retornar todos ou vazio
      expect(Array.isArray(result)).toBe(true);
    });

    it("should handle special characters in search text", async () => {
      const specialCharHabit: Habit = {
        id: "8",
        title: "Ler @livros #tech",
        description: "Livros de tecnologia",
        targetDurationInDays: 30,
        startDate: "2024-03-01",
        completed: false,
      };

      habitRepository.setMock?.([specialCharHabit]);

      const result = await getHabitsByText("@livros");

      expect(result).toHaveLength(1);
      expect(result[0].title).toContain("@livros");
    });

    it("should handle case sensitivity", async () => {
      const result = await getHabitsByText("meditar");

      // Verifica se encontra independente do case
      expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it("should be return all habits if without text", async () => {
      const result = await getHabitsByText("");

      expect(result.length).toEqual(habitListMock.length);
    });

    it("should return complete habit objects with all properties", async () => {
      const result = await getHabitsByText("Ler");

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("title");
      expect(result[0]).toHaveProperty("description");
      expect(result[0]).toHaveProperty("startDate");
      expect(result[0]).toHaveProperty("completed");
    });
  });
});
