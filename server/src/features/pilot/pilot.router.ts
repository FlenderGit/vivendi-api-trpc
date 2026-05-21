import z from "zod";
import { base_procedure } from "../../middleware.ts";
import { t } from "../../trpc.ts";
import { pilot_repository } from "./pilot.repository.ts";

export const pilot_router = t.router({
  get_previous_cases: base_procedure.input(
    z.object({ id: z.string() }),
  ).query(async ({ input }) => {
    const cases = await pilot_repository.get_cases(input.id, {
      start: "2022-02-20",
      end: "2026-05-20",
    });
    return cases;
  }),
});
