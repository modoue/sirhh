import * as dayjs from 'dayjs';
import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface ICongesAnnuels {
  id?: number;
  code?: number | null;
  annee?: dayjs.Dayjs | null;
  nombreJour?: number | null;
  employe?: IEmploye | null;
}

export class CongesAnnuels implements ICongesAnnuels {
  constructor(
    public id?: number,
    public code?: number | null,
    public annee?: dayjs.Dayjs | null,
    public nombreJour?: number | null,
    public employe?: IEmploye | null
  ) {}
}

export function getCongesAnnuelsIdentifier(congesAnnuels: ICongesAnnuels): number | undefined {
  return congesAnnuels.id;
}
