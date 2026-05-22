import { run, type RunStreamEvent } from "@openai/agents";
import { Repeater } from "@repeaterjs/repeater";
import { t } from "./trpc.ts";
import { z } from "zod";
import { embedding_model } from "./datasources/openai.ts";
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

      type AgentStreamEvent =
        | RunStreamEvent
        | { type: "file_generated"; file: string };

      const fileRepeater = new Repeater<AgentStreamEvent>(
        async (push, stop) => {
          const context: AppContext = {
            generated_files: [],
            emit_file: async (file) => {
              context.generated_files.push(file);
              await push({ type: "file_generated", file });
            },
          };

          const req = await run(agent_supplier, query, {
            stream: true,
            context,
          });
          for await (const event of req) {
            await push(event);
          }

          stop();
        },
      );

      for await (const event of fileRepeater) {
        yield event;
      }
    }),

  currency: currency_router,
  pilot: pilot_router,
});

export type AppRouter = typeof app_router;
