import { IFormation } from 'app/entities/administration/formation/formation.model';

export interface ITypeFormation {
  id?: number;
  version?: number | null;
  codeTypeformation?: string | null;
  libelleTypeformation?: string | null;
  formations?: IFormation[] | null;
}

export class TypeFormation implements ITypeFormation {
  constructor(
    public id?: number,
    public version?: number | null,
    public codeTypeformation?: string | null,
    public libelleTypeformation?: string | null,
    public formations?: IFormation[] | null
  ) {}
}

export function getTypeFormationIdentifier(typeFormation: ITypeFormation): number | undefined {
  return typeFormation.id;
}
