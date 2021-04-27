import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IEmploi, getEmploiIdentifier } from '../emploi.model';

export type EntityResponseType = HttpResponse<IEmploi>;
export type EntityArrayResponseType = HttpResponse<IEmploi[]>;

@Injectable({ providedIn: 'root' })
export class EmploiService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/emplois', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/emplois', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(emploi: IEmploi): Observable<EntityResponseType> {
    return this.http.post<IEmploi>(this.resourceUrl, emploi, { observe: 'response' });
  }

  update(emploi: IEmploi): Observable<EntityResponseType> {
    return this.http.put<IEmploi>(`${this.resourceUrl}/${getEmploiIdentifier(emploi) as number}`, emploi, { observe: 'response' });
  }

  partialUpdate(emploi: IEmploi): Observable<EntityResponseType> {
    return this.http.patch<IEmploi>(`${this.resourceUrl}/${getEmploiIdentifier(emploi) as number}`, emploi, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEmploi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmploi[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmploi[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addEmploiToCollectionIfMissing(emploiCollection: IEmploi[], ...emploisToCheck: (IEmploi | null | undefined)[]): IEmploi[] {
    const emplois: IEmploi[] = emploisToCheck.filter(isPresent);
    if (emplois.length > 0) {
      const emploiCollectionIdentifiers = emploiCollection.map(emploiItem => getEmploiIdentifier(emploiItem)!);
      const emploisToAdd = emplois.filter(emploiItem => {
        const emploiIdentifier = getEmploiIdentifier(emploiItem);
        if (emploiIdentifier == null || emploiCollectionIdentifiers.includes(emploiIdentifier)) {
          return false;
        }
        emploiCollectionIdentifiers.push(emploiIdentifier);
        return true;
      });
      return [...emploisToAdd, ...emploiCollection];
    }
    return emploiCollection;
  }
}
