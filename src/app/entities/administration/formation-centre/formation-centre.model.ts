import { IFormationCatalogue } from 'app/entities/administration/formation-catalogue/formation-catalogue.model';

export interface IFormationCentre {
  id?: number;
  version?: number | null;
  intitule?: string | null;
  adresse?: string | null;
  telBureau?: string | null;
  codePostal?: string | null;
  siteWeb?: string | null;
  email?: string | null;
  filedocumentContentType?: string | null;
  filedocument?: string | null;
  formationCatalogues?: IFormationCatalogue[] | null;
}

export class FormationCentre implements IFormationCentre {
  constructor(
    public id?: number,
    public version?: number | null,
    public intitule?: string | null,
    public adresse?: string | null,
    public telBureau?: string | null,
    public codePostal?: string | null,
    public siteWeb?: string | null,
    public email?: string | null,
    public filedocumentContentType?: string | null,
    public filedocument?: string | null,
    public formationCatalogues?: IFormationCatalogue[] | null
  ) {}
}

export function getFormationCentreIdentifier(formationCentre: IFormationCentre): number | undefined {
  return formationCentre.id;
}
