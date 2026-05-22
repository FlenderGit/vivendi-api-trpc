import { tool } from "@openai/agents";
import z from "zod";
import { Temporal } from "@js-temporal/polyfill";
import { pilot_repository } from "./pilot.repository.ts";

export const tool_pilot_get_previous_cases_from_supplier = tool({
  name: "get previous cases from supplier",
  description: "get all cases between now and 4 months ago",
  parameters: z.object({
    id: z.string(),
    // period: z.string()
  }),
  execute: async function ({ id }) {
    console.log("Tool mysql", id);

    const end = Temporal.Now.plainDateISO();
    const start = end.subtract({ years: 4 });

    const period = {
      start: start.toString(),
      end: end.toString(),
    };

    const cases = await pilot_repository.get_cases(id, period);
    return cases;
  },
});
