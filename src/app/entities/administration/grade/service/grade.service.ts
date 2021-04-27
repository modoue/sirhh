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
import { IGrade, getGradeIdentifier } from '../grade.model';

export type EntityResponseType = HttpResponse<IGrade>;
export type EntityArrayResponseType = HttpResponse<IGrade[]>;

@Injectable({ providedIn: 'root' })
export class GradeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/grades', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/grades', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(grade: IGrade): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(grade);
    return this.http
      .post<IGrade>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(grade: IGrade): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(grade);
    return this.http
      .put<IGrade>(`${this.resourceUrl}/${getGradeIdentifier(grade) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(grade: IGrade): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(grade);
    return this.http
      .patch<IGrade>(`${this.resourceUrl}/${getGradeIdentifier(grade) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGrade>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGrade[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGrade[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addGradeToCollectionIfMissing(gradeCollection: IGrade[], ...gradesToCheck: (IGrade | null | undefined)[]): IGrade[] {
    const grades: IGrade[] = gradesToCheck.filter(isPresent);
    if (grades.length > 0) {
      const gradeCollectionIdentifiers = gradeCollection.map(gradeItem => getGradeIdentifier(gradeItem)!);
      const gradesToAdd = grades.filter(gradeItem => {
        const gradeIdentifier = getGradeIdentifier(gradeItem);
        if (gradeIdentifier == null || gradeCollectionIdentifiers.includes(gradeIdentifier)) {
          return false;
        }
        gradeCollectionIdentifiers.push(gradeIdentifier);
        return true;
      });
      return [...gradesToAdd, ...gradeCollection];
    }
    return gradeCollection;
  }

  protected convertDateFromClient(grade: IGrade): IGrade {
    return Object.assign({}, grade, {
      societe: grade.societe?.isValid() ? grade.societe.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.societe = res.body.societe ? dayjs(res.body.societe) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((grade: IGrade) => {
        grade.societe = grade.societe ? dayjs(grade.societe) : undefined;
      });
    }
    return res;
  }
}
