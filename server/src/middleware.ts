import { TRPCError } from "@trpc/server";
import { t } from "./trpc.js";

const loggerMiddleware = t.middleware(async ({ path, type, next, ctx }) => {
  const start = Date.now();
  const result = await next();
  console.log(
    `${type} ${path} — ${
      Date.now() - start
    }ms (${ctx.userAgent} / ${ctx.requestId})`,
  );
  return result;
});

export const base_procedure = t.procedure.use(loggerMiddleware);

export const isAuthed = t.middleware(({ ctx, next }) => {
  const token = ctx.req.headers["authorization"];
  if (token === undefined) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "No token" });
  }
  return next({ ctx: { ...ctx, userId: "user_123" } });
});

export const auth_procedure = base_procedure.use(isAuthed);
