
import promise from "mysql2/promise"
import { env } from "../env.js"

export const pilot_db = promise.createPool(env.DATABASE_URL)
