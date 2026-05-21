import z from "zod";

const ViesMatchStatus = z.enum([
  "OK",
  "INVALID",
  "NOT_PROCESSED",
  "TIMEOUT",
  "SERVICE_UNAVAILABLE"
]);

const ViesCountryCode = z.enum([
  "AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "EL", "ES",
  "FI", "FR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT",
  "NL", "PL", "PT", "RO", "SE", "SI", "SK"
]);

export const vies_response_check_vat_number_schema = z.object({
  countryCode: ViesCountryCode,
  vatNumber: z.string().regex(/^[0-9A-Za-z]+$/),
  requestDate: z.iso.datetime(),
  valid: z.boolean(),
  requestIdentifier: z.string().nullable().optional(),

  name: z.string().nullable().optional(),
  address: z.string().nullable().optional(),

  traderName: z.string().nullable().optional(),
  traderStreet: z.string().nullable().optional(),
  traderPostalCode: z.string().nullable().optional(),
  traderCity: z.string().nullable().optional(),
  traderCompanyType: z.string().nullable().optional(),

  traderNameMatch: ViesMatchStatus.optional(),
  traderStreetMatch: ViesMatchStatus.optional(),
  traderPostalCodeMatch: ViesMatchStatus.optional(),
  traderCityMatch: ViesMatchStatus.optional(),
  traderCompanyTypeMatch: ViesMatchStatus.optional()
});

export type ViesResponseCheckVatNumber = z.infer<typeof vies_response_check_vat_number_schema>;

export const vies_input_check_vat_number_schema = z.object({
  country_code: ViesCountryCode,
  vat_number: z.string().regex(/^[0-9A-Za-z]+$/),
})

export type ViesInputCheckVatNumber = z.infer<typeof vies_input_check_vat_number_schema>
