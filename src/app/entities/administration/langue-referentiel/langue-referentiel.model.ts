import { ILangue } from 'app/entities/administration/langue/langue.model';

export interface ILangueReferentiel {
  id?: number;
  version?: number | null;
  code?: string | null;
  intituleLangue?: string | null;
  langues?: ILangue[] | null;
}

export class LangueReferentiel implements ILangueReferentiel {
  constructor(
    public id?: number,
    public version?: number | null,
    public code?: string | null,
    public intituleLangue?: string | null,
    public langues?: ILangue[] | null
  ) {}
}

export function getLangueReferentielIdentifier(langueReferentiel: ILangueReferentiel): number | undefined {
  return langueReferentiel.id;
}
