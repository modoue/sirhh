import * as dayjs from 'dayjs';
import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface IDistinctionAgent {
  id?: number;
  version?: number | null;
  distinction?: string | null;
  dateDistinction?: dayjs.Dayjs | null;
  motifDistinction?: string | null;
  observations?: string | null;
  fileContentType?: string | null;
  file?: string | null;
  nomFile?: string | null;
  typeFile?: string | null;
  employe?: IEmploye | null;
}

export class DistinctionAgent implements IDistinctionAgent {
  constructor(
    public id?: number,
    public version?: number | null,
    public distinction?: string | null,
    public dateDistinction?: dayjs.Dayjs | null,
    public motifDistinction?: string | null,
    public observations?: string | null,
    public fileContentType?: string | null,
    public file?: string | null,
    public nomFile?: string | null,
    public typeFile?: string | null,
    public employe?: IEmploye | null
  ) {}
}

export function getDistinctionAgentIdentifier(distinctionAgent: IDistinctionAgent): number | undefined {
  return distinctionAgent.id;
}
