import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IRegimeHoraire, getRegimeHoraireIdentifier } from '../regime-horaire.model';

export type EntityResponseType = HttpResponse<IRegimeHoraire>;
export type EntityArrayResponseType = HttpResponse<IRegimeHoraire[]>;

@Injectable({ providedIn: 'root' })
export class RegimeHoraireService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/regime-horaires', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/regime-horaires', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(regimeHoraire: IRegimeHoraire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(regimeHoraire);
    return this.http
      .post<IRegimeHoraire>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(regimeHoraire: IRegimeHoraire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(regimeHoraire);
    return this.http
      .put<IRegimeHoraire>(`${this.resourceUrl}/${getRegimeHoraireIdentifier(regimeHoraire) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(regimeHoraire: IRegimeHoraire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(regimeHoraire);
    return this.http
      .patch<IRegimeHoraire>(`${this.resourceUrl}/${getRegimeHoraireIdentifier(regimeHoraire) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRegimeHoraire>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRegimeHoraire[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRegimeHoraire[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addRegimeHoraireToCollectionIfMissing(
    regimeHoraireCollection: IRegimeHoraire[],
    ...regimeHorairesToCheck: (IRegimeHoraire | null | undefined)[]
  ): IRegimeHoraire[] {
    const regimeHoraires: IRegimeHoraire[] = regimeHorairesToCheck.filter(isPresent);
    if (regimeHoraires.length > 0) {
      const regimeHoraireCollectionIdentifiers = regimeHoraireCollection.map(
        regimeHoraireItem => getRegimeHoraireIdentifier(regimeHoraireItem)!
      );
      const regimeHorairesToAdd = regimeHoraires.filter(regimeHoraireItem => {
        const regimeHoraireIdentifier = getRegimeHoraireIdentifier(regimeHoraireItem);
        if (regimeHoraireIdentifier == null || regimeHoraireCollectionIdentifiers.includes(regimeHoraireIdentifier)) {
          return false;
        }
        regimeHoraireCollectionIdentifiers.push(regimeHoraireIdentifier);
        return true;
      });
      return [...regimeHorairesToAdd, ...regimeHoraireCollection];
    }
    return regimeHoraireCollection;
  }

  protected convertDateFromClient(regimeHoraire: IRegimeHoraire): IRegimeHoraire {
    return Object.assign({}, regimeHoraire, {
      heureDebut: regimeHoraire.heureDebut?.isValid() ? regimeHoraire.heureDebut.format(DATE_FORMAT) : undefined,
      heureFin: regimeHoraire.heureFin?.isValid() ? regimeHoraire.heureFin.format(DATE_FORMAT) : undefined,
      heurePauseDebut: regimeHoraire.heurePauseDebut?.isValid() ? regimeHoraire.heurePauseDebut.format(DATE_FORMAT) : undefined,
      heurePauseFin: regimeHoraire.heurePauseFin?.isValid() ? regimeHoraire.heurePauseFin.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.heureDebut = res.body.heureDebut ? dayjs(res.body.heureDebut) : undefined;
      res.body.heureFin = res.body.heureFin ? dayjs(res.body.heureFin) : undefined;
      res.body.heurePauseDebut = res.body.heurePauseDebut ? dayjs(res.body.heurePauseDebut) : undefined;
      res.body.heurePauseFin = res.body.heurePauseFin ? dayjs(res.body.heurePauseFin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((regimeHoraire: IRegimeHoraire) => {
        regimeHoraire.heureDebut = regimeHoraire.heureDebut ? dayjs(regimeHoraire.heureDebut) : undefined;
        regimeHoraire.heureFin = regimeHoraire.heureFin ? dayjs(regimeHoraire.heureFin) : undefined;
        regimeHoraire.heurePauseDebut = regimeHoraire.heurePauseDebut ? dayjs(regimeHoraire.heurePauseDebut) : undefined;
        regimeHoraire.heurePauseFin = regimeHoraire.heurePauseFin ? dayjs(regimeHoraire.heurePauseFin) : undefined;
      });
    }
    return res;
  }
}
