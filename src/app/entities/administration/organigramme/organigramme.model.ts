import * as dayjs from 'dayjs';
import { IDetailsOrganigramme } from 'app/entities/administration/details-organigramme/details-organigramme.model';

export interface IOrganigramme {
  id?: number;
  version?: number | null;
  dateEffet?: dayjs.Dayjs | null;
  dateCloture?: dayjs.Dayjs | null;
  description?: string | null;
  motifCloture?: string | null;
  userCloture?: string | null;
  indActif?: boolean | null;
  dataContentType?: string | null;
  data?: string | null;
  filename?: string | null;
  sizee?: number | null;
  extension?: string | null;
  docType?: string | null;
  detailsOrganigrammes?: IDetailsOrganigramme[] | null;
}

export class Organigramme implements IOrganigramme {
  constructor(
    public id?: number,
    public version?: number | null,
    public dateEffet?: dayjs.Dayjs | null,
    public dateCloture?: dayjs.Dayjs | null,
    public description?: string | null,
    public motifCloture?: string | null,
    public userCloture?: string | null,
    public indActif?: boolean | null,
    public dataContentType?: string | null,
    public data?: string | null,
    public filename?: string | null,
    public sizee?: number | null,
    public extension?: string | null,
    public docType?: string | null,
    public detailsOrganigrammes?: IDetailsOrganigramme[] | null
  ) {
    this.indActif = this.indActif ?? false;
  }
}

export function getOrganigrammeIdentifier(organigramme: IOrganigramme): number | undefined {
  return organigramme.id;
}
