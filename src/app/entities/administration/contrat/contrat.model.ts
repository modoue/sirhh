import * as dayjs from 'dayjs';

export interface IContrat {
  id?: number;
  version?: number | null;
  codeStatut?: string | null;
  libelleStatut?: string | null;
  nombreMoisMin?: number | null;
  nombreMoisMax?: number | null;
  nbreJourConge?: number | null;
  indDetermine?: boolean | null;
  indDroitConges?: boolean | null;
  indTypeStage?: boolean | null;
  nbreSupplementEnfant?: dayjs.Dayjs | null;
  dernierNumero?: number | null;
  isPermanent?: boolean | null;
  indWeekEnd?: string | null;
  plafondCumulJoursConge?: number | null;
  lundi?: boolean | null;
  mardi?: boolean | null;
  mercredi?: boolean | null;
  jeudi?: boolean | null;
  vendredi?: boolean | null;
  samedi?: boolean | null;
  dimanche?: boolean | null;
}

export class Contrat implements IContrat {
  constructor(
    public id?: number,
    public version?: number | null,
    public codeStatut?: string | null,
    public libelleStatut?: string | null,
    public nombreMoisMin?: number | null,
    public nombreMoisMax?: number | null,
    public nbreJourConge?: number | null,
    public indDetermine?: boolean | null,
    public indDroitConges?: boolean | null,
    public indTypeStage?: boolean | null,
    public nbreSupplementEnfant?: dayjs.Dayjs | null,
    public dernierNumero?: number | null,
    public isPermanent?: boolean | null,
    public indWeekEnd?: string | null,
    public plafondCumulJoursConge?: number | null,
    public lundi?: boolean | null,
    public mardi?: boolean | null,
    public mercredi?: boolean | null,
    public jeudi?: boolean | null,
    public vendredi?: boolean | null,
    public samedi?: boolean | null,
    public dimanche?: boolean | null
  ) {
    this.indDetermine = this.indDetermine ?? false;
    this.indDroitConges = this.indDroitConges ?? false;
    this.indTypeStage = this.indTypeStage ?? false;
    this.isPermanent = this.isPermanent ?? false;
    this.lundi = this.lundi ?? false;
    this.mardi = this.mardi ?? false;
    this.mercredi = this.mercredi ?? false;
    this.jeudi = this.jeudi ?? false;
    this.vendredi = this.vendredi ?? false;
    this.samedi = this.samedi ?? false;
    this.dimanche = this.dimanche ?? false;
  }
}

export function getContratIdentifier(contrat: IContrat): number | undefined {
  return contrat.id;
}
