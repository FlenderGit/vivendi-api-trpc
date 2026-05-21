import {
  type FetchCurrencyRate,
  response_currency_rate_schema,
} from "./currency.schema.ts";
import { fetcher } from "../../datasources/web.ts";

export function fetch_currency_rate({ base, quote }: FetchCurrencyRate) {
  const url = `https://api.frankfurter.dev/v2/rate/${base}/${quote}`;
  return fetcher.fetch_json(url, response_currency_rate_schema);
}
