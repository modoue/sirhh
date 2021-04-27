import * as dayjs from 'dayjs';
import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface IGradeAgent {
  id?: number;
  version?: number | null;
  libelleDocument?: string | null;
  dataContentType?: string | null;
  data?: string | null;
  docType?: string | null;
  extension?: string | null;
  dateObtentionGrade?: dayjs.Dayjs | null;
  dateFinGrade?: dayjs.Dayjs | null;
  motif?: string | null;
  obervations?: string | null;
  employe?: IEmploye | null;
}

export class GradeAgent implements IGradeAgent {
  constructor(
    public id?: number,
    public version?: number | null,
    public libelleDocument?: string | null,
    public dataContentType?: string | null,
    public data?: string | null,
    public docType?: string | null,
    public extension?: string | null,
    public dateObtentionGrade?: dayjs.Dayjs | null,
    public dateFinGrade?: dayjs.Dayjs | null,
    public motif?: string | null,
    public obervations?: string | null,
    public employe?: IEmploye | null
  ) {}
}

export function getGradeAgentIdentifier(gradeAgent: IGradeAgent): number | undefined {
  return gradeAgent.id;
}
