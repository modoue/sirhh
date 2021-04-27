import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICivilite, getCiviliteIdentifier } from '../civilite.model';

export type EntityResponseType = HttpResponse<ICivilite>;
export type EntityArrayResponseType = HttpResponse<ICivilite[]>;

@Injectable({ providedIn: 'root' })
export class CiviliteService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/civilites', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/civilites', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(civilite: ICivilite): Observable<EntityResponseType> {
    return this.http.post<ICivilite>(this.resourceUrl, civilite, { observe: 'response' });
  }

  update(civilite: ICivilite): Observable<EntityResponseType> {
    return this.http.put<ICivilite>(`${this.resourceUrl}/${getCiviliteIdentifier(civilite) as number}`, civilite, { observe: 'response' });
  }

  partialUpdate(civilite: ICivilite): Observable<EntityResponseType> {
    return this.http.patch<ICivilite>(`${this.resourceUrl}/${getCiviliteIdentifier(civilite) as number}`, civilite, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICivilite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICivilite[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICivilite[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addCiviliteToCollectionIfMissing(civiliteCollection: ICivilite[], ...civilitesToCheck: (ICivilite | null | undefined)[]): ICivilite[] {
    const civilites: ICivilite[] = civilitesToCheck.filter(isPresent);
    if (civilites.length > 0) {
      const civiliteCollectionIdentifiers = civiliteCollection.map(civiliteItem => getCiviliteIdentifier(civiliteItem)!);
      const civilitesToAdd = civilites.filter(civiliteItem => {
        const civiliteIdentifier = getCiviliteIdentifier(civiliteItem);
        if (civiliteIdentifier == null || civiliteCollectionIdentifiers.includes(civiliteIdentifier)) {
          return false;
        }
        civiliteCollectionIdentifiers.push(civiliteIdentifier);
        return true;
      });
      return [...civilitesToAdd, ...civiliteCollection];
    }
    return civiliteCollection;
  }
}
