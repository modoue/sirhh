import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ITypeStage, getTypeStageIdentifier } from '../type-stage.model';

export type EntityResponseType = HttpResponse<ITypeStage>;
export type EntityArrayResponseType = HttpResponse<ITypeStage[]>;

@Injectable({ providedIn: 'root' })
export class TypeStageService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/type-stages', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/type-stages', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(typeStage: ITypeStage): Observable<EntityResponseType> {
    return this.http.post<ITypeStage>(this.resourceUrl, typeStage, { observe: 'response' });
  }

  update(typeStage: ITypeStage): Observable<EntityResponseType> {
    return this.http.put<ITypeStage>(`${this.resourceUrl}/${getTypeStageIdentifier(typeStage) as number}`, typeStage, {
      observe: 'response',
    });
  }

  partialUpdate(typeStage: ITypeStage): Observable<EntityResponseType> {
    return this.http.patch<ITypeStage>(`${this.resourceUrl}/${getTypeStageIdentifier(typeStage) as number}`, typeStage, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeStage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeStage[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeStage[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addTypeStageToCollectionIfMissing(
    typeStageCollection: ITypeStage[],
    ...typeStagesToCheck: (ITypeStage | null | undefined)[]
  ): ITypeStage[] {
    const typeStages: ITypeStage[] = typeStagesToCheck.filter(isPresent);
    if (typeStages.length > 0) {
      const typeStageCollectionIdentifiers = typeStageCollection.map(typeStageItem => getTypeStageIdentifier(typeStageItem)!);
      const typeStagesToAdd = typeStages.filter(typeStageItem => {
        const typeStageIdentifier = getTypeStageIdentifier(typeStageItem);
        if (typeStageIdentifier == null || typeStageCollectionIdentifiers.includes(typeStageIdentifier)) {
          return false;
        }
        typeStageCollectionIdentifiers.push(typeStageIdentifier);
        return true;
      });
      return [...typeStagesToAdd, ...typeStageCollection];
    }
    return typeStageCollection;
  }
}
