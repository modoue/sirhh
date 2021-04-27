import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IRappelConges, getRappelCongesIdentifier } from '../rappel-conges.model';

export type EntityResponseType = HttpResponse<IRappelConges>;
export type EntityArrayResponseType = HttpResponse<IRappelConges[]>;

@Injectable({ providedIn: 'root' })
export class RappelCongesService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/rappel-conges', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/rappel-conges', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(rappelConges: IRappelConges): Observable<EntityResponseType> {
    return this.http.post<IRappelConges>(this.resourceUrl, rappelConges, { observe: 'response' });
  }

  update(rappelConges: IRappelConges): Observable<EntityResponseType> {
    return this.http.put<IRappelConges>(`${this.resourceUrl}/${getRappelCongesIdentifier(rappelConges) as number}`, rappelConges, {
      observe: 'response',
    });
  }

  partialUpdate(rappelConges: IRappelConges): Observable<EntityResponseType> {
    return this.http.patch<IRappelConges>(`${this.resourceUrl}/${getRappelCongesIdentifier(rappelConges) as number}`, rappelConges, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRappelConges>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRappelConges[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRappelConges[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addRappelCongesToCollectionIfMissing(
    rappelCongesCollection: IRappelConges[],
    ...rappelCongesToCheck: (IRappelConges | null | undefined)[]
  ): IRappelConges[] {
    const rappelConges: IRappelConges[] = rappelCongesToCheck.filter(isPresent);
    if (rappelConges.length > 0) {
      const rappelCongesCollectionIdentifiers = rappelCongesCollection.map(
        rappelCongesItem => getRappelCongesIdentifier(rappelCongesItem)!
      );
      const rappelCongesToAdd = rappelConges.filter(rappelCongesItem => {
        const rappelCongesIdentifier = getRappelCongesIdentifier(rappelCongesItem);
        if (rappelCongesIdentifier == null || rappelCongesCollectionIdentifiers.includes(rappelCongesIdentifier)) {
          return false;
        }
        rappelCongesCollectionIdentifiers.push(rappelCongesIdentifier);
        return true;
      });
      return [...rappelCongesToAdd, ...rappelCongesCollection];
    }
    return rappelCongesCollection;
  }
}
