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
import { IOrganigramme, getOrganigrammeIdentifier } from '../organigramme.model';

export type EntityResponseType = HttpResponse<IOrganigramme>;
export type EntityArrayResponseType = HttpResponse<IOrganigramme[]>;

@Injectable({ providedIn: 'root' })
export class OrganigrammeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/organigrammes', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/organigrammes', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(organigramme: IOrganigramme): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(organigramme);
    return this.http
      .post<IOrganigramme>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(organigramme: IOrganigramme): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(organigramme);
    return this.http
      .put<IOrganigramme>(`${this.resourceUrl}/${getOrganigrammeIdentifier(organigramme) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(organigramme: IOrganigramme): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(organigramme);
    return this.http
      .patch<IOrganigramme>(`${this.resourceUrl}/${getOrganigrammeIdentifier(organigramme) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOrganigramme>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrganigramme[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrganigramme[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addOrganigrammeToCollectionIfMissing(
    organigrammeCollection: IOrganigramme[],
    ...organigrammesToCheck: (IOrganigramme | null | undefined)[]
  ): IOrganigramme[] {
    const organigrammes: IOrganigramme[] = organigrammesToCheck.filter(isPresent);
    if (organigrammes.length > 0) {
      const organigrammeCollectionIdentifiers = organigrammeCollection.map(
        organigrammeItem => getOrganigrammeIdentifier(organigrammeItem)!
      );
      const organigrammesToAdd = organigrammes.filter(organigrammeItem => {
        const organigrammeIdentifier = getOrganigrammeIdentifier(organigrammeItem);
        if (organigrammeIdentifier == null || organigrammeCollectionIdentifiers.includes(organigrammeIdentifier)) {
          return false;
        }
        organigrammeCollectionIdentifiers.push(organigrammeIdentifier);
        return true;
      });
      return [...organigrammesToAdd, ...organigrammeCollection];
    }
    return organigrammeCollection;
  }

  protected convertDateFromClient(organigramme: IOrganigramme): IOrganigramme {
    return Object.assign({}, organigramme, {
      dateEffet: organigramme.dateEffet?.isValid() ? organigramme.dateEffet.format(DATE_FORMAT) : undefined,
      dateCloture: organigramme.dateCloture?.isValid() ? organigramme.dateCloture.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((organigramme: IOrganigramme) => {
        organigramme.dateEffet = organigramme.dateEffet ? dayjs(organigramme.dateEffet) : undefined;
        organigramme.dateCloture = organigramme.dateCloture ? dayjs(organigramme.dateCloture) : undefined;
      });
    }
    return res;
  }
}
