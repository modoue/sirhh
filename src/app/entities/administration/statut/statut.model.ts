import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface IStatut {
  id?: number;
  version?: number | null;
  employes?: IEmploye[] | null;
}

export class Statut implements IStatut {
  constructor(public id?: number, public version?: number | null, public employes?: IEmploye[] | null) {}
}

export function getStatutIdentifier(statut: IStatut): number | undefined {
  return statut.id;
}
