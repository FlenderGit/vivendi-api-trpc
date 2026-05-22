import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { env } from "./env.ts";
import { app_router } from "./router.ts";
import { createContext } from "./context.ts";
import process from "node:process";
import { logger } from "./logs.ts";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(
  "/trpc",
  createExpressMiddleware({
    router: app_router,
    createContext,
  }),
);

async function start() {
  // await pilot_db.connect();
  // console.log("mcp connected");

  app.listen(env.PORT, console.log);
  logger.debug("tRPC server: http://localhost:" + env.PORT);
}

async function shutdown(signal: string) {
  console.log(`\n${signal} received — closing...`);
  // await pilot_db.close();
  process.exit(0);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

start().catch((err) => {
  console.error("ERROR:", err);
});
