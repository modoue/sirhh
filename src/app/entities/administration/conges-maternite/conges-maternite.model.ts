import * as dayjs from 'dayjs';
import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface ICongesMaternite {
  id?: number;
  code?: number | null;
  nombreJour?: number | null;
  annee?: dayjs.Dayjs | null;
  dateDepart?: dayjs.Dayjs | null;
  dateRetour?: dayjs.Dayjs | null;
  employe?: IEmploye | null;
}

export class CongesMaternite implements ICongesMaternite {
  constructor(
    public id?: number,
    public code?: number | null,
    public nombreJour?: number | null,
    public annee?: dayjs.Dayjs | null,
    public dateDepart?: dayjs.Dayjs | null,
    public dateRetour?: dayjs.Dayjs | null,
    public employe?: IEmploye | null
  ) {}
}

export function getCongesMaterniteIdentifier(congesMaternite: ICongesMaternite): number | undefined {
  return congesMaternite.id;
}
