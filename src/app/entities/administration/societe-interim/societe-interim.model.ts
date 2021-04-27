import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface ISocieteInterim {
  id?: number;
  version?: number | null;
  codeSocieteInterim?: string;
  libelleSocieteInterim?: string | null;
  adr1?: string | null;
  adr2?: string | null;
  tel1?: string | null;
  tel2?: string | null;
  fax?: string | null;
  email?: string | null;
  contact?: string | null;
  emailContact?: string | null;
  employes?: IEmploye[] | null;
}

export class SocieteInterim implements ISocieteInterim {
  constructor(
    public id?: number,
    public version?: number | null,
    public codeSocieteInterim?: string,
    public libelleSocieteInterim?: string | null,
    public adr1?: string | null,
    public adr2?: string | null,
    public tel1?: string | null,
    public tel2?: string | null,
    public fax?: string | null,
    public email?: string | null,
    public contact?: string | null,
    public emailContact?: string | null,
    public employes?: IEmploye[] | null
  ) {}
}

export function getSocieteInterimIdentifier(societeInterim: ISocieteInterim): number | undefined {
  return societeInterim.id;
}
