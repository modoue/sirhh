import { IAttributAgent } from 'app/entities/administration/attribut-agent/attribut-agent.model';

export interface IAttributComplementaire {
  id?: number;
  version?: number | null;
  code?: string | null;
  libelle?: string | null;
  attributAgents?: IAttributAgent[] | null;
}

export class AttributComplementaire implements IAttributComplementaire {
  constructor(
    public id?: number,
    public version?: number | null,
    public code?: string | null,
    public libelle?: string | null,
    public attributAgents?: IAttributAgent[] | null
  ) {}
}

export function getAttributComplementaireIdentifier(attributComplementaire: IAttributComplementaire): number | undefined {
  return attributComplementaire.id;
}
