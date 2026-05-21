import type { IncomingMessage } from "http";

export const createContext = ({ req }: { req: IncomingMessage }) => ({
  req,
  requestId: crypto.randomUUID(),
  userAgent: req.headers["user-agent"] ?? null,
});
export type Context = Awaited<ReturnType<typeof createContext>>;
