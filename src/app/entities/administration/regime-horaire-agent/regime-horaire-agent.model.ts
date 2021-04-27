import * as dayjs from 'dayjs';
import { IRegimeHoraire } from 'app/entities/administration/regime-horaire/regime-horaire.model';
import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface IRegimeHoraireAgent {
  id?: number;
  version?: number | null;
  dateEffet?: dayjs.Dayjs | null;
  dateFinEffet?: dayjs.Dayjs | null;
  regimeHoraire?: IRegimeHoraire | null;
  employe?: IEmploye | null;
}

export class RegimeHoraireAgent implements IRegimeHoraireAgent {
  constructor(
    public id?: number,
    public version?: number | null,
    public dateEffet?: dayjs.Dayjs | null,
    public dateFinEffet?: dayjs.Dayjs | null,
    public regimeHoraire?: IRegimeHoraire | null,
    public employe?: IEmploye | null
  ) {}
}

export function getRegimeHoraireAgentIdentifier(regimeHoraireAgent: IRegimeHoraireAgent): number | undefined {
  return regimeHoraireAgent.id;
}
