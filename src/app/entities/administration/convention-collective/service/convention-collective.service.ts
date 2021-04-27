import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IConventionCollective, getConventionCollectiveIdentifier } from '../convention-collective.model';

export type EntityResponseType = HttpResponse<IConventionCollective>;
export type EntityArrayResponseType = HttpResponse<IConventionCollective[]>;

@Injectable({ providedIn: 'root' })
export class ConventionCollectiveService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/convention-collectives', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/convention-collectives', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(conventionCollective: IConventionCollective): Observable<EntityResponseType> {
    return this.http.post<IConventionCollective>(this.resourceUrl, conventionCollective, { observe: 'response' });
  }

  update(conventionCollective: IConventionCollective): Observable<EntityResponseType> {
    return this.http.put<IConventionCollective>(
      `${this.resourceUrl}/${getConventionCollectiveIdentifier(conventionCollective) as number}`,
      conventionCollective,
      { observe: 'response' }
    );
  }

  partialUpdate(conventionCollective: IConventionCollective): Observable<EntityResponseType> {
    return this.http.patch<IConventionCollective>(
      `${this.resourceUrl}/${getConventionCollectiveIdentifier(conventionCollective) as number}`,
      conventionCollective,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConventionCollective>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConventionCollective[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConventionCollective[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addConventionCollectiveToCollectionIfMissing(
    conventionCollectiveCollection: IConventionCollective[],
    ...conventionCollectivesToCheck: (IConventionCollective | null | undefined)[]
  ): IConventionCollective[] {
    const conventionCollectives: IConventionCollective[] = conventionCollectivesToCheck.filter(isPresent);
    if (conventionCollectives.length > 0) {
      const conventionCollectiveCollectionIdentifiers = conventionCollectiveCollection.map(
        conventionCollectiveItem => getConventionCollectiveIdentifier(conventionCollectiveItem)!
      );
      const conventionCollectivesToAdd = conventionCollectives.filter(conventionCollectiveItem => {
        const conventionCollectiveIdentifier = getConventionCollectiveIdentifier(conventionCollectiveItem);
        if (conventionCollectiveIdentifier == null || conventionCollectiveCollectionIdentifiers.includes(conventionCollectiveIdentifier)) {
          return false;
        }
        conventionCollectiveCollectionIdentifiers.push(conventionCollectiveIdentifier);
        return true;
      });
      return [...conventionCollectivesToAdd, ...conventionCollectiveCollection];
    }
    return conventionCollectiveCollection;
  }
}
