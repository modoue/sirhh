import { IEmploye } from 'app/entities/administration/employe/employe.model';
import { IConge } from 'app/entities/administration/conge/conge.model';

export interface IHistoriqueConge {
  id?: number;
  commentaire?: string | null;
  niveau?: number | null;
  etat?: string | null;
  employe?: IEmploye | null;
  conge?: IConge | null;
}

export class HistoriqueConge implements IHistoriqueConge {
  constructor(
    public id?: number,
    public commentaire?: string | null,
    public niveau?: number | null,
    public etat?: string | null,
    public employe?: IEmploye | null,
    public conge?: IConge | null
  ) {}
}

export function getHistoriqueCongeIdentifier(historiqueConge: IHistoriqueConge): number | undefined {
  return historiqueConge.id;
}
