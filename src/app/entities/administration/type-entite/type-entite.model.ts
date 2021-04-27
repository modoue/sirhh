import { IDetailsOrganigramme } from 'app/entities/administration/details-organigramme/details-organigramme.model';

export interface ITypeEntite {
  id?: number;
  version?: number | null;
  codeTypeEntite?: string;
  libelleTypeEntite?: string;
  detailsOrganigrammes?: IDetailsOrganigramme[] | null;
}

export class TypeEntite implements ITypeEntite {
  constructor(
    public id?: number,
    public version?: number | null,
    public codeTypeEntite?: string,
    public libelleTypeEntite?: string,
    public detailsOrganigrammes?: IDetailsOrganigramme[] | null
  ) {}
}

export function getTypeEntiteIdentifier(typeEntite: ITypeEntite): number | undefined {
  return typeEntite.id;
}
