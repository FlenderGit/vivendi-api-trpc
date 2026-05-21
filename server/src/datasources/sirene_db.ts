import Database from "better-sqlite3";

import type { Database as DatabaseType } from "better-sqlite3";

export const sirene_db: DatabaseType = new Database('test.db')
