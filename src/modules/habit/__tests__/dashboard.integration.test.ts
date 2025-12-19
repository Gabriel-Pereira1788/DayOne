import { Collection } from "@/infra/repository";

import { fireEvent, renderApp, screen, waitFor } from "@/test/utils";
import { habitListMock } from "../__mocks__/habit-list.mock";
import { inAppRepositoryBuilder } from "@/infra/repository/implementation/inApp/in-app-repository";

beforeEach(() => {
  const habitRepository = inAppRepositoryBuilder.collection(Collection.HABITS);
  habitRepository.setMock?.(habitListMock);
});

afterEach(() => {
  const habitRepository = inAppRepositoryBuilder.collection(Collection.HABITS);
  habitRepository.setMock?.([]);
});

function renderDashboard() {
  renderApp({
    initialUrl: "(app)/dashboard",
    isAuthenticated: true,
  });

  return {
    searchInput: screen.getByPlaceholderText("Search"),
  };
}

describe("<Dashboard />", () => {
  it("should be render dashboard screen correctly", async () => {
    const { searchInput } = renderDashboard();

    expect(searchInput).toBeTruthy();
    await waitFor(() => screen.getByText("Streaks"));
    const habitCards = screen.getAllByTestId("habit-card");
    expect(habitCards).toHaveLength(habitListMock.length);
  });

  it("should be redirect to habit details", async () => {
    renderDashboard();

    //Check if the habit card is visible
    const habitCards = await waitFor(() => screen.getAllByTestId("habit-card"));
    expect(habitCards.length).toBeGreaterThan(0);

    //Check if the habit card is visible
    expect(habitCards[0]).toBeVisible();

    //Press the habit card
    fireEvent.press(habitCards[0]);

    //Check if the habit details screen is visible
    await waitFor(() => screen.getByText(habitListMock[0].title));

    const goBackButton = screen.getByTestId("go-back");
    expect(goBackButton).toBeTruthy();
    fireEvent.press(goBackButton);

    //Check if the dashboard screen is visible
    await waitFor(() => screen.getByText("Streaks"));
  });

  it("should be check habit today", async () => {
    renderDashboard();

    const checkTodayButton = await waitFor(() =>
      screen.getByTestId(`check-today-${habitListMock[0].id}`),
    );

    fireEvent.press(checkTodayButton);

    //Check is ready to streak
    await waitFor(() => screen.getByText("Ready to build your streak?"));

    //Check mark as complete button visible
    const markAsCompleteButton = screen.getByText("Mark as Complete");
    expect(markAsCompleteButton).toBeTruthy();

    // Press mark as complete button
    fireEvent.press(markAsCompleteButton);

    // Check is modal closed
    await waitFor(() => screen.getByText("Streaks"));
  });

  it("should be redirect to create new habit screen", async () => {
    renderDashboard();

    //Check if the new habit button is visible
    const newHabitButtonRedirect = await waitFor(() =>
      screen.getByTestId("button-new-habit"),
    );
    expect(newHabitButtonRedirect).toBeTruthy();

    // Press the new habit button
    fireEvent.press(newHabitButtonRedirect);

    //Check if the create new habit screen is visible
    await waitFor(() => screen.getByText("New Habit"));

    //Check if the close button is visible
    const closeButton = screen.getByTestId("close-button");
    expect(closeButton).toBeTruthy();

    //Press the back button
    fireEvent.press(closeButton);

    //Check if the dashboard screen is visible
    await waitFor(() => screen.getByText("Streaks"));
  });

  it("should be search habits by text", async () => {
    const { searchInput } = renderDashboard();

    //Check if the search bar is visible
    expect(searchInput).toBeTruthy();

    //Type in the search bar
    fireEvent.changeText(searchInput, "Exercitar-se");

    //Check if the search results are visible

    await waitFor(() =>
      expect(screen.getAllByTestId("habit-card").length).toEqual(1),
    );
  });

  describe("Flow: Dashboard Empty View", () => {
    beforeEach(() => {
      const habitRepository = inAppRepositoryBuilder.collection(
        Collection.HABITS,
      );
      habitRepository.setMock?.([]);
    });

    afterEach(() => {
      const habitRepository = inAppRepositoryBuilder.collection(
        Collection.HABITS,
      );
      habitRepository.setMock?.(habitListMock);
    });
    it("should be render empty view and press create button", async () => {
      renderDashboard();

      const emptyViewTitle = await waitFor(() =>
        screen.getByText("No habits here… yet."),
      );
      const createNewHabitButton = screen.getByText("Create");

      expect(createNewHabitButton).toBeTruthy();
      expect(emptyViewTitle).toBeTruthy();

      //Press new habit button and redirect to create habit screen
      fireEvent.press(createNewHabitButton);

      await waitFor(() => screen.getByText("New Habit"));

      //Check if the close button is visible
      const closeButton = screen.getByTestId("close-button");
      expect(closeButton).toBeTruthy();

      //Press the close button
      fireEvent.press(closeButton);

      //Check if the dashboard screen is visible

      await waitFor(() => screen.getByText("No habits here… yet."));
    });
  });
});
