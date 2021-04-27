import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface IMotifSuppression {
  id?: number;
  version?: number | null;
  codeMotifSuppression?: string | null;
  libelleMotifSuppression?: string | null;
  motifEnPaie?: string | null;
  employes?: IEmploye[] | null;
}

export class MotifSuppression implements IMotifSuppression {
  constructor(
    public id?: number,
    public version?: number | null,
    public codeMotifSuppression?: string | null,
    public libelleMotifSuppression?: string | null,
    public motifEnPaie?: string | null,
    public employes?: IEmploye[] | null
  ) {}
}

export function getMotifSuppressionIdentifier(motifSuppression: IMotifSuppression): number | undefined {
  return motifSuppression.id;
}
