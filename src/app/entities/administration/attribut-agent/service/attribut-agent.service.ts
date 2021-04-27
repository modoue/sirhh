import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IAttributAgent, getAttributAgentIdentifier } from '../attribut-agent.model';

export type EntityResponseType = HttpResponse<IAttributAgent>;
export type EntityArrayResponseType = HttpResponse<IAttributAgent[]>;

@Injectable({ providedIn: 'root' })
export class AttributAgentService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/attribut-agents', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/attribut-agents', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(attributAgent: IAttributAgent): Observable<EntityResponseType> {
    return this.http.post<IAttributAgent>(this.resourceUrl, attributAgent, { observe: 'response' });
  }

  update(attributAgent: IAttributAgent): Observable<EntityResponseType> {
    return this.http.put<IAttributAgent>(`${this.resourceUrl}/${getAttributAgentIdentifier(attributAgent) as number}`, attributAgent, {
      observe: 'response',
    });
  }

  partialUpdate(attributAgent: IAttributAgent): Observable<EntityResponseType> {
    return this.http.patch<IAttributAgent>(`${this.resourceUrl}/${getAttributAgentIdentifier(attributAgent) as number}`, attributAgent, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAttributAgent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAttributAgent[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAttributAgent[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addAttributAgentToCollectionIfMissing(
    attributAgentCollection: IAttributAgent[],
    ...attributAgentsToCheck: (IAttributAgent | null | undefined)[]
  ): IAttributAgent[] {
    const attributAgents: IAttributAgent[] = attributAgentsToCheck.filter(isPresent);
    if (attributAgents.length > 0) {
      const attributAgentCollectionIdentifiers = attributAgentCollection.map(
        attributAgentItem => getAttributAgentIdentifier(attributAgentItem)!
      );
      const attributAgentsToAdd = attributAgents.filter(attributAgentItem => {
        const attributAgentIdentifier = getAttributAgentIdentifier(attributAgentItem);
        if (attributAgentIdentifier == null || attributAgentCollectionIdentifiers.includes(attributAgentIdentifier)) {
          return false;
        }
        attributAgentCollectionIdentifiers.push(attributAgentIdentifier);
        return true;
      });
      return [...attributAgentsToAdd, ...attributAgentCollection];
    }
    return attributAgentCollection;
  }
}
