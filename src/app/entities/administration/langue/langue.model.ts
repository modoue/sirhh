import { ILangueReferentiel } from 'app/entities/administration/langue-referentiel/langue-referentiel.model';
import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface ILangue {
  id?: number;
  version?: number | null;
  parle?: boolean | null;
  ecrit?: boolean | null;
  lecture?: boolean | null;
  langueReferentiel?: ILangueReferentiel | null;
  employe?: IEmploye | null;
}

export class Langue implements ILangue {
  constructor(
    public id?: number,
    public version?: number | null,
    public parle?: boolean | null,
    public ecrit?: boolean | null,
    public lecture?: boolean | null,
    public langueReferentiel?: ILangueReferentiel | null,
    public employe?: IEmploye | null
  ) {
    this.parle = this.parle ?? false;
    this.ecrit = this.ecrit ?? false;
    this.lecture = this.lecture ?? false;
  }
}

export function getLangueIdentifier(langue: ILangue): number | undefined {
  return langue.id;
}
