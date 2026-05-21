import { tool } from "@openai/agents";
import z from "zod";
import Parser from "rss-parser";

export const tool_bing_rss_search = tool({
  name: "Bing RSS Search",
  description: "",
  parameters: z.object({
    query: z.string(),
    country: z.string(),
  }),
  async execute({ query, country }) {
    const query_encoded = encodeURIComponent(query);
    const url =
      `https://www.bing.com/news/search?q=${query_encoded}&format=rss`;

    const parser = new Parser();
    const feed = await parser.parseURL(url);
    return feed.items.slice(0, 10).map((it) => ({
      title: it.title,
      date: it.pubDate,
      description: it.description,
    }));
  },
});
