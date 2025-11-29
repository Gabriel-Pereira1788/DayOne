import { Collection } from "@/infra/repository";
import { repositoryService } from "@/shared/services/repository";
import { renderApp, waitFor, screen, fireEvent } from "@/test/utils";
import { habitListMock } from "../__mocks__/habit-list.mock";

beforeEach(() => {
  const habitRepository = repositoryService.collection(Collection.HABITS);
  habitRepository.setMock?.(habitListMock);
});

afterEach(() => {
  const habitRepository = repositoryService.collection(Collection.HABITS);
  habitRepository.setMock?.([]);
});

async function renderNewHabitScreen() {
  renderApp({ initialUrl: "(app)/dashboard" });

  const newHabitButtonRedirect = await waitFor(() =>
    screen.getByTestId("button-new-habit"),
  );

  fireEvent.press(newHabitButtonRedirect);

  const iconSelectionButton = await waitFor(() =>
    screen.getByTestId("icon-selection-button"),
  );

  return {
    iconSelectionButton,
    titleElement: screen.getByText("New Habit"),
    descElement: screen.getByText("Define your goals and start your journey"),
    titleInput: screen.getByPlaceholderText("Ex: Exercise physical"),
    descInput: screen.getByPlaceholderText("Describe your habit in detail"),
    buttonCreate: screen.getByText("Create"),
    timeInputField: screen.getByTestId("time-input-field"),
  };
}

async function selectFrequency(frequency: "daily" | "weekly" | "monthly") {
  const frequencyButton = await waitFor(() =>
    screen.getByTestId(`frequency-option-${frequency}`),
  );
  fireEvent.press(frequencyButton);
}

async function selectWeekDay(dayNumber: number) {
  const weekDayButton = await waitFor(() =>
    screen.getByTestId(`weekday-${dayNumber}`),
  );
  fireEvent.press(weekDayButton);
}

async function selectMonthDay(dayNumber: number) {
  const monthDayButton = await waitFor(() =>
    screen.getByTestId(`dayofmonth-${dayNumber}`),
  );
  fireEvent.press(monthDayButton);
}

describe("<NewHabit />", () => {
  it("should be render new habit screen correctly", async () => {
    const {
      iconSelectionButton,
      buttonCreate,
      descInput,
      titleInput,
      titleElement,
      descElement,
    } = await renderNewHabitScreen();

    expect(buttonCreate).toBeTruthy();
    expect(descInput).toBeTruthy();
    expect(titleInput).toBeTruthy();
    expect(titleElement).toBeTruthy();
    expect(descElement).toBeTruthy();
    expect(iconSelectionButton).toBeTruthy();
  });

  it("should be show input errors", async () => {
    const { buttonCreate, titleInput, descInput } =
      await renderNewHabitScreen();

    // Press create button without filling any fields
    fireEvent.press(buttonCreate);

    // Wait for validation errors to appear
    await waitFor(() => {
      expect(
        screen.getByText("Title must be at least 2 characters long"),
      ).toBeTruthy();
      expect(
        screen.getByText("Description must be at least 2 characters long"),
      ).toBeTruthy();
    });

    // Test invalid title (too short)
    fireEvent.changeText(titleInput, "A");
    await waitFor(() => {
      expect(
        screen.getByText("Title must be at least 2 characters long"),
      ).toBeTruthy();
    });

    // Test invalid description (too short)
    fireEvent.changeText(descInput, "B");
    await waitFor(() => {
      expect(
        screen.getByText("Description must be at least 2 characters long"),
      ).toBeTruthy();
    });
  });

  it("should be change icon", async () => {
    const { iconSelectionButton } = await renderNewHabitScreen();

    // Open icon selection modal
    fireEvent.press(iconSelectionButton);

    // Check icons is rendered
    const selectionItemButtons = await waitFor(() =>
      screen.getAllByTestId("icon-selection-modal"),
    );
    expect(selectionItemButtons.length).toBeGreaterThan(1);

    // Select first icon
    fireEvent.press(selectionItemButtons[0]);

    // Check is modal hided
    expect(
      await waitFor(() => screen.queryByTestId("icon-selection-modal")),
    ).toBeNull();

    // Check selected icon is rendered
    expect(
      await waitFor(() => screen.getByTestId("icon-selected-icon")),
    ).toBeTruthy();
  });

  it("should be create new habit", async () => {
    const { iconSelectionButton, buttonCreate, descInput, titleInput } =
      await renderNewHabitScreen();

    // Select icon
    fireEvent.press(iconSelectionButton);

    const selectionItemButtons = await waitFor(() =>
      screen.getAllByTestId("icon-selection-modal"),
    );
    expect(selectionItemButtons.length).toBeGreaterThan(1);

    fireEvent.press(selectionItemButtons[0]);

    expect(
      await waitFor(() => screen.queryByTestId("icon-selection-modal")),
    ).toBeNull();

    expect(
      await waitFor(() => screen.getByTestId("icon-selected-icon")),
    ).toBeTruthy();

    // Change inputs values
    fireEvent.changeText(titleInput, "New Habit");
    fireEvent.changeText(descInput, "This is a new habit");

    // Press create button
    fireEvent.press(buttonCreate);

    // Should be redirect to habit list screen
    const searchInput = await waitFor(() =>
      screen.getByPlaceholderText("Search"),
    );
    expect(searchInput).toBeTruthy();

    await waitFor(() => {
      expect(screen.getAllByTestId("habit-card").length).toBeGreaterThan(0);
    });

    // Search for a new habit created
    fireEvent.changeText(searchInput, "New Habit");

    await waitFor(() => {
      expect(screen.getAllByTestId("habit-card").length).toEqual(1);
    });

    // Check if render new habit streak and habit card correctly
    expect(screen.getAllByText("New Habit").length).toEqual(2);
  });

  it("should display daily frequency as default", async () => {
    await renderNewHabitScreen();

    // Check that daily frequency option is visible
    const dailyButton = await waitFor(() =>
      screen.getByTestId("frequency-option-daily"),
    );
    expect(dailyButton).toBeTruthy();

    // Check that weekly and monthly options are also visible
    const weeklyButton = screen.getByTestId("frequency-option-weekly");
    const monthlyButton = screen.getByTestId("frequency-option-monthly");
    expect(weeklyButton).toBeTruthy();
    expect(monthlyButton).toBeTruthy();
  });

  it("should select weekly frequency and show week days selector", async () => {
    await renderNewHabitScreen();

    // Select weekly frequency
    await selectFrequency("weekly");

    // Check that week days selector appears
    const mondayButton = await waitFor(() => screen.getByTestId("weekday-1"));
    expect(mondayButton).toBeTruthy();

    // Check multiple days are visible
    const tuesdayButton = screen.getByTestId("weekday-2");
    const fridayButton = screen.getByTestId("weekday-5");
    expect(tuesdayButton).toBeTruthy();
    expect(fridayButton).toBeTruthy();
  });

  it("should select a specific week day", async () => {
    await renderNewHabitScreen();

    // Select weekly frequency
    await selectFrequency("weekly");

    // Select Wednesday (day 3)
    await selectWeekDay(3);

    // Check that the button was selected
    const wednesdayButton = screen.getByTestId("weekday-3");
    expect(wednesdayButton).toBeTruthy();
  });

  it("should select monthly frequency and show month days selector", async () => {
    await renderNewHabitScreen();

    // Select monthly frequency
    await selectFrequency("monthly");

    // Check that month days selector appears
    const day15Button = await waitFor(() =>
      screen.getByTestId("dayofmonth-15"),
    );
    expect(day15Button).toBeTruthy();

    // Check multiple days are visible
    const day1Button = screen.getByTestId("dayofmonth-1");
    const day31Button = screen.getByTestId("dayofmonth-31");
    expect(day1Button).toBeTruthy();
    expect(day31Button).toBeTruthy();
  });

  it("should select a specific month day", async () => {
    await renderNewHabitScreen();

    // Select monthly frequency
    await selectFrequency("monthly");

    // Select day 20
    await selectMonthDay(20);

    // Check that the button was selected
    const day20Button = screen.getByTestId("dayofmonth-20");
    expect(day20Button).toBeTruthy();
  });

  it("should open time picker modal when clicking time field", async () => {
    const { timeInputField } = await renderNewHabitScreen();

    // Click on time input field
    fireEvent.press(timeInputField);

    // Check that time picker modal appears with Done button
    const doneButton = await waitFor(() =>
      screen.getByTestId("timepicker-done-button"),
    );
    expect(doneButton).toBeTruthy();
  });

  it("should close time picker modal when clicking done", async () => {
    const { timeInputField } = await renderNewHabitScreen();

    // Open time picker
    fireEvent.press(timeInputField);

    // Wait for Done button and click it
    await waitFor(() => {
      expect(screen.getByTestId("timepicker-done-button")).toBeTruthy();
    });

    const doneButton = screen.getByTestId("timepicker-done-button");
    fireEvent.press(doneButton);

    // Check that modal is closed (Done button should not be visible)
    await waitFor(() => {
      expect(screen.queryByTestId("timepicker-done-button")).toBeNull();
    });
  });

  it("should create new habit with weekly frequency", async () => {
    const { iconSelectionButton, buttonCreate, descInput, titleInput } =
      await renderNewHabitScreen();

    // Select icon
    fireEvent.press(iconSelectionButton);

    const selectionItemButtons = await waitFor(() =>
      screen.getAllByTestId("icon-selection-modal"),
    );
    fireEvent.press(selectionItemButtons[0]);

    await waitFor(() => screen.queryByTestId("icon-selection-modal")).then(
      (result) => expect(result).toBeNull(),
    );

    // Fill form fields
    fireEvent.changeText(titleInput, "Weekly Habit");
    fireEvent.changeText(descInput, "This is a weekly habit");

    // Select weekly frequency and choose a day
    await selectFrequency("weekly");
    await selectWeekDay(2); // Tuesday

    // Create habit
    fireEvent.press(buttonCreate);

    // Should redirect to habit list screen
    const searchInput = await waitFor(() =>
      screen.getByPlaceholderText("Search"),
    );
    expect(searchInput).toBeTruthy();

    // Verify habit appears in list
    await waitFor(() => {
      expect(screen.getAllByTestId("habit-card").length).toBeGreaterThan(0);
    });

    fireEvent.changeText(searchInput, "Weekly Habit");

    await waitFor(() => {
      expect(screen.getAllByTestId("habit-card").length).toEqual(1);
    });

    expect(screen.getAllByText("Weekly Habit").length).toEqual(2);
  });

  it("should create new habit with monthly frequency", async () => {
    const { iconSelectionButton, buttonCreate, descInput, titleInput } =
      await renderNewHabitScreen();

    // Select icon
    fireEvent.press(iconSelectionButton);

    const selectionItemButtons = await waitFor(() =>
      screen.getAllByTestId("icon-selection-modal"),
    );
    fireEvent.press(selectionItemButtons[0]);

    await waitFor(() => screen.queryByTestId("icon-selection-modal")).then(
      (result) => expect(result).toBeNull(),
    );

    // Fill form fields
    fireEvent.changeText(titleInput, "Monthly Habit");
    fireEvent.changeText(descInput, "This is a monthly habit");

    // Select monthly frequency and choose a day
    await selectFrequency("monthly");
    await selectMonthDay(15); // 15th of the month

    // Create habit
    fireEvent.press(buttonCreate);

    // Should redirect to habit list screen
    const searchInput = await waitFor(() =>
      screen.getByPlaceholderText("Search"),
    );
    expect(searchInput).toBeTruthy();

    // Verify habit appears in list
    await waitFor(() => {
      expect(screen.getAllByTestId("habit-card").length).toBeGreaterThan(0);
    });

    fireEvent.changeText(searchInput, "Monthly Habit");

    await waitFor(() => {
      expect(screen.getAllByTestId("habit-card").length).toEqual(1);
    });

    expect(screen.getAllByText("Monthly Habit").length).toEqual(2);
  });
});
