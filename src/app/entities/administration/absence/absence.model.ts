import * as dayjs from 'dayjs'
import { IEmploye } from '../employe/employe.model';
import { IHistoriqueAbsence } from '../historique-absence/historique-absence.model';
import { IMotifAbsence } from '../motif-absence/motif-absence.model';

export interface IAbsence {
  id?: number;
  code?: number | null;
  dateDepart?: dayjs.Dayjs | null;
  dateRetourPrevue?: dayjs.Dayjs | null;
  dateRetourEffective?: dayjs.Dayjs | null;
  justifier?: boolean | null;
  etat?: string | null;
  niveau?: number | null;
  commentaire?: string | null;
  justificatifContentType?: string | null;
  justificatif?: string | null;
  historiqueAbsences?: IHistoriqueAbsence[] | null;
  employe?: IEmploye | null;
  motifAbsence?: IMotifAbsence | null;
}

export class Absence implements IAbsence {
  constructor(
    public id?: number,
    public code?: number | null,
    public dateDepart?: dayjs.Dayjs | null,
    public dateRetourPrevue?: dayjs.Dayjs | null,
    public dateRetourEffective?: dayjs.Dayjs | null,
    public justifier?: boolean | null,
    public etat?: string | null,
    public niveau?: number | null,
    public commentaire?: string | null,
    public justificatifContentType?: string | null,
    public justificatif?: string | null,
    public historiqueAbsences?: IHistoriqueAbsence[] | null,
    public employe?: IEmploye | null,
    public motifAbsence?: IMotifAbsence | null
  ) {
    this.justifier = this.justifier ?? false;
  }
}

export function getAbsenceIdentifier(absence: IAbsence): number | undefined {
  return absence.id;
}
