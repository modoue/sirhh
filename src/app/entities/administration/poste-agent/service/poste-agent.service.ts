import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IPosteAgent, getPosteAgentIdentifier } from '../poste-agent.model';

export type EntityResponseType = HttpResponse<IPosteAgent>;
export type EntityArrayResponseType = HttpResponse<IPosteAgent[]>;

@Injectable({ providedIn: 'root' })
export class PosteAgentService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/poste-agents', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/poste-agents', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(posteAgent: IPosteAgent): Observable<EntityResponseType> {
    return this.http.post<IPosteAgent>(this.resourceUrl, posteAgent, { observe: 'response' });
  }

  update(posteAgent: IPosteAgent): Observable<EntityResponseType> {
    return this.http.put<IPosteAgent>(`${this.resourceUrl}/${getPosteAgentIdentifier(posteAgent) as number}`, posteAgent, {
      observe: 'response',
    });
  }

  partialUpdate(posteAgent: IPosteAgent): Observable<EntityResponseType> {
    return this.http.patch<IPosteAgent>(`${this.resourceUrl}/${getPosteAgentIdentifier(posteAgent) as number}`, posteAgent, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPosteAgent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPosteAgent[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPosteAgent[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addPosteAgentToCollectionIfMissing(
    posteAgentCollection: IPosteAgent[],
    ...posteAgentsToCheck: (IPosteAgent | null | undefined)[]
  ): IPosteAgent[] {
    const posteAgents: IPosteAgent[] = posteAgentsToCheck.filter(isPresent);
    if (posteAgents.length > 0) {
      const posteAgentCollectionIdentifiers = posteAgentCollection.map(posteAgentItem => getPosteAgentIdentifier(posteAgentItem)!);
      const posteAgentsToAdd = posteAgents.filter(posteAgentItem => {
        const posteAgentIdentifier = getPosteAgentIdentifier(posteAgentItem);
        if (posteAgentIdentifier == null || posteAgentCollectionIdentifiers.includes(posteAgentIdentifier)) {
          return false;
        }
        posteAgentCollectionIdentifiers.push(posteAgentIdentifier);
        return true;
      });
      return [...posteAgentsToAdd, ...posteAgentCollection];
    }
    return posteAgentCollection;
  }
}
