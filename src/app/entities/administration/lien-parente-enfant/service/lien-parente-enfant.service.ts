import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ILienParenteEnfant, getLienParenteEnfantIdentifier } from '../lien-parente-enfant.model';

export type EntityResponseType = HttpResponse<ILienParenteEnfant>;
export type EntityArrayResponseType = HttpResponse<ILienParenteEnfant[]>;

@Injectable({ providedIn: 'root' })
export class LienParenteEnfantService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/lien-parente-enfants', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/lien-parente-enfants', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(lienParenteEnfant: ILienParenteEnfant): Observable<EntityResponseType> {
    return this.http.post<ILienParenteEnfant>(this.resourceUrl, lienParenteEnfant, { observe: 'response' });
  }

  update(lienParenteEnfant: ILienParenteEnfant): Observable<EntityResponseType> {
    return this.http.put<ILienParenteEnfant>(
      `${this.resourceUrl}/${getLienParenteEnfantIdentifier(lienParenteEnfant) as number}`,
      lienParenteEnfant,
      { observe: 'response' }
    );
  }

  partialUpdate(lienParenteEnfant: ILienParenteEnfant): Observable<EntityResponseType> {
    return this.http.patch<ILienParenteEnfant>(
      `${this.resourceUrl}/${getLienParenteEnfantIdentifier(lienParenteEnfant) as number}`,
      lienParenteEnfant,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILienParenteEnfant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILienParenteEnfant[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILienParenteEnfant[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addLienParenteEnfantToCollectionIfMissing(
    lienParenteEnfantCollection: ILienParenteEnfant[],
    ...lienParenteEnfantsToCheck: (ILienParenteEnfant | null | undefined)[]
  ): ILienParenteEnfant[] {
    const lienParenteEnfants: ILienParenteEnfant[] = lienParenteEnfantsToCheck.filter(isPresent);
    if (lienParenteEnfants.length > 0) {
      const lienParenteEnfantCollectionIdentifiers = lienParenteEnfantCollection.map(
        lienParenteEnfantItem => getLienParenteEnfantIdentifier(lienParenteEnfantItem)!
      );
      const lienParenteEnfantsToAdd = lienParenteEnfants.filter(lienParenteEnfantItem => {
        const lienParenteEnfantIdentifier = getLienParenteEnfantIdentifier(lienParenteEnfantItem);
        if (lienParenteEnfantIdentifier == null || lienParenteEnfantCollectionIdentifiers.includes(lienParenteEnfantIdentifier)) {
          return false;
        }
        lienParenteEnfantCollectionIdentifiers.push(lienParenteEnfantIdentifier);
        return true;
      });
      return [...lienParenteEnfantsToAdd, ...lienParenteEnfantCollection];
    }
    return lienParenteEnfantCollection;
  }
}
