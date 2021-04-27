import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface IPays {
  id?: number;
  version?: number | null;
  code?: string;
  indicatif?: string | null;
  libelle?: string | null;
  libelleNationalite?: string | null;
  employes?: IEmploye[] | null;
}

export class Pays implements IPays {
  constructor(
    public id?: number,
    public version?: number | null,
    public code?: string,
    public indicatif?: string | null,
    public libelle?: string | null,
    public libelleNationalite?: string | null,
    public employes?: IEmploye[] | null
  ) {}
}

export function getPaysIdentifier(pays: IPays): number | undefined {
  return pays.id;
}
