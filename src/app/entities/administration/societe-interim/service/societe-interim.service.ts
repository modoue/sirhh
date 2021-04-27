import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ISocieteInterim, getSocieteInterimIdentifier } from '../societe-interim.model';

export type EntityResponseType = HttpResponse<ISocieteInterim>;
export type EntityArrayResponseType = HttpResponse<ISocieteInterim[]>;

@Injectable({ providedIn: 'root' })
export class SocieteInterimService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/societe-interims', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/societe-interims', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(societeInterim: ISocieteInterim): Observable<EntityResponseType> {
    return this.http.post<ISocieteInterim>(this.resourceUrl, societeInterim, { observe: 'response' });
  }

  update(societeInterim: ISocieteInterim): Observable<EntityResponseType> {
    return this.http.put<ISocieteInterim>(`${this.resourceUrl}/${getSocieteInterimIdentifier(societeInterim) as number}`, societeInterim, {
      observe: 'response',
    });
  }

  partialUpdate(societeInterim: ISocieteInterim): Observable<EntityResponseType> {
    return this.http.patch<ISocieteInterim>(
      `${this.resourceUrl}/${getSocieteInterimIdentifier(societeInterim) as number}`,
      societeInterim,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISocieteInterim>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISocieteInterim[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISocieteInterim[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addSocieteInterimToCollectionIfMissing(
    societeInterimCollection: ISocieteInterim[],
    ...societeInterimsToCheck: (ISocieteInterim | null | undefined)[]
  ): ISocieteInterim[] {
    const societeInterims: ISocieteInterim[] = societeInterimsToCheck.filter(isPresent);
    if (societeInterims.length > 0) {
      const societeInterimCollectionIdentifiers = societeInterimCollection.map(
        societeInterimItem => getSocieteInterimIdentifier(societeInterimItem)!
      );
      const societeInterimsToAdd = societeInterims.filter(societeInterimItem => {
        const societeInterimIdentifier = getSocieteInterimIdentifier(societeInterimItem);
        if (societeInterimIdentifier == null || societeInterimCollectionIdentifiers.includes(societeInterimIdentifier)) {
          return false;
        }
        societeInterimCollectionIdentifiers.push(societeInterimIdentifier);
        return true;
      });
      return [...societeInterimsToAdd, ...societeInterimCollection];
    }
    return societeInterimCollection;
  }
}
