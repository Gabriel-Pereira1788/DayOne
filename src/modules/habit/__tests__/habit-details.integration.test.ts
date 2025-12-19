import { Collection } from "@/infra/repository";

import {
  renderApp,
  waitFor,
  screen,
  fireEvent,
  queryClientMock,
} from "@/test/utils";
import { habitListMock } from "../__mocks__/habit-list.mock";
import { Habit } from "../domain/habit.model";
import { HabitQueryKeys } from "../types";
import { inAppRepositoryBuilder } from "@/infra/repository/implementation/inApp/in-app-repository";

beforeEach(() => {
  const habitRepository = inAppRepositoryBuilder.collection(Collection.HABITS);
  habitRepository.setMock?.(habitListMock);
});

afterEach(() => {
  const habitRepository = inAppRepositoryBuilder.collection(Collection.HABITS);
  habitRepository.setMock?.([]);
});

async function renderHabitDetailsScreen(habitToRender?: Habit) {
  renderApp({
    initialUrl: "(app)/dashboard",
  });

  const habitData = habitToRender || habitListMock[0];
  const habitCards = await waitFor(() => screen.getAllByTestId("habit-card"));

  fireEvent.press(habitCards[0]);

  const editHabitRedirectButton = await waitFor(() =>
    screen.getByTestId("edit-habit-button"),
  );

  const habitTitle = await waitFor(() => screen.getByText(habitData.title));

  const habitDescription = screen.getByText(habitData.description!);
  const habitIcon = screen.getByTestId("habit-icon-element");

  const prevCalendarButton = await waitFor(() =>
    screen.getByTestId("prev-month-button"),
  );
  const nextCalendarButton = await waitFor(() =>
    screen.getByTestId("next-month-button"),
  );
  const deleteHabitButton = screen.getByTestId("delete-habit-button");
  return {
    editHabitRedirectButton,
    habitTitle,
    habitDescription,
    habitIcon,
    prevCalendarButton,
    nextCalendarButton,
    deleteHabitButton,
  };
}

describe("<HabitDetailsScreen />", () => {
  it("should be render screen correctly", async () => {
    const {
      habitTitle,
      habitDescription,
      habitIcon,
      editHabitRedirectButton,
      nextCalendarButton,
      prevCalendarButton,
    } = await renderHabitDetailsScreen();

    expect(habitTitle).toBeTruthy();
    expect(habitDescription).toBeTruthy();
    expect(habitIcon).toBeTruthy();
    expect(editHabitRedirectButton).toBeTruthy();
    expect(nextCalendarButton).toBeTruthy();
    expect(prevCalendarButton).toBeTruthy();
  });

  it("should be redirect to edit habit screen", async () => {
    const { editHabitRedirectButton } = await renderHabitDetailsScreen();
    fireEvent.press(editHabitRedirectButton);

    await waitFor(() =>
      expect(screen.getByPlaceholderText("Ex: Exercise physical")),
    );
  });

  it("should be increase month in calendar", async () => {
    const { nextCalendarButton, prevCalendarButton } =
      await renderHabitDetailsScreen();
    fireEvent.press(nextCalendarButton);
    expect(nextCalendarButton).toBeTruthy();

    const date = new Date();
    const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1);
    const monthName = new Intl.DateTimeFormat("pt-BR", {
      month: "long",
    })
      .format(nextMonthDate)
      .replace(/^\w/, (c) => c.toUpperCase());
    expect(screen.getByText(`${monthName} ${nextMonthDate.getFullYear()}`));
  });

  it("should be decrease month in calendar", async () => {
    const { prevCalendarButton, nextCalendarButton } =
      await renderHabitDetailsScreen();
    fireEvent.press(prevCalendarButton);
    expect(prevCalendarButton).toBeTruthy();
    const date = new Date();
    const prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1);
    const monthName = new Intl.DateTimeFormat("pt-BR", {
      month: "long",
    })
      .format(prevMonthDate)
      .replace(/^\w/, (c) => c.toUpperCase());
    expect(screen.getByText(`${monthName} ${prevMonthDate.getFullYear()}`));
  });
});

describe("Delete Habit", () => {
  it("should be delete habit and re-render habit list", async () => {
    const { deleteHabitButton } = await renderHabitDetailsScreen();
    //Open modal delete
    fireEvent.press(deleteHabitButton);

    //Check if delete modal is opened
    await waitFor(() =>
      expect(screen.getByText("Are you sure you want to delete?")),
    );
    const confirmDeleteButton = screen.getByText("Delete");
    expect(confirmDeleteButton).toBeTruthy();

    // Press confirm delete button
    fireEvent.press(confirmDeleteButton);

    // Check if redirect to habit list screen without habit deleted
    const habitCards = await waitFor(() => screen.getAllByTestId("habit-card"));
    expect(habitCards.length).toEqual(habitListMock.length - 1);

    queryClientMock.setQueryData([HabitQueryKeys.GET_HABITS], habitListMock);
    queryClientMock.invalidateQueries({
      queryKey: [HabitQueryKeys.GET_HABITS],
    });
  });
});
