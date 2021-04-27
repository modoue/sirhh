import * as dayjs from 'dayjs';
import { ILienParenteEnfant } from 'app/entities/administration/lien-parente-enfant/lien-parente-enfant.model';
import { IEmploye } from 'app/entities/administration/employe/employe.model';

export interface IEnfant {
  id?: number;
  version?: number | null;
  nomEnfant?: string | null;
  prenomEnfant?: string | null;
  indACharge?: boolean | null;
  indScolarise?: boolean | null;
  indEnfantHandicape?: boolean | null;
  dateDebutScolarisation?: dayjs.Dayjs | null;
  dateFinScolarisation?: dayjs.Dayjs | null;
  photoContentType?: string | null;
  photo?: string | null;
  typeFile?: string | null;
  numeroSequence?: number | null;
  lienParenteEnfant?: ILienParenteEnfant | null;
  employe?: IEmploye | null;
}

export class Enfant implements IEnfant {
  constructor(
    public id?: number,
    public version?: number | null,
    public nomEnfant?: string | null,
    public prenomEnfant?: string | null,
    public indACharge?: boolean | null,
    public indScolarise?: boolean | null,
    public indEnfantHandicape?: boolean | null,
    public dateDebutScolarisation?: dayjs.Dayjs | null,
    public dateFinScolarisation?: dayjs.Dayjs | null,
    public photoContentType?: string | null,
    public photo?: string | null,
    public typeFile?: string | null,
    public numeroSequence?: number | null,
    public lienParenteEnfant?: ILienParenteEnfant | null,
    public employe?: IEmploye | null
  ) {
    this.indACharge = this.indACharge ?? false;
    this.indScolarise = this.indScolarise ?? false;
    this.indEnfantHandicape = this.indEnfantHandicape ?? false;
  }
}

export function getEnfantIdentifier(enfant: IEnfant): number | undefined {
  return enfant.id;
}
