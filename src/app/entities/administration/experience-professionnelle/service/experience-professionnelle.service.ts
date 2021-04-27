import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IExperienceProfessionnelle, getExperienceProfessionnelleIdentifier } from '../experience-professionnelle.model';

export type EntityResponseType = HttpResponse<IExperienceProfessionnelle>;
export type EntityArrayResponseType = HttpResponse<IExperienceProfessionnelle[]>;

@Injectable({ providedIn: 'root' })
export class ExperienceProfessionnelleService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/experience-professionnelles', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/experience-professionnelles', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(experienceProfessionnelle: IExperienceProfessionnelle): Observable<EntityResponseType> {
    return this.http.post<IExperienceProfessionnelle>(this.resourceUrl, experienceProfessionnelle, { observe: 'response' });
  }

  update(experienceProfessionnelle: IExperienceProfessionnelle): Observable<EntityResponseType> {
    return this.http.put<IExperienceProfessionnelle>(
      `${this.resourceUrl}/${getExperienceProfessionnelleIdentifier(experienceProfessionnelle) as number}`,
      experienceProfessionnelle,
      { observe: 'response' }
    );
  }

  partialUpdate(experienceProfessionnelle: IExperienceProfessionnelle): Observable<EntityResponseType> {
    return this.http.patch<IExperienceProfessionnelle>(
      `${this.resourceUrl}/${getExperienceProfessionnelleIdentifier(experienceProfessionnelle) as number}`,
      experienceProfessionnelle,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExperienceProfessionnelle>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExperienceProfessionnelle[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExperienceProfessionnelle[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addExperienceProfessionnelleToCollectionIfMissing(
    experienceProfessionnelleCollection: IExperienceProfessionnelle[],
    ...experienceProfessionnellesToCheck: (IExperienceProfessionnelle | null | undefined)[]
  ): IExperienceProfessionnelle[] {
    const experienceProfessionnelles: IExperienceProfessionnelle[] = experienceProfessionnellesToCheck.filter(isPresent);
    if (experienceProfessionnelles.length > 0) {
      const experienceProfessionnelleCollectionIdentifiers = experienceProfessionnelleCollection.map(
        experienceProfessionnelleItem => getExperienceProfessionnelleIdentifier(experienceProfessionnelleItem)!
      );
      const experienceProfessionnellesToAdd = experienceProfessionnelles.filter(experienceProfessionnelleItem => {
        const experienceProfessionnelleIdentifier = getExperienceProfessionnelleIdentifier(experienceProfessionnelleItem);
        if (
          experienceProfessionnelleIdentifier == null ||
          experienceProfessionnelleCollectionIdentifiers.includes(experienceProfessionnelleIdentifier)
        ) {
          return false;
        }
        experienceProfessionnelleCollectionIdentifiers.push(experienceProfessionnelleIdentifier);
        return true;
      });
      return [...experienceProfessionnellesToAdd, ...experienceProfessionnelleCollection];
    }
    return experienceProfessionnelleCollection;
  }
}
