import {
  BatchTraceProcessor,
  ConsoleSpanExporter,
  setTraceProcessors,
  type Span,
  type Trace,
  type TracingExporter,
} from "@openai/agents";
import pino from "pino";
import process from "node:process";
import fs from "node:fs";

const streams = pino.multistream([
  { stream: process.stdout, level: "debug" },
  { stream: fs.createWriteStream("./app.log", { flags: "a" }), level: "debug" },
]);

export const logger = pino({
  level: "debug",
  base: { service: "agent-api" },
}, streams);

class PinoTracingExporter implements TracingExporter {
  async export(
    items: (Trace | Span<any>)[],
    signal?: AbortSignal,
  ): Promise<void> {
    for (const item of items) {
      if (item.type === "trace.span") {
        logger.debug({
          type: "span",
          trace_id: item.traceId,
          spanId: item.spanId,
          parentId: item.parentId,
          spanData: item.spanData,
          startedAt: item.startedAt,
          endedAt: item.endedAt,
          error: item.error,
        });
      } else {
        logger.debug(
          {
            type: "trace",
            traceId: item.traceId,
            name: item.name,
            groupId: item.groupId,
            metadata: item.metadata,
          },
          `trace:${item.name}`,
        );
      }
    }
  }
}

setTraceProcessors([
  new BatchTraceProcessor(new PinoTracingExporter()),
]);
