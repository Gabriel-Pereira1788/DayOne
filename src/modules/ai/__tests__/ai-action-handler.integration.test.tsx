import { Collection } from "@/infra/repository";
import { inAppRepositoryBuilder } from "@/infra/repository/implementation/inApp/in-app-repository";
import { habitListMock } from "@/modules/habit/__mocks__/habit-list.mock";
import { fireEvent, renderApp, screen, waitFor } from "@/test/utils";
import { DEFAULT_AI_MESSAGE } from "../constants/default";

beforeEach(() => {
  const habitRepository = inAppRepositoryBuilder.collection(Collection.HABITS);
  habitRepository.setMock?.(habitListMock);
});

afterEach(() => {
  const habitRepository = inAppRepositoryBuilder.collection(Collection.HABITS);
  habitRepository.setMock?.([]);
});

async function render() {
  renderApp({ initialUrl: "(app)/dashboard" });

  const aiButtonRedirect = await waitFor(() => screen.getByTestId("button-ai"));

  fireEvent.press(aiButtonRedirect);
  const progressBar = await waitFor(() => screen.getByTestId("progress-bar"));

  const sendInput = await waitFor(() =>
    screen.getByPlaceholderText("Type something"),
  );

  const sendButton = screen.getByTestId("send-button");
  const aiMessageTextElement = screen.getByText(DEFAULT_AI_MESSAGE.content);

  return {
    sendInput,
    sendButton,
    aiMessageTextElement,
  };
}

describe("<AIActionHandler />", () => {
  it("should be render correctly", async () => {
    const { sendInput, aiMessageTextElement, sendButton } = await render();
    screen.debug();

    expect(sendInput).toBeTruthy();
    expect(sendButton).toBeTruthy();
    expect(aiMessageTextElement).toBeTruthy();
  }, 10000);

  it("should be trigger get habits tool correctly", async () => {
    const { sendInput, sendButton } = await render();

    fireEvent.changeText(sendInput, "ok, get my habits");
    fireEvent.press(sendButton);

    //Show typing indicator
    expect(screen.getByTestId("chat-typing-indicator")).toBeTruthy();

    //Get habits rendered
    const habitCardsRendered = await waitFor(() =>
      screen.getAllByTestId("ai-habit-card"),
    );
    expect(habitCardsRendered.length).toBeGreaterThan(0);
  });

  it("should be trigger search habits tool correctly", async () => {
    const { sendInput, sendButton } = await render();

    fireEvent.changeText(sendInput, "search a habit with title Ler livros");
    fireEvent.press(sendButton);

    //Show typing indicator
    expect(screen.getByTestId("chat-typing-indicator")).toBeTruthy();

    //Check if command label is render correctly
    const commandMessageElement = await waitFor(() =>
      screen.getByText("Found 1 habits matching your search:"),
    );

    expect(commandMessageElement).toBeTruthy();

    //Check habit rendered correctly
    const aiHabitCardsRendered = await waitFor(() =>
      screen.getAllByTestId("ai-habit-card"),
    );
    expect(aiHabitCardsRendered.length).toEqual(1);
  });
});
