import { sirene_db } from "../../datasources/sirene_db.js"
import type { DbEtablissementRow, DbUniteLegal } from "./sirene.schema.js"

export const repository_sirene = {
  get_etablissements_from_sirens: (sirens: Array<string>) => {
    return sirens.map(siren => {
      return sirene_db.prepare<[string], DbEtablissementRow & DbUniteLegal["legal_name"]>
        ('select e.*, u.legal_name from unites_legales u INNER JOIN etablissements e ON u.siren = e.siren where siren = ?').get(siren)
    })
  }
}
