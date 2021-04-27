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
import { IRegimeHoraireAgent, getRegimeHoraireAgentIdentifier } from '../regime-horaire-agent.model';

export type EntityResponseType = HttpResponse<IRegimeHoraireAgent>;
export type EntityArrayResponseType = HttpResponse<IRegimeHoraireAgent[]>;

@Injectable({ providedIn: 'root' })
export class RegimeHoraireAgentService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/regime-horaire-agents', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/regime-horaire-agents', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(regimeHoraireAgent: IRegimeHoraireAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(regimeHoraireAgent);
    return this.http
      .post<IRegimeHoraireAgent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(regimeHoraireAgent: IRegimeHoraireAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(regimeHoraireAgent);
    return this.http
      .put<IRegimeHoraireAgent>(`${this.resourceUrl}/${getRegimeHoraireAgentIdentifier(regimeHoraireAgent) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(regimeHoraireAgent: IRegimeHoraireAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(regimeHoraireAgent);
    return this.http
      .patch<IRegimeHoraireAgent>(`${this.resourceUrl}/${getRegimeHoraireAgentIdentifier(regimeHoraireAgent) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRegimeHoraireAgent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRegimeHoraireAgent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRegimeHoraireAgent[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addRegimeHoraireAgentToCollectionIfMissing(
    regimeHoraireAgentCollection: IRegimeHoraireAgent[],
    ...regimeHoraireAgentsToCheck: (IRegimeHoraireAgent | null | undefined)[]
  ): IRegimeHoraireAgent[] {
    const regimeHoraireAgents: IRegimeHoraireAgent[] = regimeHoraireAgentsToCheck.filter(isPresent);
    if (regimeHoraireAgents.length > 0) {
      const regimeHoraireAgentCollectionIdentifiers = regimeHoraireAgentCollection.map(
        regimeHoraireAgentItem => getRegimeHoraireAgentIdentifier(regimeHoraireAgentItem)!
      );
      const regimeHoraireAgentsToAdd = regimeHoraireAgents.filter(regimeHoraireAgentItem => {
        const regimeHoraireAgentIdentifier = getRegimeHoraireAgentIdentifier(regimeHoraireAgentItem);
        if (regimeHoraireAgentIdentifier == null || regimeHoraireAgentCollectionIdentifiers.includes(regimeHoraireAgentIdentifier)) {
          return false;
        }
        regimeHoraireAgentCollectionIdentifiers.push(regimeHoraireAgentIdentifier);
        return true;
      });
      return [...regimeHoraireAgentsToAdd, ...regimeHoraireAgentCollection];
    }
    return regimeHoraireAgentCollection;
  }

  protected convertDateFromClient(regimeHoraireAgent: IRegimeHoraireAgent): IRegimeHoraireAgent {
    return Object.assign({}, regimeHoraireAgent, {
      dateEffet: regimeHoraireAgent.dateEffet?.isValid() ? regimeHoraireAgent.dateEffet.format(DATE_FORMAT) : undefined,
      dateFinEffet: regimeHoraireAgent.dateFinEffet?.isValid() ? regimeHoraireAgent.dateFinEffet.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateEffet = res.body.dateEffet ? dayjs(res.body.dateEffet) : undefined;
      res.body.dateFinEffet = res.body.dateFinEffet ? dayjs(res.body.dateFinEffet) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((regimeHoraireAgent: IRegimeHoraireAgent) => {
        regimeHoraireAgent.dateEffet = regimeHoraireAgent.dateEffet ? dayjs(regimeHoraireAgent.dateEffet) : undefined;
        regimeHoraireAgent.dateFinEffet = regimeHoraireAgent.dateFinEffet ? dayjs(regimeHoraireAgent.dateFinEffet) : undefined;
      });
    }
    return res;
  }
}
