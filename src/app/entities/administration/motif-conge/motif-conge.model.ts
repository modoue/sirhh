import { IConge } from 'app/entities/administration/conge/conge.model';

export interface IMotifConge {
  id?: number;
  code?: number | null;
  libelle?: string | null;
  nombreJour?: number | null;
  conges?: IConge[] | null;
}

export class MotifConge implements IMotifConge {
  constructor(
    public id?: number,
    public code?: number | null,
    public libelle?: string | null,
    public nombreJour?: number | null,
    public conges?: IConge[] | null
  ) {}
}

export function getMotifCongeIdentifier(motifConge: IMotifConge): number | undefined {
  return motifConge.id;
}
