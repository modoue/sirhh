import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IEmploye, getEmployeIdentifier } from '../employe.model';

export type EntityResponseType = HttpResponse<IEmploye>;
export type EntityArrayResponseType = HttpResponse<IEmploye[]>;

@Injectable({ providedIn: 'root' })
export class EmployeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/employes', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/employes', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(employe: IEmploye): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employe);
    return this.http
      .post<IEmploye>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(employe: IEmploye): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employe);
    return this.http
      .put<IEmploye>(`${this.resourceUrl}/${getEmployeIdentifier(employe) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(employe: IEmploye): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employe);
    return this.http
      .patch<IEmploye>(`${this.resourceUrl}/${getEmployeIdentifier(employe) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEmploye>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEmploye[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEmploye[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addEmployeToCollectionIfMissing(employeCollection: IEmploye[], ...employesToCheck: (IEmploye | null | undefined)[]): IEmploye[] {
    const employes: IEmploye[] = employesToCheck.filter(isPresent);
    if (employes.length > 0) {
      const employeCollectionIdentifiers = employeCollection.map(employeItem => getEmployeIdentifier(employeItem)!);
      const employesToAdd = employes.filter(employeItem => {
        const employeIdentifier = getEmployeIdentifier(employeItem);
        if (employeIdentifier == null || employeCollectionIdentifiers.includes(employeIdentifier)) {
          return false;
        }
        employeCollectionIdentifiers.push(employeIdentifier);
        return true;
      });
      return [...employesToAdd, ...employeCollection];
    }
    return employeCollection;
  }

  protected convertDateFromClient(employe: IEmploye): IEmploye {
    return Object.assign({}, employe, {
      dateRecrutement: employe.dateRecrutement?.isValid() ? employe.dateRecrutement.format(DATE_FORMAT) : undefined,
      dateNaissance: employe.dateNaissance?.isValid() ? employe.dateNaissance.format(DATE_FORMAT) : undefined,
      ancienneteNegocieDate: employe.ancienneteNegocieDate?.isValid() ? employe.ancienneteNegocieDate.format(DATE_FORMAT) : undefined,
      dateValiditePiece: employe.dateValiditePiece?.isValid() ? employe.dateValiditePiece.format(DATE_FORMAT) : undefined,
      dateProchainCalculSupplement: employe.dateProchainCalculSupplement?.isValid()
        ? employe.dateProchainCalculSupplement.format(DATE_FORMAT)
        : undefined,
      dateDernierCalculConges: employe.dateDernierCalculConges?.isValid() ? employe.dateDernierCalculConges.format(DATE_FORMAT) : undefined,
      dateDernierDepartConges: employe.dateDernierDepartConges?.isValid() ? employe.dateDernierDepartConges.format(DATE_FORMAT) : undefined,
      dateDernierRetourConges: employe.dateDernierRetourConges?.isValid() ? employe.dateDernierRetourConges.format(DATE_FORMAT) : undefined,
      debutAllaitement: employe.debutAllaitement?.isValid() ? employe.debutAllaitement.format(DATE_FORMAT) : undefined,
      dateFinAllaitement: employe.dateFinAllaitement?.isValid() ? employe.dateFinAllaitement.format(DATE_FORMAT) : undefined,
      dateRetraite: employe.dateRetraite?.isValid() ? employe.dateRetraite.format(DATE_FORMAT) : undefined,
      dateFinContrat: employe.dateFinContrat?.isValid() ? employe.dateFinContrat.format(DATE_FORMAT) : undefined,
      dateRetrait: employe.dateRetrait?.isValid() ? employe.dateRetrait.format(DATE_FORMAT) : undefined,
      dateReactivation: employe.dateReactivation?.isValid() ? employe.dateReactivation.format(DATE_FORMAT) : undefined,
      dateCreated: employe.dateCreated?.isValid() ? employe.dateCreated.format(DATE_FORMAT) : undefined,
      lastUpdated: employe.lastUpdated?.isValid() ? employe.lastUpdated.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateRecrutement = res.body.dateRecrutement ? dayjs(res.body.dateRecrutement) : undefined;
      res.body.dateNaissance = res.body.dateNaissance ? dayjs(res.body.dateNaissance) : undefined;
      res.body.ancienneteNegocieDate = res.body.ancienneteNegocieDate ? dayjs(res.body.ancienneteNegocieDate) : undefined;
      res.body.dateValiditePiece = res.body.dateValiditePiece ? dayjs(res.body.dateValiditePiece) : undefined;
      res.body.dateProchainCalculSupplement = res.body.dateProchainCalculSupplement
        ? dayjs(res.body.dateProchainCalculSupplement)
        : undefined;
      res.body.dateDernierCalculConges = res.body.dateDernierCalculConges ? dayjs(res.body.dateDernierCalculConges) : undefined;
      res.body.dateDernierDepartConges = res.body.dateDernierDepartConges ? dayjs(res.body.dateDernierDepartConges) : undefined;
      res.body.dateDernierRetourConges = res.body.dateDernierRetourConges ? dayjs(res.body.dateDernierRetourConges) : undefined;
      res.body.debutAllaitement = res.body.debutAllaitement ? dayjs(res.body.debutAllaitement) : undefined;
      res.body.dateFinAllaitement = res.body.dateFinAllaitement ? dayjs(res.body.dateFinAllaitement) : undefined;
      res.body.dateRetraite = res.body.dateRetraite ? dayjs(res.body.dateRetraite) : undefined;
      res.body.dateFinContrat = res.body.dateFinContrat ? dayjs(res.body.dateFinContrat) : undefined;
      res.body.dateRetrait = res.body.dateRetrait ? dayjs(res.body.dateRetrait) : undefined;
      res.body.dateReactivation = res.body.dateReactivation ? dayjs(res.body.dateReactivation) : undefined;
      res.body.dateCreated = res.body.dateCreated ? dayjs(res.body.dateCreated) : undefined;
      res.body.lastUpdated = res.body.lastUpdated ? dayjs(res.body.lastUpdated) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((employe: IEmploye) => {
        employe.dateRecrutement = employe.dateRecrutement ? dayjs(employe.dateRecrutement) : undefined;
        employe.dateNaissance = employe.dateNaissance ? dayjs(employe.dateNaissance) : undefined;
        employe.ancienneteNegocieDate = employe.ancienneteNegocieDate ? dayjs(employe.ancienneteNegocieDate) : undefined;
        employe.dateValiditePiece = employe.dateValiditePiece ? dayjs(employe.dateValiditePiece) : undefined;
        employe.dateProchainCalculSupplement = employe.dateProchainCalculSupplement
          ? dayjs(employe.dateProchainCalculSupplement)
          : undefined;
        employe.dateDernierCalculConges = employe.dateDernierCalculConges ? dayjs(employe.dateDernierCalculConges) : undefined;
        employe.dateDernierDepartConges = employe.dateDernierDepartConges ? dayjs(employe.dateDernierDepartConges) : undefined;
        employe.dateDernierRetourConges = employe.dateDernierRetourConges ? dayjs(employe.dateDernierRetourConges) : undefined;
        employe.debutAllaitement = employe.debutAllaitement ? dayjs(employe.debutAllaitement) : undefined;
        employe.dateFinAllaitement = employe.dateFinAllaitement ? dayjs(employe.dateFinAllaitement) : undefined;
        employe.dateRetraite = employe.dateRetraite ? dayjs(employe.dateRetraite) : undefined;
        employe.dateFinContrat = employe.dateFinContrat ? dayjs(employe.dateFinContrat) : undefined;
        employe.dateRetrait = employe.dateRetrait ? dayjs(employe.dateRetrait) : undefined;
        employe.dateReactivation = employe.dateReactivation ? dayjs(employe.dateReactivation) : undefined;
        employe.dateCreated = employe.dateCreated ? dayjs(employe.dateCreated) : undefined;
        employe.lastUpdated = employe.lastUpdated ? dayjs(employe.lastUpdated) : undefined;
      });
    }
    return res;
  }
}
