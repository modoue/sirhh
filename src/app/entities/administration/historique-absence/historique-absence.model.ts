import { IEmploye } from 'app/entities/administration/employe/employe.model';
import { IAbsence } from 'app/entities/administration/absence/absence.model';

export interface IHistoriqueAbsence {
  id?: number;
  commentaire?: string | null;
  niveau?: number | null;
  etat?: string | null;
  employe?: IEmploye | null;
  absence?: IAbsence | null;
}

export class HistoriqueAbsence implements IHistoriqueAbsence {
  constructor(
    public id?: number,
    public commentaire?: string | null,
    public niveau?: number | null,
    public etat?: string | null,
    public employe?: IEmploye | null,
    public absence?: IAbsence | null
  ) {}
}

export function getHistoriqueAbsenceIdentifier(historiqueAbsence: IHistoriqueAbsence): number | undefined {
  return historiqueAbsence.id;
}
