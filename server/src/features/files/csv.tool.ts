import { RunContext, tool } from "@openai/agents";
import z from "zod";

export interface AppContext {
  generated_files: string[];
  emit_file: (file: string) => void;
}

export const tool_files_csv_generate = tool({
  name: "generate csv",
  description: "generate csv file and add it to the context",
  parameters: z.object({
    filename: z.string().describe("filename, ex: rapport.csv"),
    headers: z.array(z.string()).describe("csv columns"),
    rows: z
      .array(z.array(z.string()))
      .describe("data rows, same as header"),
  }),
  execute: function (
    { filename, headers, rows },
    ctx?: RunContext<AppContext>,
  ) {
    // console.log(headers, rows);
    const escape = (v: string) =>
      v.includes(",") || v.includes('"') ? `"${v.replace(/"/g, '""')}"` : v;

    const lines = [
      headers.map(escape).join(","),
      ...rows.map((row) => row.map(escape).join(",")),
    ];
    const csv_content = lines.join("\n");

    ctx?.context.generated_files.push(csv_content);

    return `File generated with id ` + 1 +
      `(${rows.length} rows, ${headers.length} headers)`;
  },
});
