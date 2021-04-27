import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IMotifSuppression, getMotifSuppressionIdentifier } from '../motif-suppression.model';

export type EntityResponseType = HttpResponse<IMotifSuppression>;
export type EntityArrayResponseType = HttpResponse<IMotifSuppression[]>;

@Injectable({ providedIn: 'root' })
export class MotifSuppressionService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/motif-suppressions', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/motif-suppressions', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(motifSuppression: IMotifSuppression): Observable<EntityResponseType> {
    return this.http.post<IMotifSuppression>(this.resourceUrl, motifSuppression, { observe: 'response' });
  }

  update(motifSuppression: IMotifSuppression): Observable<EntityResponseType> {
    return this.http.put<IMotifSuppression>(
      `${this.resourceUrl}/${getMotifSuppressionIdentifier(motifSuppression) as number}`,
      motifSuppression,
      { observe: 'response' }
    );
  }

  partialUpdate(motifSuppression: IMotifSuppression): Observable<EntityResponseType> {
    return this.http.patch<IMotifSuppression>(
      `${this.resourceUrl}/${getMotifSuppressionIdentifier(motifSuppression) as number}`,
      motifSuppression,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMotifSuppression>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMotifSuppression[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMotifSuppression[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addMotifSuppressionToCollectionIfMissing(
    motifSuppressionCollection: IMotifSuppression[],
    ...motifSuppressionsToCheck: (IMotifSuppression | null | undefined)[]
  ): IMotifSuppression[] {
    const motifSuppressions: IMotifSuppression[] = motifSuppressionsToCheck.filter(isPresent);
    if (motifSuppressions.length > 0) {
      const motifSuppressionCollectionIdentifiers = motifSuppressionCollection.map(
        motifSuppressionItem => getMotifSuppressionIdentifier(motifSuppressionItem)!
      );
      const motifSuppressionsToAdd = motifSuppressions.filter(motifSuppressionItem => {
        const motifSuppressionIdentifier = getMotifSuppressionIdentifier(motifSuppressionItem);
        if (motifSuppressionIdentifier == null || motifSuppressionCollectionIdentifiers.includes(motifSuppressionIdentifier)) {
          return false;
        }
        motifSuppressionCollectionIdentifiers.push(motifSuppressionIdentifier);
        return true;
      });
      return [...motifSuppressionsToAdd, ...motifSuppressionCollection];
    }
    return motifSuppressionCollection;
  }
}
