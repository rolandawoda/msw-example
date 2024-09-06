import { setupServer } from "msw/node";

import { postHandlers } from "./handlers/posts";

export const server = setupServer(...postHandlers);
