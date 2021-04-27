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
import { IDetailsOrganigramme, getDetailsOrganigrammeIdentifier } from '../details-organigramme.model';

export type EntityResponseType = HttpResponse<IDetailsOrganigramme>;
export type EntityArrayResponseType = HttpResponse<IDetailsOrganigramme[]>;

@Injectable({ providedIn: 'root' })
export class DetailsOrganigrammeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/details-organigrammes', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/details-organigrammes', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(detailsOrganigramme: IDetailsOrganigramme): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(detailsOrganigramme);
    return this.http
      .post<IDetailsOrganigramme>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(detailsOrganigramme: IDetailsOrganigramme): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(detailsOrganigramme);
    return this.http
      .put<IDetailsOrganigramme>(`${this.resourceUrl}/${getDetailsOrganigrammeIdentifier(detailsOrganigramme) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(detailsOrganigramme: IDetailsOrganigramme): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(detailsOrganigramme);
    return this.http
      .patch<IDetailsOrganigramme>(`${this.resourceUrl}/${getDetailsOrganigrammeIdentifier(detailsOrganigramme) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDetailsOrganigramme>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDetailsOrganigramme[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDetailsOrganigramme[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addDetailsOrganigrammeToCollectionIfMissing(
    detailsOrganigrammeCollection: IDetailsOrganigramme[],
    ...detailsOrganigrammesToCheck: (IDetailsOrganigramme | null | undefined)[]
  ): IDetailsOrganigramme[] {
    const detailsOrganigrammes: IDetailsOrganigramme[] = detailsOrganigrammesToCheck.filter(isPresent);
    if (detailsOrganigrammes.length > 0) {
      const detailsOrganigrammeCollectionIdentifiers = detailsOrganigrammeCollection.map(
        detailsOrganigrammeItem => getDetailsOrganigrammeIdentifier(detailsOrganigrammeItem)!
      );
      const detailsOrganigrammesToAdd = detailsOrganigrammes.filter(detailsOrganigrammeItem => {
        const detailsOrganigrammeIdentifier = getDetailsOrganigrammeIdentifier(detailsOrganigrammeItem);
        if (detailsOrganigrammeIdentifier == null || detailsOrganigrammeCollectionIdentifiers.includes(detailsOrganigrammeIdentifier)) {
          return false;
        }
        detailsOrganigrammeCollectionIdentifiers.push(detailsOrganigrammeIdentifier);
        return true;
      });
      return [...detailsOrganigrammesToAdd, ...detailsOrganigrammeCollection];
    }
    return detailsOrganigrammeCollection;
  }

  protected convertDateFromClient(detailsOrganigramme: IDetailsOrganigramme): IDetailsOrganigramme {
    return Object.assign({}, detailsOrganigramme, {
      dateEffet: detailsOrganigramme.dateEffet?.isValid() ? detailsOrganigramme.dateEffet.format(DATE_FORMAT) : undefined,
      dateCloture: detailsOrganigramme.dateCloture?.isValid() ? detailsOrganigramme.dateCloture.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateEffet = res.body.dateEffet ? dayjs(res.body.dateEffet) : undefined;
      res.body.dateCloture = res.body.dateCloture ? dayjs(res.body.dateCloture) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((detailsOrganigramme: IDetailsOrganigramme) => {
        detailsOrganigramme.dateEffet = detailsOrganigramme.dateEffet ? dayjs(detailsOrganigramme.dateEffet) : undefined;
        detailsOrganigramme.dateCloture = detailsOrganigramme.dateCloture ? dayjs(detailsOrganigramme.dateCloture) : undefined;
      });
    }
    return res;
  }
}
