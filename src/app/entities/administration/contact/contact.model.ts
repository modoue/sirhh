import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface IContact {
  id?: number;
  version?: number | null;
  nomComplet?: string | null;
  telDomicile?: string | null;
  telProfessionnel?: string | null;
  telCellulaire1?: string | null;
  telCellulaire2?: string | null;
  lien?: string | null;
  email?: string | null;
  employe?: IEmploye | null;
}

export class Contact implements IContact {
  constructor(
    public id?: number,
    public version?: number | null,
    public nomComplet?: string | null,
    public telDomicile?: string | null,
    public telProfessionnel?: string | null,
    public telCellulaire1?: string | null,
    public telCellulaire2?: string | null,
    public lien?: string | null,
    public email?: string | null,
    public employe?: IEmploye | null
  ) {}
}

export function getContactIdentifier(contact: IContact): number | undefined {
  return contact.id;
}
