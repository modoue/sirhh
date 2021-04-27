import { IPosteAgent } from 'app/entities/administration/poste-agent/poste-agent.model';

export interface IAgence {
  id?: number;
  version?: number | null;
  codeAgence?: string | null;
  libelleAgence?: string | null;
  regionAgence?: string | null;
  adresseAgence?: string | null;
  telAgence?: string | null;
  faxAgence?: string | null;
  posteAgents?: IPosteAgent[] | null;
}

export class Agence implements IAgence {
  constructor(
    public id?: number,
    public version?: number | null,
    public codeAgence?: string | null,
    public libelleAgence?: string | null,
    public regionAgence?: string | null,
    public adresseAgence?: string | null,
    public telAgence?: string | null,
    public faxAgence?: string | null,
    public posteAgents?: IPosteAgent[] | null
  ) {}
}

export function getAgenceIdentifier(agence: IAgence): number | undefined {
  return agence.id;
}
