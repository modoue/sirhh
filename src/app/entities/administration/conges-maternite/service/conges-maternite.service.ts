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
import { ICongesMaternite, getCongesMaterniteIdentifier } from '../conges-maternite.model';

export type EntityResponseType = HttpResponse<ICongesMaternite>;
export type EntityArrayResponseType = HttpResponse<ICongesMaternite[]>;

@Injectable({ providedIn: 'root' })
export class CongesMaterniteService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/conges-maternites', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/conges-maternites', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(congesMaternite: ICongesMaternite): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(congesMaternite);
    return this.http
      .post<ICongesMaternite>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(congesMaternite: ICongesMaternite): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(congesMaternite);
    return this.http
      .put<ICongesMaternite>(`${this.resourceUrl}/${getCongesMaterniteIdentifier(congesMaternite) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(congesMaternite: ICongesMaternite): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(congesMaternite);
    return this.http
      .patch<ICongesMaternite>(`${this.resourceUrl}/${getCongesMaterniteIdentifier(congesMaternite) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICongesMaternite>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICongesMaternite[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICongesMaternite[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addCongesMaterniteToCollectionIfMissing(
    congesMaterniteCollection: ICongesMaternite[],
    ...congesMaternitesToCheck: (ICongesMaternite | null | undefined)[]
  ): ICongesMaternite[] {
    const congesMaternites: ICongesMaternite[] = congesMaternitesToCheck.filter(isPresent);
    if (congesMaternites.length > 0) {
      const congesMaterniteCollectionIdentifiers = congesMaterniteCollection.map(
        congesMaterniteItem => getCongesMaterniteIdentifier(congesMaterniteItem)!
      );
      const congesMaternitesToAdd = congesMaternites.filter(congesMaterniteItem => {
        const congesMaterniteIdentifier = getCongesMaterniteIdentifier(congesMaterniteItem);
        if (congesMaterniteIdentifier == null || congesMaterniteCollectionIdentifiers.includes(congesMaterniteIdentifier)) {
          return false;
        }
        congesMaterniteCollectionIdentifiers.push(congesMaterniteIdentifier);
        return true;
      });
      return [...congesMaternitesToAdd, ...congesMaterniteCollection];
    }
    return congesMaterniteCollection;
  }

  protected convertDateFromClient(congesMaternite: ICongesMaternite): ICongesMaternite {
    return Object.assign({}, congesMaternite, {
      annee: congesMaternite.annee?.isValid() ? congesMaternite.annee.format(DATE_FORMAT) : undefined,
      dateDepart: congesMaternite.dateDepart?.isValid() ? congesMaternite.dateDepart.format(DATE_FORMAT) : undefined,
      dateRetour: congesMaternite.dateRetour?.isValid() ? congesMaternite.dateRetour.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.annee = res.body.annee ? dayjs(res.body.annee) : undefined;
      res.body.dateDepart = res.body.dateDepart ? dayjs(res.body.dateDepart) : undefined;
      res.body.dateRetour = res.body.dateRetour ? dayjs(res.body.dateRetour) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((congesMaternite: ICongesMaternite) => {
        congesMaternite.annee = congesMaternite.annee ? dayjs(congesMaternite.annee) : undefined;
        congesMaternite.dateDepart = congesMaternite.dateDepart ? dayjs(congesMaternite.dateDepart) : undefined;
        congesMaternite.dateRetour = congesMaternite.dateRetour ? dayjs(congesMaternite.dateRetour) : undefined;
      });
    }
    return res;
  }
}
