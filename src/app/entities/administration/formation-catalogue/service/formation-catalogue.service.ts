import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IFormationCatalogue, getFormationCatalogueIdentifier } from '../formation-catalogue.model';

export type EntityResponseType = HttpResponse<IFormationCatalogue>;
export type EntityArrayResponseType = HttpResponse<IFormationCatalogue[]>;

@Injectable({ providedIn: 'root' })
export class FormationCatalogueService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/formation-catalogues', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/formation-catalogues', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(formationCatalogue: IFormationCatalogue): Observable<EntityResponseType> {
    return this.http.post<IFormationCatalogue>(this.resourceUrl, formationCatalogue, { observe: 'response' });
  }

  update(formationCatalogue: IFormationCatalogue): Observable<EntityResponseType> {
    return this.http.put<IFormationCatalogue>(
      `${this.resourceUrl}/${getFormationCatalogueIdentifier(formationCatalogue) as number}`,
      formationCatalogue,
      { observe: 'response' }
    );
  }

  partialUpdate(formationCatalogue: IFormationCatalogue): Observable<EntityResponseType> {
    return this.http.patch<IFormationCatalogue>(
      `${this.resourceUrl}/${getFormationCatalogueIdentifier(formationCatalogue) as number}`,
      formationCatalogue,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFormationCatalogue>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFormationCatalogue[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFormationCatalogue[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addFormationCatalogueToCollectionIfMissing(
    formationCatalogueCollection: IFormationCatalogue[],
    ...formationCataloguesToCheck: (IFormationCatalogue | null | undefined)[]
  ): IFormationCatalogue[] {
    const formationCatalogues: IFormationCatalogue[] = formationCataloguesToCheck.filter(isPresent);
    if (formationCatalogues.length > 0) {
      const formationCatalogueCollectionIdentifiers = formationCatalogueCollection.map(
        formationCatalogueItem => getFormationCatalogueIdentifier(formationCatalogueItem)!
      );
      const formationCataloguesToAdd = formationCatalogues.filter(formationCatalogueItem => {
        const formationCatalogueIdentifier = getFormationCatalogueIdentifier(formationCatalogueItem);
        if (formationCatalogueIdentifier == null || formationCatalogueCollectionIdentifiers.includes(formationCatalogueIdentifier)) {
          return false;
        }
        formationCatalogueCollectionIdentifiers.push(formationCatalogueIdentifier);
        return true;
      });
      return [...formationCataloguesToAdd, ...formationCatalogueCollection];
    }
    return formationCatalogueCollection;
  }
}
