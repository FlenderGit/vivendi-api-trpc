import { pilot_db } from "../../datasources/pilot_db.js"

export const pilot_repository = {
  get_cases: async function (id: string, period: { start: string; end: string; }) {
    const [rows] = await pilot_db.execute("SELECT * FROM pilot_data WHERE view = 'cases' AND id = ? AND el3 BETWEEN ? AND ?", [id, period.start, period.end]);
    return rows as { t: string }[];
  }
}
