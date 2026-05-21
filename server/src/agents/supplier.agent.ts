import { Agent, webSearchTool } from "@openai/agents";
import { gpt4_model } from "../datasources/openai.js";
import { tool_vies_check_vat_number } from "../features/vies/vies.tools.js";
import { tool_pilot_get_previous_cases_from_supplier } from "../features/pilot/pilot.tool.js";
import z from "zod";

export const agent_supplier = new Agent({
  name: "Supplier Agent",
  model: gpt4_model,
  tools: [
    // tool_vies_check_vat_number,
    tool_pilot_get_previous_cases_from_supplier,
    // webSearchTool({
    //   searchContextSize: "low",
    //   externalWebAccess: true,
    //   userLocation: { country: "france" },
    //   name: "web_search_preview",
    //   filters: { allowedDomains: [] }
    // }),
  ],
  outputType: z.object({
    cases: z.array(z.object({
      id: z.string(),
      entity: z.string(),
      buyer: z.string(),
      dates: z.object({
        start: z.iso.date(),
        end: z.iso.date()
      }),
    })),
    // actualities: z.array(z.object({
    //   title: z.string(),
    //   content: z.string(),
    //   link: z.url()
    // }))
  })
})
