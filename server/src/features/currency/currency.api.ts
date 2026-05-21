import { response_currency_rate_schema, type FetchCurrencyRate } from "./currency.schema.js";
import { fetcher } from "../../datasources/web.js";

export function fetch_currency_rate({base, quote}: FetchCurrencyRate) {
  const url = `https://api.frankfurter.dev/v2/rate/${base}/${quote}`;
  return fetcher.fetch_json(url, response_currency_rate_schema);
}
