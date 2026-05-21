import { base_procedure } from "../../middleware.js";
import { t } from "../../trpc.js";

export const one_pager_router = t.router({
  generate: base_procedure.query(() => {
    return "jean";
  })
})
