import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface ITypeStage {
  id?: number;
  version?: number | null;
  code?: string;
  libelle?: string;
  employes?: IEmploye[] | null;
}

export class TypeStage implements ITypeStage {
  constructor(
    public id?: number,
    public version?: number | null,
    public code?: string,
    public libelle?: string,
    public employes?: IEmploye[] | null
  ) {}
}

export function getTypeStageIdentifier(typeStage: ITypeStage): number | undefined {
  return typeStage.id;
}
