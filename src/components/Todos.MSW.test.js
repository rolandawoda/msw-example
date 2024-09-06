import { render, screen, waitFor, within } from "@testing-library/react";
import { http, delay, HttpResponse } from "msw";

import { Todos } from "./Todos";
import { reactQueryWrapper } from "utils/reactQueryWrapper";
import { server } from "mocks/server";

const { wrapper, queryCache } = reactQueryWrapper();

afterEach(() => {
  queryCache.clear();
});

afterEach(() => {
  jest.clearAllMocks();
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Renders loading state", () => {
  server.use(
    http.get("https://jsonplaceholder.typicode.com/todos", async () => {
      await delay(1000);
      return HttpResponse.json([]);
    })
  );
  render(<Todos />, { wrapper });
  const loadingText = screen.getByText("loading todo list");
  expect(loadingText).toBeInTheDocument();
});

test("Renders error state when request fails or there is network error", async () => {
  server.use(
    http.get("https://jsonplaceholder.typicode.com/todos", async () => {
      return HttpResponse.json([], {
        status: 500,
      });
    })
  );
  render(<Todos />, { wrapper });
  await waitFor(() =>
    expect(screen.queryByText("loading todo list")).not.toBeInTheDocument()
  );
  expect(
    screen.getByText("an error occurred fetching todo list")
  ).toBeInTheDocument();
});

test("Renders list of todos", async () => {
  render(<Todos />, { wrapper });

  await waitFor(() =>
    expect(screen.queryByText("loading todo list")).not.toBeInTheDocument()
  );

  const list = screen.getByRole("list");
  expect(list).toBeInTheDocument();
  expect(within(list).getAllByRole("listitem")).toHaveLength(2);
});

test("Renders feedback message when user has an empty list of todos", async () => {
  server.use(
    http.get("https://jsonplaceholder.typicode.com/todos", () => {
      return HttpResponse.json([]);
    })
  );

  render(<Todos />, { wrapper });

  await waitFor(() =>
    expect(screen.queryByText("loading todo list")).not.toBeInTheDocument()
  );
  expect(
    screen.getByText("You do not have todos created yet")
  ).toBeInTheDocument();
});
