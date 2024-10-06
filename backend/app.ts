import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", logger());

app.get("/", (context) => {
  return context.text("Hello World!");
});

export default app;
