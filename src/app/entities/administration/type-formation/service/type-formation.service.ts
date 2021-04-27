import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ITypeFormation, getTypeFormationIdentifier } from '../type-formation.model';

export type EntityResponseType = HttpResponse<ITypeFormation>;
export type EntityArrayResponseType = HttpResponse<ITypeFormation[]>;

@Injectable({ providedIn: 'root' })
export class TypeFormationService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/type-formations', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/type-formations', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(typeFormation: ITypeFormation): Observable<EntityResponseType> {
    return this.http.post<ITypeFormation>(this.resourceUrl, typeFormation, { observe: 'response' });
  }

  update(typeFormation: ITypeFormation): Observable<EntityResponseType> {
    return this.http.put<ITypeFormation>(`${this.resourceUrl}/${getTypeFormationIdentifier(typeFormation) as number}`, typeFormation, {
      observe: 'response',
    });
  }

  partialUpdate(typeFormation: ITypeFormation): Observable<EntityResponseType> {
    return this.http.patch<ITypeFormation>(`${this.resourceUrl}/${getTypeFormationIdentifier(typeFormation) as number}`, typeFormation, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeFormation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeFormation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeFormation[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addTypeFormationToCollectionIfMissing(
    typeFormationCollection: ITypeFormation[],
    ...typeFormationsToCheck: (ITypeFormation | null | undefined)[]
  ): ITypeFormation[] {
    const typeFormations: ITypeFormation[] = typeFormationsToCheck.filter(isPresent);
    if (typeFormations.length > 0) {
      const typeFormationCollectionIdentifiers = typeFormationCollection.map(
        typeFormationItem => getTypeFormationIdentifier(typeFormationItem)!
      );
      const typeFormationsToAdd = typeFormations.filter(typeFormationItem => {
        const typeFormationIdentifier = getTypeFormationIdentifier(typeFormationItem);
        if (typeFormationIdentifier == null || typeFormationCollectionIdentifiers.includes(typeFormationIdentifier)) {
          return false;
        }
        typeFormationCollectionIdentifiers.push(typeFormationIdentifier);
        return true;
      });
      return [...typeFormationsToAdd, ...typeFormationCollection];
    }
    return typeFormationCollection;
  }
}
