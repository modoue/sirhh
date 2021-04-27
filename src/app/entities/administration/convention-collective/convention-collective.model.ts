import { IGrade } from 'app/entities/administration/grade/grade.model';
import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface IConventionCollective {
  id?: number;
  version?: number | null;
  codeConvention?: string;
  libelleConvention?: string;
  remarque?: string | null;
  volumeHoraireMensuel?: number | null;
  grades?: IGrade[] | null;
  employes?: IEmploye[] | null;
}

export class ConventionCollective implements IConventionCollective {
  constructor(
    public id?: number,
    public version?: number | null,
    public codeConvention?: string,
    public libelleConvention?: string,
    public remarque?: string | null,
    public volumeHoraireMensuel?: number | null,
    public grades?: IGrade[] | null,
    public employes?: IEmploye[] | null
  ) {}
}

export function getConventionCollectiveIdentifier(conventionCollective: IConventionCollective): number | undefined {
  return conventionCollective.id;
}
