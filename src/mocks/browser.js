import { setupWorker } from "msw/browser";

import { postHandlers } from "./handlers/posts";

export const worker = setupWorker(...postHandlers);
