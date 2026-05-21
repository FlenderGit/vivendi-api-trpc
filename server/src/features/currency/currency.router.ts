import { TRPCError } from "@trpc/server";
import { base_procedure } from "../../middleware.js";
import { t } from "../../trpc.js";
import { fetch_currency_rate } from "./currency.api.js";
import { fetch_currency_rate_schema } from "./currency.schema.js";

export const currency_router = t.router({
  get_currency_rate: base_procedure.input(fetch_currency_rate_schema).query(async({ input }) => {
    const result = await fetch_currency_rate(input);
    if (result.isErr()) {
      throw new TRPCError({
        code: "BAD_GATEWAY",
        message: result.error.error.message
      })
    }
    return result.value;
  })
});
