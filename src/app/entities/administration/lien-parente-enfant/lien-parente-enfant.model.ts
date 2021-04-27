import { IEnfant } from 'app/entities/administration/enfant/enfant.model';

export interface ILienParenteEnfant {
  id?: number;
  version?: number | null;
  codeLienParente?: string | null;
  libelleLienParente?: string | null;
  indLienDirect?: boolean | null;
  enfants?: IEnfant[] | null;
}

export class LienParenteEnfant implements ILienParenteEnfant {
  constructor(
    public id?: number,
    public version?: number | null,
    public codeLienParente?: string | null,
    public libelleLienParente?: string | null,
    public indLienDirect?: boolean | null,
    public enfants?: IEnfant[] | null
  ) {
    this.indLienDirect = this.indLienDirect ?? false;
  }
}

export function getLienParenteEnfantIdentifier(lienParenteEnfant: ILienParenteEnfant): number | undefined {
  return lienParenteEnfant.id;
}
