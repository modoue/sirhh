import * as dayjs from 'dayjs';
import { ITypeEntite } from 'app/entities/administration/type-entite/type-entite.model';
import { IOrganigramme } from 'app/entities/administration/organigramme/organigramme.model';

export interface IDetailsOrganigramme {
  id?: number;
  version?: number | null;
  codeEntite?: string;
  libelleEntite?: string;
  dateEffet?: dayjs.Dayjs | null;
  dateCloture?: dayjs.Dayjs | null;
  niveau?: number | null;
  codeAgentResponsable?: string | null;
  isDetails?: boolean | null;
  typeHierarchie?: string | null;
  userCloture?: string | null;
  motifCloture?: string | null;
  typeEntite?: ITypeEntite | null;
  organigramme?: IOrganigramme | null;
}

export class DetailsOrganigramme implements IDetailsOrganigramme {
  constructor(
    public id?: number,
    public version?: number | null,
    public codeEntite?: string,
    public libelleEntite?: string,
    public dateEffet?: dayjs.Dayjs | null,
    public dateCloture?: dayjs.Dayjs | null,
    public niveau?: number | null,
    public codeAgentResponsable?: string | null,
    public isDetails?: boolean | null,
    public typeHierarchie?: string | null,
    public userCloture?: string | null,
    public motifCloture?: string | null,
    public typeEntite?: ITypeEntite | null,
    public organigramme?: IOrganigramme | null
  ) {
    this.isDetails = this.isDetails ?? false;
  }
}

export function getDetailsOrganigrammeIdentifier(detailsOrganigramme: IDetailsOrganigramme): number | undefined {
  return detailsOrganigramme.id;
}
