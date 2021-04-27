import { IEmploye } from 'app/entities/administration/employe/employe.model';
import { IConjoint } from 'app/entities/administration/conjoint/conjoint.model';
import { SEXE } from 'app/entities/enumerations/sexe.model';

export interface ICivilite {
  id?: number;
  sexe?: SEXE | null;
  code?: string;
  libelle?: string;
  employes?: IEmploye[] | null;
  conjoints?: IConjoint[] | null;
}

export class Civilite implements ICivilite {
  constructor(
    public id?: number,
    public sexe?: SEXE | null,
    public code?: string,
    public libelle?: string,
    public employes?: IEmploye[] | null,
    public conjoints?: IConjoint[] | null
  ) {}
}

export function getCiviliteIdentifier(civilite: ICivilite): number | undefined {
  return civilite.id;
}
