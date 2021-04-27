import * as dayjs from 'dayjs';
import { ISanction } from 'app/entities/administration/sanction/sanction.model';
import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface ISanctionAgent {
  id?: number;
  version?: number | null;
  motifSanction?: string | null;
  dateSanction?: dayjs.Dayjs | null;
  observations?: string | null;
  fileContentType?: string | null;
  file?: string | null;
  nomFile?: string | null;
  typeFile?: string | null;
  sanction?: ISanction | null;
  employe?: IEmploye | null;
}

export class SanctionAgent implements ISanctionAgent {
  constructor(
    public id?: number,
    public version?: number | null,
    public motifSanction?: string | null,
    public dateSanction?: dayjs.Dayjs | null,
    public observations?: string | null,
    public fileContentType?: string | null,
    public file?: string | null,
    public nomFile?: string | null,
    public typeFile?: string | null,
    public sanction?: ISanction | null,
    public employe?: IEmploye | null
  ) {}
}

export function getSanctionAgentIdentifier(sanctionAgent: ISanctionAgent): number | undefined {
  return sanctionAgent.id;
}
