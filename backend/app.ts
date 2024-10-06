import { Hono } from "hono";
import { logger } from "hono/logger";

import { expensesRoutes } from "./routes/expenses.ts";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use("*", logger());

app.route("/api/v1/expenses", expensesRoutes);

app.get(
  "*",
  serveStatic({
    root: "../frontend/dist",
  })
);

app.notFound((context) => {
    return context.redirect("/");
});

export default app;
