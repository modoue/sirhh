import { IEmploi } from 'app/entities/administration/emploi/emploi.model';

export interface IFamille {
  id?: number;
  version?: number | null;
  code?: string | null;
  libelle?: string | null;
  description?: string | null;
  emplois?: IEmploi[] | null;
}

export class Famille implements IFamille {
  constructor(
    public id?: number,
    public version?: number | null,
    public code?: string | null,
    public libelle?: string | null,
    public description?: string | null,
    public emplois?: IEmploi[] | null
  ) {}
}

export function getFamilleIdentifier(famille: IFamille): number | undefined {
  return famille.id;
}
