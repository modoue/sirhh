import * as dayjs from 'dayjs';
import { IFormation } from 'app/entities/administration/formation/formation.model';
import { ITypeDuree } from 'app/entities/administration/type-duree/type-duree.model';
import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface IFormationAgent {
  id?: number;
  version?: number | null;
  suivi?: boolean | null;
  remarques?: string | null;
  lieu?: string | null;
  dureeFormation?: string | null;
  montantFormation?: number | null;
  animateur?: string | null;
  dateSuivi?: dayjs.Dayjs | null;
  datePrevu?: dayjs.Dayjs | null;
  formation?: IFormation | null;
  typeDuree?: ITypeDuree | null;
  employe?: IEmploye | null;
}

export class FormationAgent implements IFormationAgent {
  constructor(
    public id?: number,
    public version?: number | null,
    public suivi?: boolean | null,
    public remarques?: string | null,
    public lieu?: string | null,
    public dureeFormation?: string | null,
    public montantFormation?: number | null,
    public animateur?: string | null,
    public dateSuivi?: dayjs.Dayjs | null,
    public datePrevu?: dayjs.Dayjs | null,
    public formation?: IFormation | null,
    public typeDuree?: ITypeDuree | null,
    public employe?: IEmploye | null
  ) {
    this.suivi = this.suivi ?? false;
  }
}

export function getFormationAgentIdentifier(formationAgent: IFormationAgent): number | undefined {
  return formationAgent.id;
}
