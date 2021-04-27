import * as dayjs from 'dayjs';
import { IConventionCollective } from 'app/entities/administration/convention-collective/convention-collective.model';

export interface IGrade {
  id?: number;
  societe?: dayjs.Dayjs | null;
  version?: number | null;
  codeGrade?: string | null;
  libelleGrade?: string | null;
  typeCotisation?: string | null;
  ageRetraite?: number | null;
  conventionCollective?: IConventionCollective | null;
}

export class Grade implements IGrade {
  constructor(
    public id?: number,
    public societe?: dayjs.Dayjs | null,
    public version?: number | null,
    public codeGrade?: string | null,
    public libelleGrade?: string | null,
    public typeCotisation?: string | null,
    public ageRetraite?: number | null,
    public conventionCollective?: IConventionCollective | null
  ) {}
}

export function getGradeIdentifier(grade: IGrade): number | undefined {
  return grade.id;
}
