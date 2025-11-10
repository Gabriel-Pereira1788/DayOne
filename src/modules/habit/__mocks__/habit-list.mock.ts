import { Habit } from "../domain/habit.model";

export const habitListMock: Habit[] = [
  {
    id: "1",
    title: "Exercitar-se",
    description: "Fazer pelo menos 30 minutos de exercícios físicos",

    targetDurationInDays: 90,
    startDate: "2024-01-01",
    completed: false,
  },
  {
    id: "2",
    title: "Meditar",
    description: "Praticar meditação mindfulness por 10 minutos",

    startDate: "2024-01-15",
    completed: true,
  },
  {
    id: "3",
    title: "Ler livros",
    description: "Ler pelo menos 20 páginas de um livro",

    targetDurationInDays: 365,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    completed: false,
  },
  {
    id: "4",
    title: "Beber água",
    description: "Consumir pelo menos 2 litros de água por dia",

    startDate: "2024-02-01",
    completed: false,
  },
  {
    id: "5",
    title: "Estudar programação",
    description: "Dedicar tempo para estudar novas tecnologias e conceitos",

    targetDurationInDays: 180,
    startDate: "2024-01-10",
    completed: false,
  },
];
