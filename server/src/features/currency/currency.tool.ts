import { tool } from "@openai/agents";
import { fetch_currency_rate } from "./currency.api.js";
import { fetch_currency_rate_schema } from "./currency.schema.js";

export const tool_get_currency_rate = tool({
  name: "currency_rate",
  description: "Get rate between two currency",
  parameters: fetch_currency_rate_schema,
  execute: async (input) => {
    const result = await fetch_currency_rate(input)
    if (result.isErr()) {
      const { code, error } = result.error;
      return `Error: ${code} ${error}`;
    }

    return result.value;
  }
});

/// generate CSV via context agent
