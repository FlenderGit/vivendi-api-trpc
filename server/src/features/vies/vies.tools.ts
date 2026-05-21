import { tool } from "@openai/agents";
import { vies_input_check_vat_number_schema } from "./vies.schema.js";
import { fetch_enterprise_from_vat_number } from "./vies.api.js";

export const tool_vies_check_vat_number = tool({
  name: "check vat number",
  description: "Use VIES API to check if a VAT number is valid, if true, get data",
  parameters: vies_input_check_vat_number_schema,
  execute: async function (params) {
    const result = await fetch_enterprise_from_vat_number(params);
    if (result.isErr()) {
      const { code, error } = result.error;
      return `Error: ${code} ${error}`;
    }

    return result.value;
  }
})
