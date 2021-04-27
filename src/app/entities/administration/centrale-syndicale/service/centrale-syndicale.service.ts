import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICentraleSyndicale, getCentraleSyndicaleIdentifier } from '../centrale-syndicale.model';

export type EntityResponseType = HttpResponse<ICentraleSyndicale>;
export type EntityArrayResponseType = HttpResponse<ICentraleSyndicale[]>;

@Injectable({ providedIn: 'root' })
export class CentraleSyndicaleService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/centrale-syndicales', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/centrale-syndicales', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(centraleSyndicale: ICentraleSyndicale): Observable<EntityResponseType> {
    return this.http.post<ICentraleSyndicale>(this.resourceUrl, centraleSyndicale, { observe: 'response' });
  }

  update(centraleSyndicale: ICentraleSyndicale): Observable<EntityResponseType> {
    return this.http.put<ICentraleSyndicale>(
      `${this.resourceUrl}/${getCentraleSyndicaleIdentifier(centraleSyndicale) as number}`,
      centraleSyndicale,
      { observe: 'response' }
    );
  }

  partialUpdate(centraleSyndicale: ICentraleSyndicale): Observable<EntityResponseType> {
    return this.http.patch<ICentraleSyndicale>(
      `${this.resourceUrl}/${getCentraleSyndicaleIdentifier(centraleSyndicale) as number}`,
      centraleSyndicale,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICentraleSyndicale>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICentraleSyndicale[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICentraleSyndicale[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addCentraleSyndicaleToCollectionIfMissing(
    centraleSyndicaleCollection: ICentraleSyndicale[],
    ...centraleSyndicalesToCheck: (ICentraleSyndicale | null | undefined)[]
  ): ICentraleSyndicale[] {
    const centraleSyndicales: ICentraleSyndicale[] = centraleSyndicalesToCheck.filter(isPresent);
    if (centraleSyndicales.length > 0) {
      const centraleSyndicaleCollectionIdentifiers = centraleSyndicaleCollection.map(
        centraleSyndicaleItem => getCentraleSyndicaleIdentifier(centraleSyndicaleItem)!
      );
      const centraleSyndicalesToAdd = centraleSyndicales.filter(centraleSyndicaleItem => {
        const centraleSyndicaleIdentifier = getCentraleSyndicaleIdentifier(centraleSyndicaleItem);
        if (centraleSyndicaleIdentifier == null || centraleSyndicaleCollectionIdentifiers.includes(centraleSyndicaleIdentifier)) {
          return false;
        }
        centraleSyndicaleCollectionIdentifiers.push(centraleSyndicaleIdentifier);
        return true;
      });
      return [...centraleSyndicalesToAdd, ...centraleSyndicaleCollection];
    }
    return centraleSyndicaleCollection;
  }
}
