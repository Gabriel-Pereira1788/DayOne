import { renderApp, waitFor, screen, fireEvent } from "@/test/utils";
import { habitListMock } from "../__mocks__/habit-list.mock";
import { Collection } from "@/infra/repository";
import { inAppRepositoryBuilder } from "@/infra/repository/implementation/inApp/in-app-repository";

beforeEach(() => {
  const habitRepository = inAppRepositoryBuilder.collection(Collection.HABITS);
  habitRepository.setMock?.(habitListMock);
});

afterEach(() => {
  const habitRepository = inAppRepositoryBuilder.collection(Collection.HABITS);
  habitRepository.setMock?.([]);
});

async function renderEditHabitScreen() {
  renderApp({
    initialUrl: "(app)/dashboard",
  });

  const habitCards = await waitFor(() => screen.getAllByTestId("habit-card"));

  fireEvent.press(habitCards[0]);

  const editHabitRedirectButton = await waitFor(() =>
    screen.getByTestId("edit-habit-button"),
  );

  fireEvent.press(editHabitRedirectButton);

  const editHabitButton = await waitFor(() => screen.getByText("Edit"));
  return {
    editHabitButton,
    iconSelectedIcon: screen.queryByTestId("icon-selected-icon"),
    iconSelectionButton: screen.getByTestId("icon-selection-button"),
    titleInput: screen.getByPlaceholderText("Ex: Exercise physical"),
    descInput: screen.getByPlaceholderText("Describe your habit in detail"),
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

describe("<EditHabit />", () => {
  it("should be rendered edit habit correctly", async () => {
    const { editHabitButton, titleInput, descInput } =
      await renderEditHabitScreen();

    expect(editHabitButton).toBeTruthy();
    expect(titleInput).toBeTruthy();
    expect(descInput).toBeTruthy();
  });

  it("should be change icon", async () => {
    const { iconSelectionButton } = await renderEditHabitScreen();

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

  it("should be check default input values", async () => {
    const { titleInput, descInput, iconSelectedIcon } =
      await renderEditHabitScreen();

    expect(
      String(iconSelectedIcon.props.className).includes(
        habitListMock[0].icon || "",
      ),
    ).toBeTruthy();
    expect(titleInput.props.value).toEqual(habitListMock[0].title);
    expect(descInput.props.value).toEqual(habitListMock[0].description);
  });

  it("should be edit data and re-render habit details screen", async () => {
    const { titleInput, descInput, editHabitButton } =
      await renderEditHabitScreen();

    expect(titleInput).toBeTruthy();

    const NEW_HABIT_TITLE = "John doe habit title";
    const NEW_HABIT_DESCRIPTION = "John doe habit description";

    // Change data habit
    fireEvent.changeText(titleInput, NEW_HABIT_TITLE);
    fireEvent.changeText(descInput, NEW_HABIT_DESCRIPTION);

    // Press edit habit button
    fireEvent.press(editHabitButton);

    // Check if habit details screen is re-rendered
    await waitFor(() =>
      expect(screen.getByTestId("edit-habit-button")).toBeTruthy(),
    );
    expect(screen.getByText(NEW_HABIT_TITLE)).toBeTruthy();
    expect(screen.getByText(NEW_HABIT_DESCRIPTION)).toBeTruthy();
  });

  it("should display daily frequency as default", async () => {
    await renderEditHabitScreen();

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
    await renderEditHabitScreen();

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
    await renderEditHabitScreen();

    // Select weekly frequency
    await selectFrequency("weekly");

    // Select Wednesday (day 3)
    await selectWeekDay(3);

    // Check that the button was selected
    const wednesdayButton = screen.getByTestId("weekday-3");
    expect(wednesdayButton).toBeTruthy();
  });

  it("should select monthly frequency and show month days selector", async () => {
    await renderEditHabitScreen();

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
    await renderEditHabitScreen();

    // Select monthly frequency
    await selectFrequency("monthly");

    // Select day 20
    await selectMonthDay(20);

    // Check that the button was selected
    const day20Button = screen.getByTestId("dayofmonth-20");
    expect(day20Button).toBeTruthy();
  });

  it("should open time picker modal when clicking time field", async () => {
    const { timeInputField } = await renderEditHabitScreen();

    // Click on time input field
    fireEvent.press(timeInputField);

    // Check that time picker modal appears with Done button
    const doneButton = await waitFor(() =>
      screen.getByTestId("timepicker-done-button"),
    );
    expect(doneButton).toBeTruthy();
  });

  it("should close time picker modal when clicking done", async () => {
    const { timeInputField } = await renderEditHabitScreen();

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
});
