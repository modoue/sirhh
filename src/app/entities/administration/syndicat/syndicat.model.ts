import { ICentraleSyndicale } from 'app/entities/administration/centrale-syndicale/centrale-syndicale.model';
import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface ISyndicat {
  id?: number;
  version?: number | null;
  sigle?: string | null;
  intitule?: string | null;
  remarque?: string | null;
  centraleSyndicale?: ICentraleSyndicale | null;
  employes?: IEmploye[] | null;
}

export class Syndicat implements ISyndicat {
  constructor(
    public id?: number,
    public version?: number | null,
    public sigle?: string | null,
    public intitule?: string | null,
    public remarque?: string | null,
    public centraleSyndicale?: ICentraleSyndicale | null,
    public employes?: IEmploye[] | null
  ) {}
}

export function getSyndicatIdentifier(syndicat: ISyndicat): number | undefined {
  return syndicat.id;
}
