import { base_procedure } from "../../middleware.js";
import * as z from "zod";
import { t } from "../../trpc.js";

export const supplier_router = t.router({
  get_supplier_by_siret: base_procedure.input(z.object({siret: z.string()})).query(() => {

  })
})
