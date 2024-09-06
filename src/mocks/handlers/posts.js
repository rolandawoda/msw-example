import { http, HttpResponse } from "msw";

export const postHandlers = [
  http.get("https://jsonplaceholder.typicode.com/todos", () => {
    return HttpResponse.json([
      { id: 1, title: "totam quia non" },
      { id: 2, title: "sunt cum tempora" },
    ]);
  }),
];
