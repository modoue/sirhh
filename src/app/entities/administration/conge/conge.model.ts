import * as dayjs from 'dayjs';
import { IHistoriqueConge } from 'app/entities/administration/historique-conge/historique-conge.model';
import { IEmploye } from 'app/entities/administration/employe/employe.model';
import { IMotifConge } from 'app/entities/administration/motif-conge/motif-conge.model';

export interface IConge {
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
  historiqueConges?: IHistoriqueConge[] | null;
  employe?: IEmploye | null;
  motifConge?: IMotifConge | null;
}

export class Conge implements IConge {
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
    public historiqueConges?: IHistoriqueConge[] | null,
    public employe?: IEmploye | null,
    public motifConge?: IMotifConge | null
  ) {
    this.justifier = this.justifier ?? false;
  }
}

export function getCongeIdentifier(conge: IConge): number | undefined {
  return conge.id;
}
