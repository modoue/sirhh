import * as dayjs from 'dayjs';
import { ICivilite } from 'app/entities/administration/civilite/civilite.model';
import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface IConjoint {
  id?: number;
  version?: number | null;
  nomConjoint?: string | null;
  prenomConjoint?: string | null;
  dateNaissance?: dayjs.Dayjs | null;
  observations?: string | null;
  indSalarie?: boolean | null;
  photoContentType?: string | null;
  photo?: string | null;
  typeFile?: string | null;
  numeroSequence?: number | null;
  civilite?: ICivilite | null;
  employe?: IEmploye | null;
}

export class Conjoint implements IConjoint {
  constructor(
    public id?: number,
    public version?: number | null,
    public nomConjoint?: string | null,
    public prenomConjoint?: string | null,
    public dateNaissance?: dayjs.Dayjs | null,
    public observations?: string | null,
    public indSalarie?: boolean | null,
    public photoContentType?: string | null,
    public photo?: string | null,
    public typeFile?: string | null,
    public numeroSequence?: number | null,
    public civilite?: ICivilite | null,
    public employe?: IEmploye | null
  ) {
    this.indSalarie = this.indSalarie ?? false;
  }
}

export function getConjointIdentifier(conjoint: IConjoint): number | undefined {
  return conjoint.id;
}
