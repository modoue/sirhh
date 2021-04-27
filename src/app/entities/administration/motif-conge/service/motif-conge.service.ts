import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IMotifConge, getMotifCongeIdentifier } from '../motif-conge.model';

export type EntityResponseType = HttpResponse<IMotifConge>;
export type EntityArrayResponseType = HttpResponse<IMotifConge[]>;

@Injectable({ providedIn: 'root' })
export class MotifCongeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/motif-conges', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/motif-conges', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(motifConge: IMotifConge): Observable<EntityResponseType> {
    return this.http.post<IMotifConge>(this.resourceUrl, motifConge, { observe: 'response' });
  }

  update(motifConge: IMotifConge): Observable<EntityResponseType> {
    return this.http.put<IMotifConge>(`${this.resourceUrl}/${getMotifCongeIdentifier(motifConge) as number}`, motifConge, {
      observe: 'response',
    });
  }

  partialUpdate(motifConge: IMotifConge): Observable<EntityResponseType> {
    return this.http.patch<IMotifConge>(`${this.resourceUrl}/${getMotifCongeIdentifier(motifConge) as number}`, motifConge, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMotifConge>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMotifConge[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMotifConge[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addMotifCongeToCollectionIfMissing(
    motifCongeCollection: IMotifConge[],
    ...motifCongesToCheck: (IMotifConge | null | undefined)[]
  ): IMotifConge[] {
    const motifConges: IMotifConge[] = motifCongesToCheck.filter(isPresent);
    if (motifConges.length > 0) {
      const motifCongeCollectionIdentifiers = motifCongeCollection.map(motifCongeItem => getMotifCongeIdentifier(motifCongeItem)!);
      const motifCongesToAdd = motifConges.filter(motifCongeItem => {
        const motifCongeIdentifier = getMotifCongeIdentifier(motifCongeItem);
        if (motifCongeIdentifier == null || motifCongeCollectionIdentifiers.includes(motifCongeIdentifier)) {
          return false;
        }
        motifCongeCollectionIdentifiers.push(motifCongeIdentifier);
        return true;
      });
      return [...motifCongesToAdd, ...motifCongeCollection];
    }
    return motifCongeCollection;
  }
}
