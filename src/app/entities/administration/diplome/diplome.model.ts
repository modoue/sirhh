import { IDiplomeCategorie } from 'app/entities/administration/diplome-categorie/diplome-categorie.model';
import { INiveau } from 'app/entities/administration/niveau/niveau.model';
import { IDiplomeAgent } from 'app/entities/administration/diplome-agent/diplome-agent.model';

export interface IDiplome {
  id?: number;
  version?: number | null;
  codeDiplome?: string | null;
  libelleDiplome?: string | null;
  remarques?: string | null;
  diplomeCategorie?: IDiplomeCategorie | null;
  niveau?: INiveau | null;
  diplomeAgents?: IDiplomeAgent[] | null;
}

export class Diplome implements IDiplome {
  constructor(
    public id?: number,
    public version?: number | null,
    public codeDiplome?: string | null,
    public libelleDiplome?: string | null,
    public remarques?: string | null,
    public diplomeCategorie?: IDiplomeCategorie | null,
    public niveau?: INiveau | null,
    public diplomeAgents?: IDiplomeAgent[] | null
  ) {}
}

export function getDiplomeIdentifier(diplome: IDiplome): number | undefined {
  return diplome.id;
}
