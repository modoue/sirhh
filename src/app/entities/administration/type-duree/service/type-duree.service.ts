import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ITypeDuree, getTypeDureeIdentifier } from '../type-duree.model';

export type EntityResponseType = HttpResponse<ITypeDuree>;
export type EntityArrayResponseType = HttpResponse<ITypeDuree[]>;

@Injectable({ providedIn: 'root' })
export class TypeDureeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/type-durees', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/type-durees', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(typeDuree: ITypeDuree): Observable<EntityResponseType> {
    return this.http.post<ITypeDuree>(this.resourceUrl, typeDuree, { observe: 'response' });
  }

  update(typeDuree: ITypeDuree): Observable<EntityResponseType> {
    return this.http.put<ITypeDuree>(`${this.resourceUrl}/${getTypeDureeIdentifier(typeDuree) as number}`, typeDuree, {
      observe: 'response',
    });
  }

  partialUpdate(typeDuree: ITypeDuree): Observable<EntityResponseType> {
    return this.http.patch<ITypeDuree>(`${this.resourceUrl}/${getTypeDureeIdentifier(typeDuree) as number}`, typeDuree, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeDuree>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeDuree[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeDuree[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addTypeDureeToCollectionIfMissing(
    typeDureeCollection: ITypeDuree[],
    ...typeDureesToCheck: (ITypeDuree | null | undefined)[]
  ): ITypeDuree[] {
    const typeDurees: ITypeDuree[] = typeDureesToCheck.filter(isPresent);
    if (typeDurees.length > 0) {
      const typeDureeCollectionIdentifiers = typeDureeCollection.map(typeDureeItem => getTypeDureeIdentifier(typeDureeItem)!);
      const typeDureesToAdd = typeDurees.filter(typeDureeItem => {
        const typeDureeIdentifier = getTypeDureeIdentifier(typeDureeItem);
        if (typeDureeIdentifier == null || typeDureeCollectionIdentifiers.includes(typeDureeIdentifier)) {
          return false;
        }
        typeDureeCollectionIdentifiers.push(typeDureeIdentifier);
        return true;
      });
      return [...typeDureesToAdd, ...typeDureeCollection];
    }
    return typeDureeCollection;
  }
}
