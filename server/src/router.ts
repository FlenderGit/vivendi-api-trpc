import { Agent, run } from "@openai/agents";
import { t } from "./trpc.js";
import { z } from 'zod';
import { embedding_model, gpt4_model } from "./datasources/openai.js";
import { one_pager_router } from "./features/one-pager/one-pager.router.js";
import { base_procedure } from "./middleware.js";
import { currency_router } from "./features/currency/currency.router.js";
import { agent_supplier } from "./agents/supplier.agent.js";


export const app_router = t.router({
  greet: base_procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => `Hello ${input.name}!`),

  embedding: t.procedure.query(() => {
    return embedding_model.embed("Hello!")
  }),
  agent: base_procedure
    .input(z.object({ query: z.string() }))
    .subscription(async function* (opts) {
      const { query } = opts.input;


    const req = await run(agent_supplier, query,{stream: true})
    for await (const event of req) {
      yield event
    }
  }),

  one_pager: one_pager_router,
  currency: currency_router,
})

export type AppRouter = typeof app_router;
