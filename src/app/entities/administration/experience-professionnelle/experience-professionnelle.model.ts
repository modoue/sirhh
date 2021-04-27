import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface IExperienceProfessionnelle {
  id?: number;
  version?: number | null;
  entreprise?: string | null;
  posteOccupe?: string | null;
  duree?: number | null;
  type?: string | null;
  annee?: string | null;
  lieu?: string | null;
  remarque?: string | null;
  employe?: IEmploye | null;
}

export class ExperienceProfessionnelle implements IExperienceProfessionnelle {
  constructor(
    public id?: number,
    public version?: number | null,
    public entreprise?: string | null,
    public posteOccupe?: string | null,
    public duree?: number | null,
    public type?: string | null,
    public annee?: string | null,
    public lieu?: string | null,
    public remarque?: string | null,
    public employe?: IEmploye | null
  ) {}
}

export function getExperienceProfessionnelleIdentifier(experienceProfessionnelle: IExperienceProfessionnelle): number | undefined {
  return experienceProfessionnelle.id;
}
