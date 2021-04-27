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
import { ICongesAnnuels, getCongesAnnuelsIdentifier } from '../conges-annuels.model';

export type EntityResponseType = HttpResponse<ICongesAnnuels>;
export type EntityArrayResponseType = HttpResponse<ICongesAnnuels[]>;

@Injectable({ providedIn: 'root' })
export class CongesAnnuelsService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/conges-annuels', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/conges-annuels', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(congesAnnuels: ICongesAnnuels): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(congesAnnuels);
    return this.http
      .post<ICongesAnnuels>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(congesAnnuels: ICongesAnnuels): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(congesAnnuels);
    return this.http
      .put<ICongesAnnuels>(`${this.resourceUrl}/${getCongesAnnuelsIdentifier(congesAnnuels) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(congesAnnuels: ICongesAnnuels): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(congesAnnuels);
    return this.http
      .patch<ICongesAnnuels>(`${this.resourceUrl}/${getCongesAnnuelsIdentifier(congesAnnuels) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICongesAnnuels>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICongesAnnuels[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICongesAnnuels[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addCongesAnnuelsToCollectionIfMissing(
    congesAnnuelsCollection: ICongesAnnuels[],
    ...congesAnnuelsToCheck: (ICongesAnnuels | null | undefined)[]
  ): ICongesAnnuels[] {
    const congesAnnuels: ICongesAnnuels[] = congesAnnuelsToCheck.filter(isPresent);
    if (congesAnnuels.length > 0) {
      const congesAnnuelsCollectionIdentifiers = congesAnnuelsCollection.map(
        congesAnnuelsItem => getCongesAnnuelsIdentifier(congesAnnuelsItem)!
      );
      const congesAnnuelsToAdd = congesAnnuels.filter(congesAnnuelsItem => {
        const congesAnnuelsIdentifier = getCongesAnnuelsIdentifier(congesAnnuelsItem);
        if (congesAnnuelsIdentifier == null || congesAnnuelsCollectionIdentifiers.includes(congesAnnuelsIdentifier)) {
          return false;
        }
        congesAnnuelsCollectionIdentifiers.push(congesAnnuelsIdentifier);
        return true;
      });
      return [...congesAnnuelsToAdd, ...congesAnnuelsCollection];
    }
    return congesAnnuelsCollection;
  }

  protected convertDateFromClient(congesAnnuels: ICongesAnnuels): ICongesAnnuels {
    return Object.assign({}, congesAnnuels, {
      annee: congesAnnuels.annee?.isValid() ? congesAnnuels.annee.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.annee = res.body.annee ? dayjs(res.body.annee) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((congesAnnuels: ICongesAnnuels) => {
        congesAnnuels.annee = congesAnnuels.annee ? dayjs(congesAnnuels.annee) : undefined;
      });
    }
    return res;
  }
}
