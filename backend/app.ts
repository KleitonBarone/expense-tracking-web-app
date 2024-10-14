import { Hono } from "hono";
import { logger } from "hono/logger";

import { expensesRoutes } from "./routes/expenses.ts";
import { serveStatic } from "hono/bun";
import { authRoutes } from "./routes/auth.ts";

const app = new Hono();

app.use("*", logger());

const apiRoutes = app.basePath("/api/v1")
.route("/expenses", expensesRoutes)
.route("/", authRoutes);

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
export type ApiRoutes = typeof apiRoutes;
