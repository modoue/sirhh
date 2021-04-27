import * as dayjs from 'dayjs';
import { IUser } from 'app/entities/user/user.model';
import { ICongesMaternite } from 'app/entities/administration/conges-maternite/conges-maternite.model';
import { IAbsence } from 'app/entities/administration/absence/absence.model';
import { IConge } from 'app/entities/administration/conge/conge.model';
import { ICongesAnnuels } from 'app/entities/administration/conges-annuels/conges-annuels.model';
import { IRegimeHoraireAgent } from 'app/entities/administration/regime-horaire-agent/regime-horaire-agent.model';
import { IAttributAgent } from 'app/entities/administration/attribut-agent/attribut-agent.model';
import { IGradeAgent } from 'app/entities/administration/grade-agent/grade-agent.model';
import { IElementsAgent } from 'app/entities/administration/elements-agent/elements-agent.model';
import { IEnfant } from 'app/entities/administration/enfant/enfant.model';
import { IPosteAgent } from 'app/entities/administration/poste-agent/poste-agent.model';
import { IConjoint } from 'app/entities/administration/conjoint/conjoint.model';
import { ISanctionAgent } from 'app/entities/administration/sanction-agent/sanction-agent.model';
import { IContact } from 'app/entities/administration/contact/contact.model';
import { IDiplomeAgent } from 'app/entities/administration/diplome-agent/diplome-agent.model';
import { IDistinctionAgent } from 'app/entities/administration/distinction-agent/distinction-agent.model';
import { IFormationAgent } from 'app/entities/administration/formation-agent/formation-agent.model';
import { IExperienceProfessionnelle } from 'app/entities/administration/experience-professionnelle/experience-professionnelle.model';
import { ILangue } from 'app/entities/administration/langue/langue.model';
import { ITitreAgent } from 'app/entities/administration/titre-agent/titre-agent.model';
import { ISyndicat } from 'app/entities/administration/syndicat/syndicat.model';
import { IPays } from 'app/entities/administration/pays/pays.model';
import { IStatut } from 'app/entities/administration/statut/statut.model';
import { IConventionCollective } from 'app/entities/administration/convention-collective/convention-collective.model';
import { ICivilite } from 'app/entities/administration/civilite/civilite.model';
import { IMotifSuppression } from 'app/entities/administration/motif-suppression/motif-suppression.model';
import { IMotifReactivation } from 'app/entities/administration/motif-reactivation/motif-reactivation.model';
import { ITypePiece } from 'app/entities/administration/type-piece/type-piece.model';
import { ITypeStage } from 'app/entities/administration/type-stage/type-stage.model';
import { ISociete } from 'app/entities/administration/societe/societe.model';
import { ISocieteInterim } from 'app/entities/administration/societe-interim/societe-interim.model';
import { IHistoriqueAbsence } from 'app/entities/administration/historique-absence/historique-absence.model';
import { IHistoriqueConge } from 'app/entities/administration/historique-conge/historique-conge.model';

export interface IEmploye {
  id?: number;
  version?: number | null;
  numeroBadge?: string | null;
  matriculeInterne?: string;
  nom?: string;
  nomJeuneFille?: string | null;
  prenom?: string;
  telDomicile?: string | null;
  telProfessionnel?: string | null;
  telCellulaire1?: string | null;
  telCellulaire2?: string | null;
  dateRecrutement?: dayjs.Dayjs;
  actif?: boolean;
  villeNaissance?: string;
  dateNaissance?: dayjs.Dayjs;
  email?: string | null;
  emailPersonnel?: string | null;
  ville?: string | null;
  rue?: string | null;
  quartier?: string | null;
  codePostal?: string | null;
  remarques?: string | null;
  syndique?: boolean | null;
  numIpres?: string | null;
  numRcpn?: string | null;
  numCrae?: string | null;
  numSecSoc?: string | null;
  ancienneteNegocie?: string | null;
  ancienneteNegocieDate?: dayjs.Dayjs | null;
  ageRetraite?: string | null;
  numeroPiece?: string | null;
  dateValiditePiece?: dayjs.Dayjs | null;
  dateProchainCalculSupplement?: dayjs.Dayjs | null;
  dateDernierCalculConges?: dayjs.Dayjs | null;
  dateDernierDepartConges?: dayjs.Dayjs | null;
  dateDernierRetourConges?: dayjs.Dayjs | null;
  nbrJoursRestants?: number | null;
  nbrJoursCongesEnfant?: number | null;
  nbrJoursCongesAnciennete?: number | null;
  congesSansDroit?: number | null;
  allaitement?: boolean | null;
  debutAllaitement?: dayjs.Dayjs | null;
  situationFamiliale?: string | null;
  dateFinAllaitement?: dayjs.Dayjs | null;
  dateRetraite?: dayjs.Dayjs | null;
  ancienneteRecrutement?: string | null;
  anciennete?: string | null;
  nbreConjoint?: string | null;
  nbreEnfants?: string | null;
  nbreEnfantsEnCharge?: string | null;
  titre?: string | null;
  dateFinContrat?: dayjs.Dayjs | null;
  dureeContrat?: number | null;
  indPresentPaie?: boolean | null;
  distanceLieuTravail?: string | null;
  dateRetrait?: dayjs.Dayjs | null;
  remarquesRetrait?: string | null;
  indSup?: boolean | null;
  dateReactivation?: dayjs.Dayjs | null;
  remarquesReactivation?: string | null;
  indSendMsgMail?: boolean | null;
  indSendMsgSms?: boolean | null;
  dateCreated?: dayjs.Dayjs | null;
  lastUpdated?: dayjs.Dayjs | null;
  userCreated?: string | null;
  userUpdated?: string | null;
  user?: IUser | null;
  congesMaternites?: ICongesMaternite[] | null;
  absences?: IAbsence[] | null;
  conges?: IConge[] | null;
  congesAnnuels?: ICongesAnnuels[] | null;
  regimeHoraireAgents?: IRegimeHoraireAgent[] | null;
  attributAgents?: IAttributAgent[] | null;
  gradeAgents?: IGradeAgent[] | null;
  elementsAgents?: IElementsAgent[] | null;
  enfants?: IEnfant[] | null;
  posteAgents?: IPosteAgent[] | null;
  conjoints?: IConjoint[] | null;
  sanctionAgents?: ISanctionAgent[] | null;
  contacts?: IContact[] | null;
  diplomeAgents?: IDiplomeAgent[] | null;
  distinctionAgents?: IDistinctionAgent[] | null;
  formationAgents?: IFormationAgent[] | null;
  experienceProfessionnelles?: IExperienceProfessionnelle[] | null;
  langues?: ILangue[] | null;
  titreAgent?: ITitreAgent | null;
  syndicat?: ISyndicat | null;
  pays?: IPays | null;
  statut?: IStatut | null;
  conventionCollective?: IConventionCollective | null;
  civilite?: ICivilite | null;
  motifSuppression?: IMotifSuppression | null;
  motifReactivation?: IMotifReactivation | null;
  typePiece?: ITypePiece | null;
  typeStage?: ITypeStage | null;
  societe?: ISociete | null;
  societeInterim?: ISocieteInterim | null;
  historiqueAbsences?: IHistoriqueAbsence[] | null;
  historiqueConges?: IHistoriqueConge[] | null;
}

export class Employe implements IEmploye {
  constructor(
    public id?: number,
    public version?: number | null,
    public numeroBadge?: string | null,
    public matriculeInterne?: string,
    public nom?: string,
    public nomJeuneFille?: string | null,
    public prenom?: string,
    public telDomicile?: string | null,
    public telProfessionnel?: string | null,
    public telCellulaire1?: string | null,
    public telCellulaire2?: string | null,
    public dateRecrutement?: dayjs.Dayjs,
    public actif?: boolean,
    public villeNaissance?: string,
    public dateNaissance?: dayjs.Dayjs,
    public email?: string | null,
    public emailPersonnel?: string | null,
    public ville?: string | null,
    public rue?: string | null,
    public quartier?: string | null,
    public codePostal?: string | null,
    public remarques?: string | null,
    public syndique?: boolean | null,
    public numIpres?: string | null,
    public numRcpn?: string | null,
    public numCrae?: string | null,
    public numSecSoc?: string | null,
    public ancienneteNegocie?: string | null,
    public ancienneteNegocieDate?: dayjs.Dayjs | null,
    public ageRetraite?: string | null,
    public numeroPiece?: string | null,
    public dateValiditePiece?: dayjs.Dayjs | null,
    public dateProchainCalculSupplement?: dayjs.Dayjs | null,
    public dateDernierCalculConges?: dayjs.Dayjs | null,
    public dateDernierDepartConges?: dayjs.Dayjs | null,
    public dateDernierRetourConges?: dayjs.Dayjs | null,
    public nbrJoursRestants?: number | null,
    public nbrJoursCongesEnfant?: number | null,
    public nbrJoursCongesAnciennete?: number | null,
    public congesSansDroit?: number | null,
    public allaitement?: boolean | null,
    public debutAllaitement?: dayjs.Dayjs | null,
    public situationFamiliale?: string | null,
    public dateFinAllaitement?: dayjs.Dayjs | null,
    public dateRetraite?: dayjs.Dayjs | null,
    public ancienneteRecrutement?: string | null,
    public anciennete?: string | null,
    public nbreConjoint?: string | null,
    public nbreEnfants?: string | null,
    public nbreEnfantsEnCharge?: string | null,
    public titre?: string | null,
    public dateFinContrat?: dayjs.Dayjs | null,
    public dureeContrat?: number | null,
    public indPresentPaie?: boolean | null,
    public distanceLieuTravail?: string | null,
    public dateRetrait?: dayjs.Dayjs | null,
    public remarquesRetrait?: string | null,
    public indSup?: boolean | null,
    public dateReactivation?: dayjs.Dayjs | null,
    public remarquesReactivation?: string | null,
    public indSendMsgMail?: boolean | null,
    public indSendMsgSms?: boolean | null,
    public dateCreated?: dayjs.Dayjs | null,
    public lastUpdated?: dayjs.Dayjs | null,
    public userCreated?: string | null,
    public userUpdated?: string | null,
    public user?: IUser | null,
    public congesMaternites?: ICongesMaternite[] | null,
    public absences?: IAbsence[] | null,
    public conges?: IConge[] | null,
    public congesAnnuels?: ICongesAnnuels[] | null,
    public regimeHoraireAgents?: IRegimeHoraireAgent[] | null,
    public attributAgents?: IAttributAgent[] | null,
    public gradeAgents?: IGradeAgent[] | null,
    public elementsAgents?: IElementsAgent[] | null,
    public enfants?: IEnfant[] | null,
    public posteAgents?: IPosteAgent[] | null,
    public conjoints?: IConjoint[] | null,
    public sanctionAgents?: ISanctionAgent[] | null,
    public contacts?: IContact[] | null,
    public diplomeAgents?: IDiplomeAgent[] | null,
    public distinctionAgents?: IDistinctionAgent[] | null,
    public formationAgents?: IFormationAgent[] | null,
    public experienceProfessionnelles?: IExperienceProfessionnelle[] | null,
    public langues?: ILangue[] | null,
    public titreAgent?: ITitreAgent | null,
    public syndicat?: ISyndicat | null,
    public pays?: IPays | null,
    public statut?: IStatut | null,
    public conventionCollective?: IConventionCollective | null,
    public civilite?: ICivilite | null,
    public motifSuppression?: IMotifSuppression | null,
    public motifReactivation?: IMotifReactivation | null,
    public typePiece?: ITypePiece | null,
    public typeStage?: ITypeStage | null,
    public societe?: ISociete | null,
    public societeInterim?: ISocieteInterim | null,
    public historiqueAbsences?: IHistoriqueAbsence[] | null,
    public historiqueConges?: IHistoriqueConge[] | null
  ) {
    this.actif = this.actif ?? false;
    this.syndique = this.syndique ?? false;
    this.allaitement = this.allaitement ?? false;
    this.indPresentPaie = this.indPresentPaie ?? false;
    this.indSup = this.indSup ?? false;
    this.indSendMsgMail = this.indSendMsgMail ?? false;
    this.indSendMsgSms = this.indSendMsgSms ?? false;
  }
}

export function getEmployeIdentifier(employe: IEmploye): number | undefined {
  return employe.id;
}
