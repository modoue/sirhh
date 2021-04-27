import { IAbsence } from 'app/entities/administration/absence/absence.model';

export interface IMotifAbsence {
  id?: number;
  code?: number | null;
  libelle?: string | null;
  nombreJour?: number | null;
  deduire?: boolean | null;
  absences?: IAbsence[] | null;
}

export class MotifAbsence implements IMotifAbsence {
  constructor(
    public id?: number,
    public code?: number | null,
    public libelle?: string | null,
    public nombreJour?: number | null,
    public deduire?: boolean | null,
    public absences?: IAbsence[] | null
  ) {
    this.deduire = this.deduire ?? false;
  }
}

export function getMotifAbsenceIdentifier(motifAbsence: IMotifAbsence): number | undefined {
  return motifAbsence.id;
}
