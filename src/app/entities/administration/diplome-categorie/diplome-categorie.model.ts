import { IDiplome } from 'app/entities/administration/diplome/diplome.model';

export interface IDiplomeCategorie {
  id?: number;
  version?: number | null;
  code?: string | null;
  libelle?: string | null;
  remarques?: string | null;
  diplomes?: IDiplome[] | null;
}

export class DiplomeCategorie implements IDiplomeCategorie {
  constructor(
    public id?: number,
    public version?: number | null,
    public code?: string | null,
    public libelle?: string | null,
    public remarques?: string | null,
    public diplomes?: IDiplome[] | null
  ) {}
}

export function getDiplomeCategorieIdentifier(diplomeCategorie: IDiplomeCategorie): number | undefined {
  return diplomeCategorie.id;
}
