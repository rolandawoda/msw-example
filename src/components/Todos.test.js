import { render, screen, waitFor, within } from "@testing-library/react";

import { Todos } from "./Todos";
import { reactQueryWrapper } from "utils/reactQueryWrapper";
import { getTodos } from "api/todo";

const { wrapper, queryCache } = reactQueryWrapper();

jest.mock("api/todo", () => ({
  getTodos: jest.fn(),
}));

afterEach(() => {
  queryCache.clear();
});

afterEach(() => {
  jest.clearAllMocks();
});

test("Renders loading state", () => {
  getTodos.mockImplementationOnce(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  });

  render(<Todos />, { wrapper });
  const loadingText = screen.getByText("loading todo list");
  expect(loadingText).toBeInTheDocument();
});

test("Renders error state when request fails or there is network error", async () => {
  getTodos.mockImplementationOnce(() => {
    return new Promise((resolve, reject) => {
      reject();
    });
  });

  render(<Todos />, { wrapper });
  await waitFor(() =>
    expect(screen.queryByText("loading todo list")).not.toBeInTheDocument()
  );
  expect(
    screen.getByText("an error occurred fetching todo list")
  ).toBeInTheDocument();
});

test("Renders list of todos", async () => {
  getTodos.mockImplementationOnce(() => {
    return Promise.resolve([
      { id: 1, title: "Exercise" },
      { id: 2, title: "Cook" },
    ]);
  });

  render(<Todos />, { wrapper });

  await waitFor(() =>
    expect(screen.queryByText("loading todo list")).not.toBeInTheDocument()
  );

  const list = screen.getByRole("list");
  expect(list).toBeInTheDocument();
  expect(within(list).getAllByRole("listitem")).toHaveLength(2);
});

test("Renders feedback message when user has an empty list of todos", async () => {
  getTodos.mockImplementationOnce(() => {
    return Promise.resolve([]);
  });

  render(<Todos />, { wrapper });

  await waitFor(() =>
    expect(screen.queryByText("loading todo list")).not.toBeInTheDocument()
  );
  expect(
    screen.getByText("You do not have todos created yet")
  ).toBeInTheDocument();
});

// import { server } from "mocks/server";
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());
