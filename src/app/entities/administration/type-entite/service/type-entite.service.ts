import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ITypeEntite, getTypeEntiteIdentifier } from '../type-entite.model';

export type EntityResponseType = HttpResponse<ITypeEntite>;
export type EntityArrayResponseType = HttpResponse<ITypeEntite[]>;

@Injectable({ providedIn: 'root' })
export class TypeEntiteService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/type-entites', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/type-entites', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(typeEntite: ITypeEntite): Observable<EntityResponseType> {
    return this.http.post<ITypeEntite>(this.resourceUrl, typeEntite, { observe: 'response' });
  }

  update(typeEntite: ITypeEntite): Observable<EntityResponseType> {
    return this.http.put<ITypeEntite>(`${this.resourceUrl}/${getTypeEntiteIdentifier(typeEntite) as number}`, typeEntite, {
      observe: 'response',
    });
  }

  partialUpdate(typeEntite: ITypeEntite): Observable<EntityResponseType> {
    return this.http.patch<ITypeEntite>(`${this.resourceUrl}/${getTypeEntiteIdentifier(typeEntite) as number}`, typeEntite, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeEntite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeEntite[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeEntite[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addTypeEntiteToCollectionIfMissing(
    typeEntiteCollection: ITypeEntite[],
    ...typeEntitesToCheck: (ITypeEntite | null | undefined)[]
  ): ITypeEntite[] {
    const typeEntites: ITypeEntite[] = typeEntitesToCheck.filter(isPresent);
    if (typeEntites.length > 0) {
      const typeEntiteCollectionIdentifiers = typeEntiteCollection.map(typeEntiteItem => getTypeEntiteIdentifier(typeEntiteItem)!);
      const typeEntitesToAdd = typeEntites.filter(typeEntiteItem => {
        const typeEntiteIdentifier = getTypeEntiteIdentifier(typeEntiteItem);
        if (typeEntiteIdentifier == null || typeEntiteCollectionIdentifiers.includes(typeEntiteIdentifier)) {
          return false;
        }
        typeEntiteCollectionIdentifiers.push(typeEntiteIdentifier);
        return true;
      });
      return [...typeEntitesToAdd, ...typeEntiteCollection];
    }
    return typeEntiteCollection;
  }
}
