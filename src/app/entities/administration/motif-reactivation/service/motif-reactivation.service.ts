import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IMotifReactivation, getMotifReactivationIdentifier } from '../motif-reactivation.model';

export type EntityResponseType = HttpResponse<IMotifReactivation>;
export type EntityArrayResponseType = HttpResponse<IMotifReactivation[]>;

@Injectable({ providedIn: 'root' })
export class MotifReactivationService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/motif-reactivations', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/motif-reactivations', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(motifReactivation: IMotifReactivation): Observable<EntityResponseType> {
    return this.http.post<IMotifReactivation>(this.resourceUrl, motifReactivation, { observe: 'response' });
  }

  update(motifReactivation: IMotifReactivation): Observable<EntityResponseType> {
    return this.http.put<IMotifReactivation>(
      `${this.resourceUrl}/${getMotifReactivationIdentifier(motifReactivation) as number}`,
      motifReactivation,
      { observe: 'response' }
    );
  }

  partialUpdate(motifReactivation: IMotifReactivation): Observable<EntityResponseType> {
    return this.http.patch<IMotifReactivation>(
      `${this.resourceUrl}/${getMotifReactivationIdentifier(motifReactivation) as number}`,
      motifReactivation,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMotifReactivation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMotifReactivation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMotifReactivation[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addMotifReactivationToCollectionIfMissing(
    motifReactivationCollection: IMotifReactivation[],
    ...motifReactivationsToCheck: (IMotifReactivation | null | undefined)[]
  ): IMotifReactivation[] {
    const motifReactivations: IMotifReactivation[] = motifReactivationsToCheck.filter(isPresent);
    if (motifReactivations.length > 0) {
      const motifReactivationCollectionIdentifiers = motifReactivationCollection.map(
        motifReactivationItem => getMotifReactivationIdentifier(motifReactivationItem)!
      );
      const motifReactivationsToAdd = motifReactivations.filter(motifReactivationItem => {
        const motifReactivationIdentifier = getMotifReactivationIdentifier(motifReactivationItem);
        if (motifReactivationIdentifier == null || motifReactivationCollectionIdentifiers.includes(motifReactivationIdentifier)) {
          return false;
        }
        motifReactivationCollectionIdentifiers.push(motifReactivationIdentifier);
        return true;
      });
      return [...motifReactivationsToAdd, ...motifReactivationCollection];
    }
    return motifReactivationCollection;
  }
}
