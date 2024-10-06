import { Hono } from "hono";
import { logger } from "hono/logger";

import { expensesRoutes } from "./routes/expenses.ts";

const app = new Hono();

app.use("*", logger());

app.get("/", (context) => {
  return context.text("Hello World!");
});

app.route("/api/v1/expenses", expensesRoutes);

export default app;
