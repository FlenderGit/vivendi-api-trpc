import { pilot_db } from "../../datasources/pilot_db.ts";

export const pilot_repository = {
  get_cases: async function (
    id: string,
    period: { start: string; end: string },
  ) {
    const [rows] = await pilot_db.execute(
      "SELECT el13, el14, el20, el21 FROM perf_data WHERE view = 'cases' AND el16 = ? AND el20 >= ? AND el21 < ? ORDER BY el21 desc LIMIT 10",
      [id, period.start, period.end],
    );

    console.log(id, period);

    return rows as {
      title: string;
      description: string;
      start: string;
      end: string;
    }[];
  },
};
