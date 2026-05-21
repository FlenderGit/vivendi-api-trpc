import { run } from "@openai/agents";
import { t } from "./trpc.ts";
import { z } from "zod";
import { embedding_model } from "./datasources/openai.ts";
import { one_pager_router } from "./features/one-pager/one-pager.router.ts";
import { base_procedure } from "./middleware.ts";
import { currency_router } from "./features/currency/currency.router.ts";
import { agent_supplier } from "./agents/supplier.agent.ts";
import { pilot_router } from "./features/pilot/pilot.router.ts";
import type { AppContext } from "./features/files/csv.tool.ts";

export const app_router = t.router({
  greet: base_procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => `Hello ${input.name}!`),

  embedding: t.procedure.query(() => {
    return embedding_model.embed("Hello!");
  }),
  agent: base_procedure
    .input(z.object({ query: z.string() }))
    .subscription(async function* (opts) {
      const { query } = opts.input;

      const context: AppContext = {
        generated_files: [],
      };

      const req = await run(agent_supplier, query, {
        stream: true,
        context,
      });
      for await (const event of req) {
        yield event;
      }

      console.log(context.generated_files);
    }),

  one_pager: one_pager_router,
  currency: currency_router,
  pilot: pilot_router,
});

export type AppRouter = typeof app_router;
