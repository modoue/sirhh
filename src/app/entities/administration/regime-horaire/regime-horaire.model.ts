import * as dayjs from 'dayjs';
import { IRegimeHoraireAgent } from 'app/entities/administration/regime-horaire-agent/regime-horaire-agent.model';

export interface IRegimeHoraire {
  id?: number;
  version?: number | null;
  codeRegime?: string | null;
  libelleRegime?: string | null;
  heureDebut?: dayjs.Dayjs | null;
  heureFin?: dayjs.Dayjs | null;
  heurePauseDebut?: dayjs.Dayjs | null;
  heurePauseFin?: dayjs.Dayjs | null;
  regimeHoraireAgents?: IRegimeHoraireAgent[] | null;
}

export class RegimeHoraire implements IRegimeHoraire {
  constructor(
    public id?: number,
    public version?: number | null,
    public codeRegime?: string | null,
    public libelleRegime?: string | null,
    public heureDebut?: dayjs.Dayjs | null,
    public heureFin?: dayjs.Dayjs | null,
    public heurePauseDebut?: dayjs.Dayjs | null,
    public heurePauseFin?: dayjs.Dayjs | null,
    public regimeHoraireAgents?: IRegimeHoraireAgent[] | null
  ) {}
}

export function getRegimeHoraireIdentifier(regimeHoraire: IRegimeHoraire): number | undefined {
  return regimeHoraire.id;
}
