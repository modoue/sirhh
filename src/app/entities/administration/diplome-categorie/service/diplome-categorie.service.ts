import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IDiplomeCategorie, getDiplomeCategorieIdentifier } from '../diplome-categorie.model';

export type EntityResponseType = HttpResponse<IDiplomeCategorie>;
export type EntityArrayResponseType = HttpResponse<IDiplomeCategorie[]>;

@Injectable({ providedIn: 'root' })
export class DiplomeCategorieService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/diplome-categories', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/diplome-categories', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(diplomeCategorie: IDiplomeCategorie): Observable<EntityResponseType> {
    return this.http.post<IDiplomeCategorie>(this.resourceUrl, diplomeCategorie, { observe: 'response' });
  }

  update(diplomeCategorie: IDiplomeCategorie): Observable<EntityResponseType> {
    return this.http.put<IDiplomeCategorie>(
      `${this.resourceUrl}/${getDiplomeCategorieIdentifier(diplomeCategorie) as number}`,
      diplomeCategorie,
      { observe: 'response' }
    );
  }

  partialUpdate(diplomeCategorie: IDiplomeCategorie): Observable<EntityResponseType> {
    return this.http.patch<IDiplomeCategorie>(
      `${this.resourceUrl}/${getDiplomeCategorieIdentifier(diplomeCategorie) as number}`,
      diplomeCategorie,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDiplomeCategorie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDiplomeCategorie[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDiplomeCategorie[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addDiplomeCategorieToCollectionIfMissing(
    diplomeCategorieCollection: IDiplomeCategorie[],
    ...diplomeCategoriesToCheck: (IDiplomeCategorie | null | undefined)[]
  ): IDiplomeCategorie[] {
    const diplomeCategories: IDiplomeCategorie[] = diplomeCategoriesToCheck.filter(isPresent);
    if (diplomeCategories.length > 0) {
      const diplomeCategorieCollectionIdentifiers = diplomeCategorieCollection.map(
        diplomeCategorieItem => getDiplomeCategorieIdentifier(diplomeCategorieItem)!
      );
      const diplomeCategoriesToAdd = diplomeCategories.filter(diplomeCategorieItem => {
        const diplomeCategorieIdentifier = getDiplomeCategorieIdentifier(diplomeCategorieItem);
        if (diplomeCategorieIdentifier == null || diplomeCategorieCollectionIdentifiers.includes(diplomeCategorieIdentifier)) {
          return false;
        }
        diplomeCategorieCollectionIdentifiers.push(diplomeCategorieIdentifier);
        return true;
      });
      return [...diplomeCategoriesToAdd, ...diplomeCategorieCollection];
    }
    return diplomeCategorieCollection;
  }
}
