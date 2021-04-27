import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IFormationCentre, getFormationCentreIdentifier } from '../formation-centre.model';

export type EntityResponseType = HttpResponse<IFormationCentre>;
export type EntityArrayResponseType = HttpResponse<IFormationCentre[]>;

@Injectable({ providedIn: 'root' })
export class FormationCentreService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/formation-centres', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/formation-centres', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(formationCentre: IFormationCentre): Observable<EntityResponseType> {
    return this.http.post<IFormationCentre>(this.resourceUrl, formationCentre, { observe: 'response' });
  }

  update(formationCentre: IFormationCentre): Observable<EntityResponseType> {
    return this.http.put<IFormationCentre>(
      `${this.resourceUrl}/${getFormationCentreIdentifier(formationCentre) as number}`,
      formationCentre,
      { observe: 'response' }
    );
  }

  partialUpdate(formationCentre: IFormationCentre): Observable<EntityResponseType> {
    return this.http.patch<IFormationCentre>(
      `${this.resourceUrl}/${getFormationCentreIdentifier(formationCentre) as number}`,
      formationCentre,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFormationCentre>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFormationCentre[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFormationCentre[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addFormationCentreToCollectionIfMissing(
    formationCentreCollection: IFormationCentre[],
    ...formationCentresToCheck: (IFormationCentre | null | undefined)[]
  ): IFormationCentre[] {
    const formationCentres: IFormationCentre[] = formationCentresToCheck.filter(isPresent);
    if (formationCentres.length > 0) {
      const formationCentreCollectionIdentifiers = formationCentreCollection.map(
        formationCentreItem => getFormationCentreIdentifier(formationCentreItem)!
      );
      const formationCentresToAdd = formationCentres.filter(formationCentreItem => {
        const formationCentreIdentifier = getFormationCentreIdentifier(formationCentreItem);
        if (formationCentreIdentifier == null || formationCentreCollectionIdentifiers.includes(formationCentreIdentifier)) {
          return false;
        }
        formationCentreCollectionIdentifiers.push(formationCentreIdentifier);
        return true;
      });
      return [...formationCentresToAdd, ...formationCentreCollection];
    }
    return formationCentreCollection;
  }
}
