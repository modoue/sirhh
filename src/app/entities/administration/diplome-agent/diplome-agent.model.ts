import * as dayjs from 'dayjs';
import { IDiplome } from 'app/entities/administration/diplome/diplome.model';
import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface IDiplomeAgent {
  id?: number;
  version?: number | null;
  nomDiplome?: string | null;
  dateObtentionDiplome?: dayjs.Dayjs | null;
  mention?: string | null;
  lieu?: string | null;
  diplome?: IDiplome | null;
  employe?: IEmploye | null;
}

export class DiplomeAgent implements IDiplomeAgent {
  constructor(
    public id?: number,
    public version?: number | null,
    public nomDiplome?: string | null,
    public dateObtentionDiplome?: dayjs.Dayjs | null,
    public mention?: string | null,
    public lieu?: string | null,
    public diplome?: IDiplome | null,
    public employe?: IEmploye | null
  ) {}
}

export function getDiplomeAgentIdentifier(diplomeAgent: IDiplomeAgent): number | undefined {
  return diplomeAgent.id;
}
