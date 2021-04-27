import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { IAbsence, getAbsenceIdentifier } from '../absence.model';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';

export type EntityResponseType = HttpResponse<IAbsence>;
export type EntityArrayResponseType = HttpResponse<IAbsence[]>;

@Injectable({ providedIn: 'root' })
export class AbsenceService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/absences', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/absences', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(absence: IAbsence): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(absence);
    return this.http
      .post<IAbsence>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(absence: IAbsence): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(absence);
    return this.http
      .put<IAbsence>(`${this.resourceUrl}/${getAbsenceIdentifier(absence) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(absence: IAbsence): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(absence);
    return this.http
      .patch<IAbsence>(`${this.resourceUrl}/${getAbsenceIdentifier(absence) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAbsence>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAbsence[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAbsence[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addAbsenceToCollectionIfMissing(absenceCollection: IAbsence[], ...absencesToCheck: (IAbsence | null | undefined)[]): IAbsence[] {
    const absences: IAbsence[] = absencesToCheck.filter(isPresent);
    if (absences.length > 0) {
      const absenceCollectionIdentifiers = absenceCollection.map(absenceItem => getAbsenceIdentifier(absenceItem)!);
      const absencesToAdd = absences.filter(absenceItem => {
        const absenceIdentifier = getAbsenceIdentifier(absenceItem);
        if (absenceIdentifier == null || absenceCollectionIdentifiers.includes(absenceIdentifier)) {
          return false;
        }
        absenceCollectionIdentifiers.push(absenceIdentifier);
        return true;
      });
      return [...absencesToAdd, ...absenceCollection];
    }
    return absenceCollection;
  }

  protected convertDateFromClient(absence: IAbsence): IAbsence {
    return Object.assign({}, absence, {
      dateDepart: absence.dateDepart?.isValid() ? absence.dateDepart.format(DATE_FORMAT) : undefined,
      dateRetourPrevue: absence.dateRetourPrevue?.isValid() ? absence.dateRetourPrevue.format(DATE_FORMAT) : undefined,
      dateRetourEffective: absence.dateRetourEffective?.isValid() ? absence.dateRetourEffective.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDepart = res.body.dateDepart ? dayjs(res.body.dateDepart) : undefined;
      res.body.dateRetourPrevue = res.body.dateRetourPrevue ? dayjs(res.body.dateRetourPrevue) : undefined;
      res.body.dateRetourEffective = res.body.dateRetourEffective ? dayjs(res.body.dateRetourEffective) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((absence: IAbsence) => {
        absence.dateDepart = absence.dateDepart ? dayjs(absence.dateDepart) : undefined;
        absence.dateRetourPrevue = absence.dateRetourPrevue ? dayjs(absence.dateRetourPrevue) : undefined;
        absence.dateRetourEffective = absence.dateRetourEffective ? dayjs(absence.dateRetourEffective) : undefined;
      });
    }
    return res;
  }
}
