import Bun from "bun";

import app from "./app.ts";

const port = process.env.PORT || 3000;

Bun.serve({
  port: port,
  fetch: app.fetch,
});


console.log(`Server started on port ${port} ...`);
