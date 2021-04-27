import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IElementsAgent, getElementsAgentIdentifier } from '../elements-agent.model';

export type EntityResponseType = HttpResponse<IElementsAgent>;
export type EntityArrayResponseType = HttpResponse<IElementsAgent[]>;

@Injectable({ providedIn: 'root' })
export class ElementsAgentService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/elements-agents', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/elements-agents', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(elementsAgent: IElementsAgent): Observable<EntityResponseType> {
    return this.http.post<IElementsAgent>(this.resourceUrl, elementsAgent, { observe: 'response' });
  }

  update(elementsAgent: IElementsAgent): Observable<EntityResponseType> {
    return this.http.put<IElementsAgent>(`${this.resourceUrl}/${getElementsAgentIdentifier(elementsAgent) as number}`, elementsAgent, {
      observe: 'response',
    });
  }

  partialUpdate(elementsAgent: IElementsAgent): Observable<EntityResponseType> {
    return this.http.patch<IElementsAgent>(`${this.resourceUrl}/${getElementsAgentIdentifier(elementsAgent) as number}`, elementsAgent, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IElementsAgent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IElementsAgent[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IElementsAgent[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addElementsAgentToCollectionIfMissing(
    elementsAgentCollection: IElementsAgent[],
    ...elementsAgentsToCheck: (IElementsAgent | null | undefined)[]
  ): IElementsAgent[] {
    const elementsAgents: IElementsAgent[] = elementsAgentsToCheck.filter(isPresent);
    if (elementsAgents.length > 0) {
      const elementsAgentCollectionIdentifiers = elementsAgentCollection.map(
        elementsAgentItem => getElementsAgentIdentifier(elementsAgentItem)!
      );
      const elementsAgentsToAdd = elementsAgents.filter(elementsAgentItem => {
        const elementsAgentIdentifier = getElementsAgentIdentifier(elementsAgentItem);
        if (elementsAgentIdentifier == null || elementsAgentCollectionIdentifiers.includes(elementsAgentIdentifier)) {
          return false;
        }
        elementsAgentCollectionIdentifiers.push(elementsAgentIdentifier);
        return true;
      });
      return [...elementsAgentsToAdd, ...elementsAgentCollection];
    }
    return elementsAgentCollection;
  }
}
