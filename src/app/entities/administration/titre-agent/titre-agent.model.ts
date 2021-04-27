import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface ITitreAgent {
  id?: number;
  version?: number | null;
  code?: string | null;
  titre?: string | null;
  employes?: IEmploye[] | null;
}

export class TitreAgent implements ITitreAgent {
  constructor(
    public id?: number,
    public version?: number | null,
    public code?: string | null,
    public titre?: string | null,
    public employes?: IEmploye[] | null
  ) {}
}

export function getTitreAgentIdentifier(titreAgent: ITitreAgent): number | undefined {
  return titreAgent.id;
}
