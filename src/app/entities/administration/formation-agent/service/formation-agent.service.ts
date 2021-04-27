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
import { IFormationAgent, getFormationAgentIdentifier } from '../formation-agent.model';

export type EntityResponseType = HttpResponse<IFormationAgent>;
export type EntityArrayResponseType = HttpResponse<IFormationAgent[]>;

@Injectable({ providedIn: 'root' })
export class FormationAgentService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/formation-agents', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/formation-agents', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(formationAgent: IFormationAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(formationAgent);
    return this.http
      .post<IFormationAgent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(formationAgent: IFormationAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(formationAgent);
    return this.http
      .put<IFormationAgent>(`${this.resourceUrl}/${getFormationAgentIdentifier(formationAgent) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(formationAgent: IFormationAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(formationAgent);
    return this.http
      .patch<IFormationAgent>(`${this.resourceUrl}/${getFormationAgentIdentifier(formationAgent) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFormationAgent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFormationAgent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFormationAgent[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addFormationAgentToCollectionIfMissing(
    formationAgentCollection: IFormationAgent[],
    ...formationAgentsToCheck: (IFormationAgent | null | undefined)[]
  ): IFormationAgent[] {
    const formationAgents: IFormationAgent[] = formationAgentsToCheck.filter(isPresent);
    if (formationAgents.length > 0) {
      const formationAgentCollectionIdentifiers = formationAgentCollection.map(
        formationAgentItem => getFormationAgentIdentifier(formationAgentItem)!
      );
      const formationAgentsToAdd = formationAgents.filter(formationAgentItem => {
        const formationAgentIdentifier = getFormationAgentIdentifier(formationAgentItem);
        if (formationAgentIdentifier == null || formationAgentCollectionIdentifiers.includes(formationAgentIdentifier)) {
          return false;
        }
        formationAgentCollectionIdentifiers.push(formationAgentIdentifier);
        return true;
      });
      return [...formationAgentsToAdd, ...formationAgentCollection];
    }
    return formationAgentCollection;
  }

  protected convertDateFromClient(formationAgent: IFormationAgent): IFormationAgent {
    return Object.assign({}, formationAgent, {
      dateSuivi: formationAgent.dateSuivi?.isValid() ? formationAgent.dateSuivi.format(DATE_FORMAT) : undefined,
      datePrevu: formationAgent.datePrevu?.isValid() ? formationAgent.datePrevu.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateSuivi = res.body.dateSuivi ? dayjs(res.body.dateSuivi) : undefined;
      res.body.datePrevu = res.body.datePrevu ? dayjs(res.body.datePrevu) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((formationAgent: IFormationAgent) => {
        formationAgent.dateSuivi = formationAgent.dateSuivi ? dayjs(formationAgent.dateSuivi) : undefined;
        formationAgent.datePrevu = formationAgent.datePrevu ? dayjs(formationAgent.datePrevu) : undefined;
      });
    }
    return res;
  }
}
