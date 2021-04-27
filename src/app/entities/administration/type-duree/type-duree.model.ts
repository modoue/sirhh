import { IFormationAgent } from 'app/entities/administration/formation-agent/formation-agent.model';

export interface ITypeDuree {
  id?: number;
  version?: number | null;
  codeTypeDuree?: string | null;
  libelleTypeDuree?: string | null;
  formationAgents?: IFormationAgent[] | null;
}

export class TypeDuree implements ITypeDuree {
  constructor(
    public id?: number,
    public version?: number | null,
    public codeTypeDuree?: string | null,
    public libelleTypeDuree?: string | null,
    public formationAgents?: IFormationAgent[] | null
  ) {}
}

export function getTypeDureeIdentifier(typeDuree: ITypeDuree): number | undefined {
  return typeDuree.id;
}
