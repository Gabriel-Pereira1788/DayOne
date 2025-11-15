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
    durationDaysInput: screen.getByPlaceholderText("30"),
    buttonCreate: screen.getByText("Create"),
  };
}

describe("<NewHabit />", () => {
  it("should be render new habit screen correctly", async () => {
    const {
      iconSelectionButton,
      buttonCreate,
      descInput,
      durationDaysInput,
      titleInput,
      titleElement,
      descElement,
    } = await renderNewHabitScreen();

    expect(buttonCreate).toBeTruthy();
    expect(descInput).toBeTruthy();
    expect(durationDaysInput).toBeTruthy();
    expect(titleInput).toBeTruthy();
    expect(titleElement).toBeTruthy();
    expect(descElement).toBeTruthy();
    expect(iconSelectionButton).toBeTruthy();
  });

  it("should be show input errors", async () => {
    const { buttonCreate, titleInput, descInput, durationDaysInput } =
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

    // Test invalid duration (exceeds 3 characters)
    fireEvent.changeText(durationDaysInput, "1000");
    await waitFor(() => {
      expect(screen.getByText("Target duration limit")).toBeTruthy();
    });
  });

  it("should be change icon", async () => {
    const { iconSelectionButton } = await renderNewHabitScreen();

    //Open icon selection modal
    fireEvent.press(iconSelectionButton);

    // Check icons is rendered
    const selectionItemButtons = await waitFor(() =>
      screen.getAllByTestId("icon-selection-modal"),
    );
    expect(selectionItemButtons.length).toBeGreaterThan(1);

    // Select first icon
    fireEvent.press(selectionItemButtons[0]);

    //Check is modal hided
    expect(
      await waitFor(() => screen.queryByTestId("icon-selection-modal")),
    ).toBeNull();

    // Check selected icon is rendered
    expect(
      await waitFor(() => screen.getByTestId("icon-selected-icon")),
    ).toBeTruthy();
  });

  it("should be create new habit", async () => {
    const {
      iconSelectionButton,
      buttonCreate,

      descInput,
      durationDaysInput,
      titleInput,
    } = await renderNewHabitScreen();

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

    //Change inputs values

    fireEvent.changeText(titleInput, "New Habit");
    fireEvent.changeText(descInput, "This is a new habit");
    fireEvent.changeText(durationDaysInput, "7");

    //Press create button
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

    screen.debug();

    // Check if render new habit streak and habit card correctly
    expect(screen.getAllByText("New Habit").length).toEqual(2);
  });
});
