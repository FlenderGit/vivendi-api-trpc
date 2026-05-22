import { Agent } from "@openai/agents";
import { gpt4_model } from "../datasources/openai.ts";
import { tool_pilot_get_previous_cases_from_supplier } from "../features/pilot/pilot.tool.ts";
import z from "zod";
import {
  type AppContext,
  tool_files_csv_generate,
} from "../features/files/csv.tool.ts";
import { tool_google_rss_search } from "../features/google/rss.tool.ts";

const output_schema = z.object({
  cases: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    entity: z.string(),
    buyer: z.string(),
    dates: z.object({
      start: z.iso.date(),
      end: z.iso.date(),
    }),
  })),
  actualities: z.array(z.object({
    title: z.string(),
    content: z.string(),
    // link: z.url(),
    link: z.string().optional(),
  })).max(6),
});

export const agent_supplier = new Agent<AppContext, typeof output_schema>({
  name: "Supplier Agent",
  instructions:
    "Don't hallucinate nor create data. If a tool return no data, don't create data. For actualities, return only the most significant one",
  model: gpt4_model,
  tools: [
    // tool_vies_check_vat_number,
    tool_pilot_get_previous_cases_from_supplier,
    // tool_files_csv_generate,
    tool_google_rss_search,
    // webSearchTool({
    //   searchContextSize: "low",
    //   externalWebAccess: true,
    //   userLocation: { country: "france" },
    //   name: "web_search_preview",
    //   filters: { allowedDomains: [] }
    // }),
  ],
  outputType: output_schema,
});
