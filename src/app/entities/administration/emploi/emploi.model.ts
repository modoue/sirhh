import { IFamille } from 'app/entities/administration/famille/famille.model';
import { IPoste } from 'app/entities/administration/poste/poste.model';

export interface IEmploi {
  id?: number;
  version?: number | null;
  code?: string | null;
  libelle?: string | null;
  description?: string | null;
  famille?: IFamille | null;
  postes?: IPoste[] | null;
}

export class Emploi implements IEmploi {
  constructor(
    public id?: number,
    public version?: number | null,
    public code?: string | null,
    public libelle?: string | null,
    public description?: string | null,
    public famille?: IFamille | null,
    public postes?: IPoste[] | null
  ) {}
}

export function getEmploiIdentifier(emploi: IEmploi): number | undefined {
  return emploi.id;
}
