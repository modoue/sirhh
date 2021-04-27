import { IEmploi } from 'app/entities/administration/emploi/emploi.model';
import { IPosteAgent } from 'app/entities/administration/poste-agent/poste-agent.model';

export interface IPoste {
  id?: number;
  version?: number | null;
  codePoste?: string | null;
  libellePoste?: string | null;
  typePoste?: string | null;
  fichePosteContentType?: string | null;
  fichePoste?: string | null;
  fichePosteTypeFile?: string | null;
  emploi?: IEmploi | null;
  posteAgents?: IPosteAgent[] | null;
}

export class Poste implements IPoste {
  constructor(
    public id?: number,
    public version?: number | null,
    public codePoste?: string | null,
    public libellePoste?: string | null,
    public typePoste?: string | null,
    public fichePosteContentType?: string | null,
    public fichePoste?: string | null,
    public fichePosteTypeFile?: string | null,
    public emploi?: IEmploi | null,
    public posteAgents?: IPosteAgent[] | null
  ) {}
}

export function getPosteIdentifier(poste: IPoste): number | undefined {
  return poste.id;
}
