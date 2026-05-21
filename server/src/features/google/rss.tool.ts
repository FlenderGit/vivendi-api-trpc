import { tool } from "@openai/agents";
import z from "zod";
import Parser from "rss-parser";

export const tool_google_rss_search = tool({
  name: "Google RSS Search",
  description: "",
  parameters: z.object({
    query: z.string(),
    country: z.string(),
  }),
  async execute({ query, country }) {
    const query_encoded = encodeURIComponent(query);
    const country_encoded = encodeURIComponent(country);
    const lang = "en";

    const url =
      `https://news.google.com/rss/search?q=${query}&hl=${lang}&gl=${country}&ceid=${country}:${lang}`;

    // const result = await fetcher.fetch(url);
    // if (result.isErr()) {
    //   const { code, error } = result.error;
    //   return `Error: ${code} ${error}`;
    // }

    const parser = new Parser();
    const feed = await parser.parseURL(url);
    return feed.items.slice(0, 10).map((it) => ({
      title: it.title,
      date: it.pubDate,
      description: it.description,
    }));
  },
});
