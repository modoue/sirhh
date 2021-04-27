import { IPoste } from 'app/entities/administration/poste/poste.model';
import { IAgence } from 'app/entities/administration/agence/agence.model';
import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface IPosteAgent {
  id?: number;
  version?: number | null;
  raisonsFinOccupation?: string | null;
  observations?: string | null;
  poste?: IPoste | null;
  agence?: IAgence | null;
  employe?: IEmploye | null;
}

export class PosteAgent implements IPosteAgent {
  constructor(
    public id?: number,
    public version?: number | null,
    public raisonsFinOccupation?: string | null,
    public observations?: string | null,
    public poste?: IPoste | null,
    public agence?: IAgence | null,
    public employe?: IEmploye | null
  ) {}
}

export function getPosteAgentIdentifier(posteAgent: IPosteAgent): number | undefined {
  return posteAgent.id;
}
