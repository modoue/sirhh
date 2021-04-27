import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ISyndicat, getSyndicatIdentifier } from '../syndicat.model';

export type EntityResponseType = HttpResponse<ISyndicat>;
export type EntityArrayResponseType = HttpResponse<ISyndicat[]>;

@Injectable({ providedIn: 'root' })
export class SyndicatService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/syndicats', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/syndicats', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(syndicat: ISyndicat): Observable<EntityResponseType> {
    return this.http.post<ISyndicat>(this.resourceUrl, syndicat, { observe: 'response' });
  }

  update(syndicat: ISyndicat): Observable<EntityResponseType> {
    return this.http.put<ISyndicat>(`${this.resourceUrl}/${getSyndicatIdentifier(syndicat) as number}`, syndicat, { observe: 'response' });
  }

  partialUpdate(syndicat: ISyndicat): Observable<EntityResponseType> {
    return this.http.patch<ISyndicat>(`${this.resourceUrl}/${getSyndicatIdentifier(syndicat) as number}`, syndicat, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISyndicat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISyndicat[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISyndicat[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addSyndicatToCollectionIfMissing(syndicatCollection: ISyndicat[], ...syndicatsToCheck: (ISyndicat | null | undefined)[]): ISyndicat[] {
    const syndicats: ISyndicat[] = syndicatsToCheck.filter(isPresent);
    if (syndicats.length > 0) {
      const syndicatCollectionIdentifiers = syndicatCollection.map(syndicatItem => getSyndicatIdentifier(syndicatItem)!);
      const syndicatsToAdd = syndicats.filter(syndicatItem => {
        const syndicatIdentifier = getSyndicatIdentifier(syndicatItem);
        if (syndicatIdentifier == null || syndicatCollectionIdentifiers.includes(syndicatIdentifier)) {
          return false;
        }
        syndicatCollectionIdentifiers.push(syndicatIdentifier);
        return true;
      });
      return [...syndicatsToAdd, ...syndicatCollection];
    }
    return syndicatCollection;
  }
}
