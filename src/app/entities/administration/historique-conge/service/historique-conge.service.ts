import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IHistoriqueConge, getHistoriqueCongeIdentifier } from '../historique-conge.model';

export type EntityResponseType = HttpResponse<IHistoriqueConge>;
export type EntityArrayResponseType = HttpResponse<IHistoriqueConge[]>;

@Injectable({ providedIn: 'root' })
export class HistoriqueCongeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/historique-conges', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/historique-conges', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(historiqueConge: IHistoriqueConge): Observable<EntityResponseType> {
    return this.http.post<IHistoriqueConge>(this.resourceUrl, historiqueConge, { observe: 'response' });
  }

  update(historiqueConge: IHistoriqueConge): Observable<EntityResponseType> {
    return this.http.put<IHistoriqueConge>(
      `${this.resourceUrl}/${getHistoriqueCongeIdentifier(historiqueConge) as number}`,
      historiqueConge,
      { observe: 'response' }
    );
  }

  partialUpdate(historiqueConge: IHistoriqueConge): Observable<EntityResponseType> {
    return this.http.patch<IHistoriqueConge>(
      `${this.resourceUrl}/${getHistoriqueCongeIdentifier(historiqueConge) as number}`,
      historiqueConge,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHistoriqueConge>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHistoriqueConge[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHistoriqueConge[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addHistoriqueCongeToCollectionIfMissing(
    historiqueCongeCollection: IHistoriqueConge[],
    ...historiqueCongesToCheck: (IHistoriqueConge | null | undefined)[]
  ): IHistoriqueConge[] {
    const historiqueConges: IHistoriqueConge[] = historiqueCongesToCheck.filter(isPresent);
    if (historiqueConges.length > 0) {
      const historiqueCongeCollectionIdentifiers = historiqueCongeCollection.map(
        historiqueCongeItem => getHistoriqueCongeIdentifier(historiqueCongeItem)!
      );
      const historiqueCongesToAdd = historiqueConges.filter(historiqueCongeItem => {
        const historiqueCongeIdentifier = getHistoriqueCongeIdentifier(historiqueCongeItem);
        if (historiqueCongeIdentifier == null || historiqueCongeCollectionIdentifiers.includes(historiqueCongeIdentifier)) {
          return false;
        }
        historiqueCongeCollectionIdentifiers.push(historiqueCongeIdentifier);
        return true;
      });
      return [...historiqueCongesToAdd, ...historiqueCongeCollection];
    }
    return historiqueCongeCollection;
  }
}
