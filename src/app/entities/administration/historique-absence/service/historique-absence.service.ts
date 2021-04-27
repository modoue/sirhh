import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IHistoriqueAbsence, getHistoriqueAbsenceIdentifier } from '../historique-absence.model';

export type EntityResponseType = HttpResponse<IHistoriqueAbsence>;
export type EntityArrayResponseType = HttpResponse<IHistoriqueAbsence[]>;

@Injectable({ providedIn: 'root' })
export class HistoriqueAbsenceService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/historique-absences', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/historique-absences', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(historiqueAbsence: IHistoriqueAbsence): Observable<EntityResponseType> {
    return this.http.post<IHistoriqueAbsence>(this.resourceUrl, historiqueAbsence, { observe: 'response' });
  }

  update(historiqueAbsence: IHistoriqueAbsence): Observable<EntityResponseType> {
    return this.http.put<IHistoriqueAbsence>(
      `${this.resourceUrl}/${getHistoriqueAbsenceIdentifier(historiqueAbsence) as number}`,
      historiqueAbsence,
      { observe: 'response' }
    );
  }

  partialUpdate(historiqueAbsence: IHistoriqueAbsence): Observable<EntityResponseType> {
    return this.http.patch<IHistoriqueAbsence>(
      `${this.resourceUrl}/${getHistoriqueAbsenceIdentifier(historiqueAbsence) as number}`,
      historiqueAbsence,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHistoriqueAbsence>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHistoriqueAbsence[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHistoriqueAbsence[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addHistoriqueAbsenceToCollectionIfMissing(
    historiqueAbsenceCollection: IHistoriqueAbsence[],
    ...historiqueAbsencesToCheck: (IHistoriqueAbsence | null | undefined)[]
  ): IHistoriqueAbsence[] {
    const historiqueAbsences: IHistoriqueAbsence[] = historiqueAbsencesToCheck.filter(isPresent);
    if (historiqueAbsences.length > 0) {
      const historiqueAbsenceCollectionIdentifiers = historiqueAbsenceCollection.map(
        historiqueAbsenceItem => getHistoriqueAbsenceIdentifier(historiqueAbsenceItem)!
      );
      const historiqueAbsencesToAdd = historiqueAbsences.filter(historiqueAbsenceItem => {
        const historiqueAbsenceIdentifier = getHistoriqueAbsenceIdentifier(historiqueAbsenceItem);
        if (historiqueAbsenceIdentifier == null || historiqueAbsenceCollectionIdentifiers.includes(historiqueAbsenceIdentifier)) {
          return false;
        }
        historiqueAbsenceCollectionIdentifiers.push(historiqueAbsenceIdentifier);
        return true;
      });
      return [...historiqueAbsencesToAdd, ...historiqueAbsenceCollection];
    }
    return historiqueAbsenceCollection;
  }
}
