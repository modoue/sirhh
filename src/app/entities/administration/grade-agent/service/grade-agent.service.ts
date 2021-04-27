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
import { IGradeAgent, getGradeAgentIdentifier } from '../grade-agent.model';

export type EntityResponseType = HttpResponse<IGradeAgent>;
export type EntityArrayResponseType = HttpResponse<IGradeAgent[]>;

@Injectable({ providedIn: 'root' })
export class GradeAgentService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/grade-agents', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/grade-agents', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(gradeAgent: IGradeAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(gradeAgent);
    return this.http
      .post<IGradeAgent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(gradeAgent: IGradeAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(gradeAgent);
    return this.http
      .put<IGradeAgent>(`${this.resourceUrl}/${getGradeAgentIdentifier(gradeAgent) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(gradeAgent: IGradeAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(gradeAgent);
    return this.http
      .patch<IGradeAgent>(`${this.resourceUrl}/${getGradeAgentIdentifier(gradeAgent) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGradeAgent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGradeAgent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGradeAgent[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addGradeAgentToCollectionIfMissing(
    gradeAgentCollection: IGradeAgent[],
    ...gradeAgentsToCheck: (IGradeAgent | null | undefined)[]
  ): IGradeAgent[] {
    const gradeAgents: IGradeAgent[] = gradeAgentsToCheck.filter(isPresent);
    if (gradeAgents.length > 0) {
      const gradeAgentCollectionIdentifiers = gradeAgentCollection.map(gradeAgentItem => getGradeAgentIdentifier(gradeAgentItem)!);
      const gradeAgentsToAdd = gradeAgents.filter(gradeAgentItem => {
        const gradeAgentIdentifier = getGradeAgentIdentifier(gradeAgentItem);
        if (gradeAgentIdentifier == null || gradeAgentCollectionIdentifiers.includes(gradeAgentIdentifier)) {
          return false;
        }
        gradeAgentCollectionIdentifiers.push(gradeAgentIdentifier);
        return true;
      });
      return [...gradeAgentsToAdd, ...gradeAgentCollection];
    }
    return gradeAgentCollection;
  }

  protected convertDateFromClient(gradeAgent: IGradeAgent): IGradeAgent {
    return Object.assign({}, gradeAgent, {
      dateObtentionGrade: gradeAgent.dateObtentionGrade?.isValid() ? gradeAgent.dateObtentionGrade.format(DATE_FORMAT) : undefined,
      dateFinGrade: gradeAgent.dateFinGrade?.isValid() ? gradeAgent.dateFinGrade.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateObtentionGrade = res.body.dateObtentionGrade ? dayjs(res.body.dateObtentionGrade) : undefined;
      res.body.dateFinGrade = res.body.dateFinGrade ? dayjs(res.body.dateFinGrade) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((gradeAgent: IGradeAgent) => {
        gradeAgent.dateObtentionGrade = gradeAgent.dateObtentionGrade ? dayjs(gradeAgent.dateObtentionGrade) : undefined;
        gradeAgent.dateFinGrade = gradeAgent.dateFinGrade ? dayjs(gradeAgent.dateFinGrade) : undefined;
      });
    }
    return res;
  }
}
