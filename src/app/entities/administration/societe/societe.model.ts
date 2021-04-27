import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface ISociete {
  id?: number;
  version?: number | null;
  employes?: IEmploye[] | null;
}

export class Societe implements ISociete {
  constructor(public id?: number, public version?: number | null, public employes?: IEmploye[] | null) {}
}

export function getSocieteIdentifier(societe: ISociete): number | undefined {
  return societe.id;
}
