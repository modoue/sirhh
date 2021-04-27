import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ISanction, getSanctionIdentifier } from '../sanction.model';

export type EntityResponseType = HttpResponse<ISanction>;
export type EntityArrayResponseType = HttpResponse<ISanction[]>;

@Injectable({ providedIn: 'root' })
export class SanctionService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/sanctions', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/sanctions', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(sanction: ISanction): Observable<EntityResponseType> {
    return this.http.post<ISanction>(this.resourceUrl, sanction, { observe: 'response' });
  }

  update(sanction: ISanction): Observable<EntityResponseType> {
    return this.http.put<ISanction>(`${this.resourceUrl}/${getSanctionIdentifier(sanction) as number}`, sanction, { observe: 'response' });
  }

  partialUpdate(sanction: ISanction): Observable<EntityResponseType> {
    return this.http.patch<ISanction>(`${this.resourceUrl}/${getSanctionIdentifier(sanction) as number}`, sanction, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISanction>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISanction[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISanction[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addSanctionToCollectionIfMissing(sanctionCollection: ISanction[], ...sanctionsToCheck: (ISanction | null | undefined)[]): ISanction[] {
    const sanctions: ISanction[] = sanctionsToCheck.filter(isPresent);
    if (sanctions.length > 0) {
      const sanctionCollectionIdentifiers = sanctionCollection.map(sanctionItem => getSanctionIdentifier(sanctionItem)!);
      const sanctionsToAdd = sanctions.filter(sanctionItem => {
        const sanctionIdentifier = getSanctionIdentifier(sanctionItem);
        if (sanctionIdentifier == null || sanctionCollectionIdentifiers.includes(sanctionIdentifier)) {
          return false;
        }
        sanctionCollectionIdentifiers.push(sanctionIdentifier);
        return true;
      });
      return [...sanctionsToAdd, ...sanctionCollection];
    }
    return sanctionCollection;
  }
}
