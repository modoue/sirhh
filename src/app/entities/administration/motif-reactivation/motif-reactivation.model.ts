import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface IMotifReactivation {
  id?: number;
  version?: number | null;
  codeMotifReactivation?: string | null;
  libelleMotifReactivation?: string | null;
  employes?: IEmploye[] | null;
}

export class MotifReactivation implements IMotifReactivation {
  constructor(
    public id?: number,
    public version?: number | null,
    public codeMotifReactivation?: string | null,
    public libelleMotifReactivation?: string | null,
    public employes?: IEmploye[] | null
  ) {}
}

export function getMotifReactivationIdentifier(motifReactivation: IMotifReactivation): number | undefined {
  return motifReactivation.id;
}
