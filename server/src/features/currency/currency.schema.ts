import z from "zod";

const CURRENCY_CODES = [
  // Majeures
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CHF",
  "CAD",
  "AUD",
  "NZD",
  // Asie
  "CNY",
  "HKD",
  "SGD",
  "KRW",
  "INR",
  "TWD",
  "THB",
  "MYR",
  "IDR",
  "PHP",
  "VND",
  // Europe hors zone euro
  "NOK",
  "SEK",
  "DKK",
  "PLN",
  "CZK",
  "HUF",
  "RON",
  "BGN",
  "HRK",
  "RSD",
  // Amériques
  "BRL",
  "MXN",
  "ARS",
  "CLP",
  "COP",
  "PEN",
  // Moyen-Orient / Afrique
  "AED",
  "SAR",
  "QAR",
  "KWD",
  "BHD",
  "OMR",
  "ILS",
  "TRY",
  "ZAR",
  "EGP",
  "MAD",
  "NGN",
  "KES",
  // Autres
  "RUB",
  "UAH",
  "PKR",
  "BDT",
] as const;

export const currency_code_schema = z.enum(CURRENCY_CODES, {
  error: "Invalid devise code (ISO 4217)",
});

export const fetch_currency_rate_schema = z.object({
  base: currency_code_schema,
  quote: currency_code_schema,
});
export type FetchCurrencyRate = z.infer<typeof fetch_currency_rate_schema>;

export const response_currency_rate_schema = fetch_currency_rate_schema.extend({
  rate: z.float32(),
  date: z.iso.date(),
});
