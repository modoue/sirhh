import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IAttributComplementaire, getAttributComplementaireIdentifier } from '../attribut-complementaire.model';

export type EntityResponseType = HttpResponse<IAttributComplementaire>;
export type EntityArrayResponseType = HttpResponse<IAttributComplementaire[]>;

@Injectable({ providedIn: 'root' })
export class AttributComplementaireService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/attribut-complementaires', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/attribut-complementaires', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(attributComplementaire: IAttributComplementaire): Observable<EntityResponseType> {
    return this.http.post<IAttributComplementaire>(this.resourceUrl, attributComplementaire, { observe: 'response' });
  }

  update(attributComplementaire: IAttributComplementaire): Observable<EntityResponseType> {
    return this.http.put<IAttributComplementaire>(
      `${this.resourceUrl}/${getAttributComplementaireIdentifier(attributComplementaire) as number}`,
      attributComplementaire,
      { observe: 'response' }
    );
  }

  partialUpdate(attributComplementaire: IAttributComplementaire): Observable<EntityResponseType> {
    return this.http.patch<IAttributComplementaire>(
      `${this.resourceUrl}/${getAttributComplementaireIdentifier(attributComplementaire) as number}`,
      attributComplementaire,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAttributComplementaire>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAttributComplementaire[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAttributComplementaire[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addAttributComplementaireToCollectionIfMissing(
    attributComplementaireCollection: IAttributComplementaire[],
    ...attributComplementairesToCheck: (IAttributComplementaire | null | undefined)[]
  ): IAttributComplementaire[] {
    const attributComplementaires: IAttributComplementaire[] = attributComplementairesToCheck.filter(isPresent);
    if (attributComplementaires.length > 0) {
      const attributComplementaireCollectionIdentifiers = attributComplementaireCollection.map(
        attributComplementaireItem => getAttributComplementaireIdentifier(attributComplementaireItem)!
      );
      const attributComplementairesToAdd = attributComplementaires.filter(attributComplementaireItem => {
        const attributComplementaireIdentifier = getAttributComplementaireIdentifier(attributComplementaireItem);
        if (
          attributComplementaireIdentifier == null ||
          attributComplementaireCollectionIdentifiers.includes(attributComplementaireIdentifier)
        ) {
          return false;
        }
        attributComplementaireCollectionIdentifiers.push(attributComplementaireIdentifier);
        return true;
      });
      return [...attributComplementairesToAdd, ...attributComplementaireCollection];
    }
    return attributComplementaireCollection;
  }
}
