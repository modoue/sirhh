import { IFormationCentre } from 'app/entities/administration/formation-centre/formation-centre.model';
import { IFormation } from 'app/entities/administration/formation/formation.model';

export interface IFormationCatalogue {
  id?: number;
  version?: number | null;
  lieuFormationCatalogue?: string | null;
  totalCoutEstime?: number | null;
  intituleDiplome?: string | null;
  isDiplomante?: boolean | null;
  codeFormationCatalogue?: string | null;
  description?: string | null;
  dureeFormation?: number | null;
  formationCentre?: IFormationCentre | null;
  formations?: IFormation[] | null;
}

export class FormationCatalogue implements IFormationCatalogue {
  constructor(
    public id?: number,
    public version?: number | null,
    public lieuFormationCatalogue?: string | null,
    public totalCoutEstime?: number | null,
    public intituleDiplome?: string | null,
    public isDiplomante?: boolean | null,
    public codeFormationCatalogue?: string | null,
    public description?: string | null,
    public dureeFormation?: number | null,
    public formationCentre?: IFormationCentre | null,
    public formations?: IFormation[] | null
  ) {
    this.isDiplomante = this.isDiplomante ?? false;
  }
}

export function getFormationCatalogueIdentifier(formationCatalogue: IFormationCatalogue): number | undefined {
  return formationCatalogue.id;
}
