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
import { ISanctionAgent, getSanctionAgentIdentifier } from '../sanction-agent.model';

export type EntityResponseType = HttpResponse<ISanctionAgent>;
export type EntityArrayResponseType = HttpResponse<ISanctionAgent[]>;

@Injectable({ providedIn: 'root' })
export class SanctionAgentService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/sanction-agents', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/sanction-agents', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(sanctionAgent: ISanctionAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sanctionAgent);
    return this.http
      .post<ISanctionAgent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(sanctionAgent: ISanctionAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sanctionAgent);
    return this.http
      .put<ISanctionAgent>(`${this.resourceUrl}/${getSanctionAgentIdentifier(sanctionAgent) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(sanctionAgent: ISanctionAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sanctionAgent);
    return this.http
      .patch<ISanctionAgent>(`${this.resourceUrl}/${getSanctionAgentIdentifier(sanctionAgent) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISanctionAgent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISanctionAgent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISanctionAgent[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addSanctionAgentToCollectionIfMissing(
    sanctionAgentCollection: ISanctionAgent[],
    ...sanctionAgentsToCheck: (ISanctionAgent | null | undefined)[]
  ): ISanctionAgent[] {
    const sanctionAgents: ISanctionAgent[] = sanctionAgentsToCheck.filter(isPresent);
    if (sanctionAgents.length > 0) {
      const sanctionAgentCollectionIdentifiers = sanctionAgentCollection.map(
        sanctionAgentItem => getSanctionAgentIdentifier(sanctionAgentItem)!
      );
      const sanctionAgentsToAdd = sanctionAgents.filter(sanctionAgentItem => {
        const sanctionAgentIdentifier = getSanctionAgentIdentifier(sanctionAgentItem);
        if (sanctionAgentIdentifier == null || sanctionAgentCollectionIdentifiers.includes(sanctionAgentIdentifier)) {
          return false;
        }
        sanctionAgentCollectionIdentifiers.push(sanctionAgentIdentifier);
        return true;
      });
      return [...sanctionAgentsToAdd, ...sanctionAgentCollection];
    }
    return sanctionAgentCollection;
  }

  protected convertDateFromClient(sanctionAgent: ISanctionAgent): ISanctionAgent {
    return Object.assign({}, sanctionAgent, {
      dateSanction: sanctionAgent.dateSanction?.isValid() ? sanctionAgent.dateSanction.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateSanction = res.body.dateSanction ? dayjs(res.body.dateSanction) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((sanctionAgent: ISanctionAgent) => {
        sanctionAgent.dateSanction = sanctionAgent.dateSanction ? dayjs(sanctionAgent.dateSanction) : undefined;
      });
    }
    return res;
  }
}
