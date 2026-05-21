

export type DbUniteLegal = {
  siren: string;
  legal_name: string;
  category: string;
}

export type DbEtablissementRow = {
  siret: string;
  siren: string;
  zipcode: string;
  municipality: string;
  street_number: number;
  street_type: string;
  street_name: string;
  active: boolean;
  is_headquarters: boolean;
}
