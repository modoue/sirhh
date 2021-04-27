import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ITitreAgent, getTitreAgentIdentifier } from '../titre-agent.model';

export type EntityResponseType = HttpResponse<ITitreAgent>;
export type EntityArrayResponseType = HttpResponse<ITitreAgent[]>;

@Injectable({ providedIn: 'root' })
export class TitreAgentService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/titre-agents', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/titre-agents', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(titreAgent: ITitreAgent): Observable<EntityResponseType> {
    return this.http.post<ITitreAgent>(this.resourceUrl, titreAgent, { observe: 'response' });
  }

  update(titreAgent: ITitreAgent): Observable<EntityResponseType> {
    return this.http.put<ITitreAgent>(`${this.resourceUrl}/${getTitreAgentIdentifier(titreAgent) as number}`, titreAgent, {
      observe: 'response',
    });
  }

  partialUpdate(titreAgent: ITitreAgent): Observable<EntityResponseType> {
    return this.http.patch<ITitreAgent>(`${this.resourceUrl}/${getTitreAgentIdentifier(titreAgent) as number}`, titreAgent, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITitreAgent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITitreAgent[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITitreAgent[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addTitreAgentToCollectionIfMissing(
    titreAgentCollection: ITitreAgent[],
    ...titreAgentsToCheck: (ITitreAgent | null | undefined)[]
  ): ITitreAgent[] {
    const titreAgents: ITitreAgent[] = titreAgentsToCheck.filter(isPresent);
    if (titreAgents.length > 0) {
      const titreAgentCollectionIdentifiers = titreAgentCollection.map(titreAgentItem => getTitreAgentIdentifier(titreAgentItem)!);
      const titreAgentsToAdd = titreAgents.filter(titreAgentItem => {
        const titreAgentIdentifier = getTitreAgentIdentifier(titreAgentItem);
        if (titreAgentIdentifier == null || titreAgentCollectionIdentifiers.includes(titreAgentIdentifier)) {
          return false;
        }
        titreAgentCollectionIdentifiers.push(titreAgentIdentifier);
        return true;
      });
      return [...titreAgentsToAdd, ...titreAgentCollection];
    }
    return titreAgentCollection;
  }
}
