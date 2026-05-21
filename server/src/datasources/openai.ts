import OpenAI from "openai";
import { env } from "../env.js";
import { OpenAIChatCompletionsModel } from "@openai/agents";


const azure_client = new OpenAI({
  baseURL: env.AZURE_OPENAI_ENDPOINT,
  apiKey: env.AZURE_OPENAI_KEY
});

export const gpt4_model = new OpenAIChatCompletionsModel(
  azure_client as any,
  "gpt-4o"
);


class EmbeddingModel {
  constructor(
    private client: OpenAI,
    private deploymentName: string
  ) {}

  async embed(input: string | string[]): Promise<number[][]> {
    const res = await this.client.embeddings.create({
      model: this.deploymentName,
      input,
      encoding_format: "float"
    });
    return res.data.map(d => d.embedding);
  }
}

export const embedding_model = new EmbeddingModel(azure_client, "text-embedding-ada-002");
