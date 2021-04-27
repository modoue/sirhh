import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ILangueReferentiel, getLangueReferentielIdentifier } from '../langue-referentiel.model';

export type EntityResponseType = HttpResponse<ILangueReferentiel>;
export type EntityArrayResponseType = HttpResponse<ILangueReferentiel[]>;

@Injectable({ providedIn: 'root' })
export class LangueReferentielService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/langue-referentiels', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/langue-referentiels', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(langueReferentiel: ILangueReferentiel): Observable<EntityResponseType> {
    return this.http.post<ILangueReferentiel>(this.resourceUrl, langueReferentiel, { observe: 'response' });
  }

  update(langueReferentiel: ILangueReferentiel): Observable<EntityResponseType> {
    return this.http.put<ILangueReferentiel>(
      `${this.resourceUrl}/${getLangueReferentielIdentifier(langueReferentiel) as number}`,
      langueReferentiel,
      { observe: 'response' }
    );
  }

  partialUpdate(langueReferentiel: ILangueReferentiel): Observable<EntityResponseType> {
    return this.http.patch<ILangueReferentiel>(
      `${this.resourceUrl}/${getLangueReferentielIdentifier(langueReferentiel) as number}`,
      langueReferentiel,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILangueReferentiel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILangueReferentiel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILangueReferentiel[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addLangueReferentielToCollectionIfMissing(
    langueReferentielCollection: ILangueReferentiel[],
    ...langueReferentielsToCheck: (ILangueReferentiel | null | undefined)[]
  ): ILangueReferentiel[] {
    const langueReferentiels: ILangueReferentiel[] = langueReferentielsToCheck.filter(isPresent);
    if (langueReferentiels.length > 0) {
      const langueReferentielCollectionIdentifiers = langueReferentielCollection.map(
        langueReferentielItem => getLangueReferentielIdentifier(langueReferentielItem)!
      );
      const langueReferentielsToAdd = langueReferentiels.filter(langueReferentielItem => {
        const langueReferentielIdentifier = getLangueReferentielIdentifier(langueReferentielItem);
        if (langueReferentielIdentifier == null || langueReferentielCollectionIdentifiers.includes(langueReferentielIdentifier)) {
          return false;
        }
        langueReferentielCollectionIdentifiers.push(langueReferentielIdentifier);
        return true;
      });
      return [...langueReferentielsToAdd, ...langueReferentielCollection];
    }
    return langueReferentielCollection;
  }
}
