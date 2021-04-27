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
import { IDiplomeAgent, getDiplomeAgentIdentifier } from '../diplome-agent.model';

export type EntityResponseType = HttpResponse<IDiplomeAgent>;
export type EntityArrayResponseType = HttpResponse<IDiplomeAgent[]>;

@Injectable({ providedIn: 'root' })
export class DiplomeAgentService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/diplome-agents', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/diplome-agents', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(diplomeAgent: IDiplomeAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(diplomeAgent);
    return this.http
      .post<IDiplomeAgent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(diplomeAgent: IDiplomeAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(diplomeAgent);
    return this.http
      .put<IDiplomeAgent>(`${this.resourceUrl}/${getDiplomeAgentIdentifier(diplomeAgent) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(diplomeAgent: IDiplomeAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(diplomeAgent);
    return this.http
      .patch<IDiplomeAgent>(`${this.resourceUrl}/${getDiplomeAgentIdentifier(diplomeAgent) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDiplomeAgent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDiplomeAgent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDiplomeAgent[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addDiplomeAgentToCollectionIfMissing(
    diplomeAgentCollection: IDiplomeAgent[],
    ...diplomeAgentsToCheck: (IDiplomeAgent | null | undefined)[]
  ): IDiplomeAgent[] {
    const diplomeAgents: IDiplomeAgent[] = diplomeAgentsToCheck.filter(isPresent);
    if (diplomeAgents.length > 0) {
      const diplomeAgentCollectionIdentifiers = diplomeAgentCollection.map(
        diplomeAgentItem => getDiplomeAgentIdentifier(diplomeAgentItem)!
      );
      const diplomeAgentsToAdd = diplomeAgents.filter(diplomeAgentItem => {
        const diplomeAgentIdentifier = getDiplomeAgentIdentifier(diplomeAgentItem);
        if (diplomeAgentIdentifier == null || diplomeAgentCollectionIdentifiers.includes(diplomeAgentIdentifier)) {
          return false;
        }
        diplomeAgentCollectionIdentifiers.push(diplomeAgentIdentifier);
        return true;
      });
      return [...diplomeAgentsToAdd, ...diplomeAgentCollection];
    }
    return diplomeAgentCollection;
  }

  protected convertDateFromClient(diplomeAgent: IDiplomeAgent): IDiplomeAgent {
    return Object.assign({}, diplomeAgent, {
      dateObtentionDiplome: diplomeAgent.dateObtentionDiplome?.isValid()
        ? diplomeAgent.dateObtentionDiplome.format(DATE_FORMAT)
        : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateObtentionDiplome = res.body.dateObtentionDiplome ? dayjs(res.body.dateObtentionDiplome) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((diplomeAgent: IDiplomeAgent) => {
        diplomeAgent.dateObtentionDiplome = diplomeAgent.dateObtentionDiplome ? dayjs(diplomeAgent.dateObtentionDiplome) : undefined;
      });
    }
    return res;
  }
}
