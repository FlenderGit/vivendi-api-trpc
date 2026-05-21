import { Agent } from "@openai/agents";
import { gpt4_model } from "../../datasources/openai.js";
import { tool_get_entities_from_sirens, tool_get_entity_from_siren } from "./sirene.tool.js";

// export const mcp_datagouv = new MCPServerStreamableHttp({
//   url: "https://mcp.data.gouv.fr/mcp",
//   name: 'DeepWiki MCP Server',
// });

export const agent_sirene = new Agent({
  name: "Sirene agent",
  // modelSettings: {},
  model: gpt4_model,
  tools: [
    tool_get_entity_from_siren,
    // tool_get_entities_from_sirens
    // webSearchTool({ searchContextSize: "low" })
  ]
  // mcpServers: [ mcp_datagouv ],

})
