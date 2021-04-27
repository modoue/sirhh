import { IDiplome } from 'app/entities/administration/diplome/diplome.model';

export interface INiveau {
  id?: number;
  version?: number | null;
  codeNiveau?: string | null;
  libelleNiveau?: string | null;
  numOrdre?: number | null;
  diplomes?: IDiplome[] | null;
}

export class Niveau implements INiveau {
  constructor(
    public id?: number,
    public version?: number | null,
    public codeNiveau?: string | null,
    public libelleNiveau?: string | null,
    public numOrdre?: number | null,
    public diplomes?: IDiplome[] | null
  ) {}
}

export function getNiveauIdentifier(niveau: INiveau): number | undefined {
  return niveau.id;
}
