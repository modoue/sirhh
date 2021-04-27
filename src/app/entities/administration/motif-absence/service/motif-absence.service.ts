import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IMotifAbsence, getMotifAbsenceIdentifier } from '../motif-absence.model';

export type EntityResponseType = HttpResponse<IMotifAbsence>;
export type EntityArrayResponseType = HttpResponse<IMotifAbsence[]>;

@Injectable({ providedIn: 'root' })
export class MotifAbsenceService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/motif-absences', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/motif-absences', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(motifAbsence: IMotifAbsence): Observable<EntityResponseType> {
    return this.http.post<IMotifAbsence>(this.resourceUrl, motifAbsence, { observe: 'response' });
  }

  update(motifAbsence: IMotifAbsence): Observable<EntityResponseType> {
    return this.http.put<IMotifAbsence>(`${this.resourceUrl}/${getMotifAbsenceIdentifier(motifAbsence) as number}`, motifAbsence, {
      observe: 'response',
    });
  }

  partialUpdate(motifAbsence: IMotifAbsence): Observable<EntityResponseType> {
    return this.http.patch<IMotifAbsence>(`${this.resourceUrl}/${getMotifAbsenceIdentifier(motifAbsence) as number}`, motifAbsence, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMotifAbsence>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMotifAbsence[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMotifAbsence[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addMotifAbsenceToCollectionIfMissing(
    motifAbsenceCollection: IMotifAbsence[],
    ...motifAbsencesToCheck: (IMotifAbsence | null | undefined)[]
  ): IMotifAbsence[] {
    const motifAbsences: IMotifAbsence[] = motifAbsencesToCheck.filter(isPresent);
    if (motifAbsences.length > 0) {
      const motifAbsenceCollectionIdentifiers = motifAbsenceCollection.map(
        motifAbsenceItem => getMotifAbsenceIdentifier(motifAbsenceItem)!
      );
      const motifAbsencesToAdd = motifAbsences.filter(motifAbsenceItem => {
        const motifAbsenceIdentifier = getMotifAbsenceIdentifier(motifAbsenceItem);
        if (motifAbsenceIdentifier == null || motifAbsenceCollectionIdentifiers.includes(motifAbsenceIdentifier)) {
          return false;
        }
        motifAbsenceCollectionIdentifiers.push(motifAbsenceIdentifier);
        return true;
      });
      return [...motifAbsencesToAdd, ...motifAbsenceCollection];
    }
    return motifAbsenceCollection;
  }
}
