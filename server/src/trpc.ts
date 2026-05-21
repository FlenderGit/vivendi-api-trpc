import { initTRPC } from "@trpc/server";
import type { Context } from "./context.ts";

export const t = initTRPC.context<Context>().create({

});
