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
import { IConge, getCongeIdentifier } from '../conge.model';

export type EntityResponseType = HttpResponse<IConge>;
export type EntityArrayResponseType = HttpResponse<IConge[]>;

@Injectable({ providedIn: 'root' })
export class CongeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/conges', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/conges', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(conge: IConge): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conge);
    return this.http
      .post<IConge>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(conge: IConge): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conge);
    return this.http
      .put<IConge>(`${this.resourceUrl}/${getCongeIdentifier(conge) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(conge: IConge): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conge);
    return this.http
      .patch<IConge>(`${this.resourceUrl}/${getCongeIdentifier(conge) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IConge>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IConge[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IConge[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addCongeToCollectionIfMissing(congeCollection: IConge[], ...congesToCheck: (IConge | null | undefined)[]): IConge[] {
    const conges: IConge[] = congesToCheck.filter(isPresent);
    if (conges.length > 0) {
      const congeCollectionIdentifiers = congeCollection.map(congeItem => getCongeIdentifier(congeItem)!);
      const congesToAdd = conges.filter(congeItem => {
        const congeIdentifier = getCongeIdentifier(congeItem);
        if (congeIdentifier == null || congeCollectionIdentifiers.includes(congeIdentifier)) {
          return false;
        }
        congeCollectionIdentifiers.push(congeIdentifier);
        return true;
      });
      return [...congesToAdd, ...congeCollection];
    }
    return congeCollection;
  }

  protected convertDateFromClient(conge: IConge): IConge {
    return Object.assign({}, conge, {
      dateDepart: conge.dateDepart?.isValid() ? conge.dateDepart.format(DATE_FORMAT) : undefined,
      dateRetourPrevue: conge.dateRetourPrevue?.isValid() ? conge.dateRetourPrevue.format(DATE_FORMAT) : undefined,
      dateRetourEffective: conge.dateRetourEffective?.isValid() ? conge.dateRetourEffective.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((conge: IConge) => {
        conge.dateDepart = conge.dateDepart ? dayjs(conge.dateDepart) : undefined;
        conge.dateRetourPrevue = conge.dateRetourPrevue ? dayjs(conge.dateRetourPrevue) : undefined;
        conge.dateRetourEffective = conge.dateRetourEffective ? dayjs(conge.dateRetourEffective) : undefined;
      });
    }
    return res;
  }
}
