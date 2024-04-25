import { setupServer } from "msw/node";
import { productHandlers } from "@trilon/api/products/handlers";

const handlers = [...productHandlers];

export const mswServer = setupServer(...handlers);
