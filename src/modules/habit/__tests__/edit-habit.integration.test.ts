import { repositoryService } from "@/shared/services/repository";
import { renderApp, waitFor, screen, fireEvent } from "@/test/utils";
import { habitListMock } from "../__mocks__/habit-list.mock";
import { Collection } from "@/infra/repository";

beforeEach(() => {
  const habitRepository = repositoryService.collection(Collection.HABITS);
  habitRepository.setMock?.(habitListMock);
});

afterEach(() => {
  const habitRepository = repositoryService.collection(Collection.HABITS);
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
    titleInput: screen.getByPlaceholderText("Ex: Exercise physical"),
    descInput: screen.getByPlaceholderText("Describe your habit in detail"),
    durationDaysInput: screen.getByPlaceholderText("30"),
  };
}

describe("<EditHabit />", () => {
  it("should be rendered edit habit correctly", async () => {
    const { editHabitButton, titleInput, descInput, durationDaysInput } =
      await renderEditHabitScreen();

    expect(editHabitButton).toBeTruthy();
    expect(titleInput).toBeTruthy();
    expect(descInput).toBeTruthy();
    expect(durationDaysInput).toBeTruthy();
  });

  it("should be check default input values", async () => {
    const { titleInput, descInput, durationDaysInput } =
      await renderEditHabitScreen();

    expect(titleInput.props.value).toEqual(habitListMock[0].title);
    expect(descInput.props.value).toEqual(habitListMock[0].description);
    if (habitListMock[0].targetDurationInDays) {
      expect(durationDaysInput.props.value).toEqual(
        habitListMock[0].targetDurationInDays.toString(),
      );
    }
  });

  it("should be edit data and re-render habit details screen", async () => {
    const { titleInput, descInput, durationDaysInput, editHabitButton } =
      await renderEditHabitScreen();

    expect(titleInput).toBeTruthy();

    const NEW_HABIT_TITLE = "John doe habit title";
    const NEW_HABIT_DESCRIPTION = "John doe habit description";
    const NEW_HABIT_DURATION = 60;

    // Change data habit
    fireEvent.changeText(titleInput, NEW_HABIT_TITLE);
    fireEvent.changeText(descInput, NEW_HABIT_DESCRIPTION);
    fireEvent.changeText(durationDaysInput, NEW_HABIT_DURATION.toString());

    // Press edit habit button
    fireEvent.press(editHabitButton);

    // Check if habit details screen is re-rendered
    await waitFor(() =>
      expect(screen.getByTestId("edit-habit-button")).toBeTruthy(),
    );
    expect(screen.getByText(NEW_HABIT_TITLE)).toBeTruthy();
    expect(screen.getByText(NEW_HABIT_DESCRIPTION)).toBeTruthy();
  });

  it("should be edit data and re-render habit list screen", async () => {
    const { titleInput, descInput, durationDaysInput, editHabitButton } =
      await renderEditHabitScreen();

    expect(titleInput).toBeTruthy();

    const NEW_HABIT_TITLE = "John doe habit title";
    const NEW_HABIT_DESCRIPTION = "John doe habit description";
    const NEW_HABIT_DURATION = 60;

    // Change data habit
    fireEvent.changeText(titleInput, NEW_HABIT_TITLE);
    fireEvent.changeText(descInput, NEW_HABIT_DESCRIPTION);
    fireEvent.changeText(durationDaysInput, NEW_HABIT_DURATION.toString());

    // Press edit habit button
    fireEvent.press(editHabitButton);
    await waitFor(() =>
      expect(screen.getByTestId("edit-habit-button")).toBeTruthy(),
    );

    // go back to habit list screen
    const goBackButton = screen.getByTestId("go-back");

    fireEvent.press(goBackButton);

    // Check if render habit list screen

    const habitCards = await waitFor(() => screen.getAllByTestId("habit-card"));
    expect(habitCards.length).toEqual(habitListMock.length);

    // Search new habit data information

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.changeText(searchInput, NEW_HABIT_TITLE);

    // Check if render one habit card
    await waitFor(() =>
      expect(screen.getAllByTestId("habit-card").length).toEqual(1),
    );

    // Check if render habit title on card and streak
    expect(screen.getAllByText(NEW_HABIT_TITLE).length).toEqual(2);
  });
});
