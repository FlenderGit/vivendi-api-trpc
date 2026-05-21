import { tool } from "@openai/agents";
import * as z from "zod";
import { repository_sirene } from "./sirene.repository.js";

export const tool_get_entity_from_siren = tool({
  name: "get_entity_from_siren",
  description: "Get entity legal data using siren",
  parameters: z.object({ siren: z.string() }),
  execute: async ({siren}) => {
    const res = await fetch(
      `https://recherche-entreprises.api.gouv.fr/search?q=${siren}`
    );
    return res.json();
  }
});

export const tool_get_entities_from_sirens = tool({
  name: "get_entity_from_multiple_siren",
  description: "Get multiple entity from a array of siren, less data but faster for big sets",
  parameters: z.object({ sirens: z.array(z.string()) }),
  execute: async ({ sirens }) => {
    return repository_sirene.get_etablissements_from_sirens(sirens)
  }
});

/// generate CSV via context agent
