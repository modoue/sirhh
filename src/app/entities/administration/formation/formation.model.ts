import { ITypeFormation } from 'app/entities/administration/type-formation/type-formation.model';
import { IFormationCatalogue } from 'app/entities/administration/formation-catalogue/formation-catalogue.model';
import { IFormationAgent } from 'app/entities/administration/formation-agent/formation-agent.model';

export interface IFormation {
  id?: number;
  version?: number | null;
  codeFormation?: string | null;
  libelleFormation?: string | null;
  typeFormation?: ITypeFormation | null;
  formationCatalogue?: IFormationCatalogue | null;
  formationAgents?: IFormationAgent[] | null;
}

export class Formation implements IFormation {
  constructor(
    public id?: number,
    public version?: number | null,
    public codeFormation?: string | null,
    public libelleFormation?: string | null,
    public typeFormation?: ITypeFormation | null,
    public formationCatalogue?: IFormationCatalogue | null,
    public formationAgents?: IFormationAgent[] | null
  ) {}
}

export function getFormationIdentifier(formation: IFormation): number | undefined {
  return formation.id;
}
