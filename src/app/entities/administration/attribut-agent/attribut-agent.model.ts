import { IAttributComplementaire } from 'app/entities/administration/attribut-complementaire/attribut-complementaire.model';
import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface IAttributAgent {
  id?: number;
  version?: number | null;
  valeur?: string | null;
  deleted?: boolean | null;
  attributComplementaire?: IAttributComplementaire | null;
  employe?: IEmploye | null;
}

export class AttributAgent implements IAttributAgent {
  constructor(
    public id?: number,
    public version?: number | null,
    public valeur?: string | null,
    public deleted?: boolean | null,
    public attributComplementaire?: IAttributComplementaire | null,
    public employe?: IEmploye | null
  ) {
    this.deleted = this.deleted ?? false;
  }
}

export function getAttributAgentIdentifier(attributAgent: IAttributAgent): number | undefined {
  return attributAgent.id;
}
