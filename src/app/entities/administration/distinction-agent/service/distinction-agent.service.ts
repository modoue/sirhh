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
import { IDistinctionAgent, getDistinctionAgentIdentifier } from '../distinction-agent.model';

export type EntityResponseType = HttpResponse<IDistinctionAgent>;
export type EntityArrayResponseType = HttpResponse<IDistinctionAgent[]>;

@Injectable({ providedIn: 'root' })
export class DistinctionAgentService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/distinction-agents', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/distinction-agents', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(distinctionAgent: IDistinctionAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(distinctionAgent);
    return this.http
      .post<IDistinctionAgent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(distinctionAgent: IDistinctionAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(distinctionAgent);
    return this.http
      .put<IDistinctionAgent>(`${this.resourceUrl}/${getDistinctionAgentIdentifier(distinctionAgent) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(distinctionAgent: IDistinctionAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(distinctionAgent);
    return this.http
      .patch<IDistinctionAgent>(`${this.resourceUrl}/${getDistinctionAgentIdentifier(distinctionAgent) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDistinctionAgent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDistinctionAgent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDistinctionAgent[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addDistinctionAgentToCollectionIfMissing(
    distinctionAgentCollection: IDistinctionAgent[],
    ...distinctionAgentsToCheck: (IDistinctionAgent | null | undefined)[]
  ): IDistinctionAgent[] {
    const distinctionAgents: IDistinctionAgent[] = distinctionAgentsToCheck.filter(isPresent);
    if (distinctionAgents.length > 0) {
      const distinctionAgentCollectionIdentifiers = distinctionAgentCollection.map(
        distinctionAgentItem => getDistinctionAgentIdentifier(distinctionAgentItem)!
      );
      const distinctionAgentsToAdd = distinctionAgents.filter(distinctionAgentItem => {
        const distinctionAgentIdentifier = getDistinctionAgentIdentifier(distinctionAgentItem);
        if (distinctionAgentIdentifier == null || distinctionAgentCollectionIdentifiers.includes(distinctionAgentIdentifier)) {
          return false;
        }
        distinctionAgentCollectionIdentifiers.push(distinctionAgentIdentifier);
        return true;
      });
      return [...distinctionAgentsToAdd, ...distinctionAgentCollection];
    }
    return distinctionAgentCollection;
  }

  protected convertDateFromClient(distinctionAgent: IDistinctionAgent): IDistinctionAgent {
    return Object.assign({}, distinctionAgent, {
      dateDistinction: distinctionAgent.dateDistinction?.isValid() ? distinctionAgent.dateDistinction.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDistinction = res.body.dateDistinction ? dayjs(res.body.dateDistinction) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((distinctionAgent: IDistinctionAgent) => {
        distinctionAgent.dateDistinction = distinctionAgent.dateDistinction ? dayjs(distinctionAgent.dateDistinction) : undefined;
      });
    }
    return res;
  }
}
