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
import { IConjoint, getConjointIdentifier } from '../conjoint.model';

export type EntityResponseType = HttpResponse<IConjoint>;
export type EntityArrayResponseType = HttpResponse<IConjoint[]>;

@Injectable({ providedIn: 'root' })
export class ConjointService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/conjoints', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/conjoints', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(conjoint: IConjoint): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conjoint);
    return this.http
      .post<IConjoint>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(conjoint: IConjoint): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conjoint);
    return this.http
      .put<IConjoint>(`${this.resourceUrl}/${getConjointIdentifier(conjoint) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(conjoint: IConjoint): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conjoint);
    return this.http
      .patch<IConjoint>(`${this.resourceUrl}/${getConjointIdentifier(conjoint) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IConjoint>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IConjoint[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IConjoint[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addConjointToCollectionIfMissing(conjointCollection: IConjoint[], ...conjointsToCheck: (IConjoint | null | undefined)[]): IConjoint[] {
    const conjoints: IConjoint[] = conjointsToCheck.filter(isPresent);
    if (conjoints.length > 0) {
      const conjointCollectionIdentifiers = conjointCollection.map(conjointItem => getConjointIdentifier(conjointItem)!);
      const conjointsToAdd = conjoints.filter(conjointItem => {
        const conjointIdentifier = getConjointIdentifier(conjointItem);
        if (conjointIdentifier == null || conjointCollectionIdentifiers.includes(conjointIdentifier)) {
          return false;
        }
        conjointCollectionIdentifiers.push(conjointIdentifier);
        return true;
      });
      return [...conjointsToAdd, ...conjointCollection];
    }
    return conjointCollection;
  }

  protected convertDateFromClient(conjoint: IConjoint): IConjoint {
    return Object.assign({}, conjoint, {
      dateNaissance: conjoint.dateNaissance?.isValid() ? conjoint.dateNaissance.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateNaissance = res.body.dateNaissance ? dayjs(res.body.dateNaissance) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((conjoint: IConjoint) => {
        conjoint.dateNaissance = conjoint.dateNaissance ? dayjs(conjoint.dateNaissance) : undefined;
      });
    }
    return res;
  }
}
