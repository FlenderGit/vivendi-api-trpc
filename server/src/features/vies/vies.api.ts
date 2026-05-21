import z from "zod";
import { fetcher } from "../../datasources/web.js";
import { vies_response_check_vat_number_schema, type ViesInputCheckVatNumber } from "./vies.schema.js";

const response_vies_check_vat_schema = z.object({

})

export function fetch_enterprise_from_vat_number({ country_code, vat_number }: ViesInputCheckVatNumber) {
  const url = 'https://ec.europa.eu/taxation_customs/vies/rest-api/check-vat-number';
  // TODO : Validate params
  return fetcher.post_json(url, {
    countryCode: country_code,
    vatNumber: vat_number
  }, vies_response_check_vat_number_schema)
}
