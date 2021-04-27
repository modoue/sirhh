import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ITypePiece, getTypePieceIdentifier } from '../type-piece.model';

export type EntityResponseType = HttpResponse<ITypePiece>;
export type EntityArrayResponseType = HttpResponse<ITypePiece[]>;

@Injectable({ providedIn: 'root' })
export class TypePieceService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/type-pieces', 'administration');
  public resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/type-pieces', 'administration');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(typePiece: ITypePiece): Observable<EntityResponseType> {
    return this.http.post<ITypePiece>(this.resourceUrl, typePiece, { observe: 'response' });
  }

  update(typePiece: ITypePiece): Observable<EntityResponseType> {
    return this.http.put<ITypePiece>(`${this.resourceUrl}/${getTypePieceIdentifier(typePiece) as number}`, typePiece, {
      observe: 'response',
    });
  }

  partialUpdate(typePiece: ITypePiece): Observable<EntityResponseType> {
    return this.http.patch<ITypePiece>(`${this.resourceUrl}/${getTypePieceIdentifier(typePiece) as number}`, typePiece, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypePiece>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypePiece[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypePiece[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  addTypePieceToCollectionIfMissing(
    typePieceCollection: ITypePiece[],
    ...typePiecesToCheck: (ITypePiece | null | undefined)[]
  ): ITypePiece[] {
    const typePieces: ITypePiece[] = typePiecesToCheck.filter(isPresent);
    if (typePieces.length > 0) {
      const typePieceCollectionIdentifiers = typePieceCollection.map(typePieceItem => getTypePieceIdentifier(typePieceItem)!);
      const typePiecesToAdd = typePieces.filter(typePieceItem => {
        const typePieceIdentifier = getTypePieceIdentifier(typePieceItem);
        if (typePieceIdentifier == null || typePieceCollectionIdentifiers.includes(typePieceIdentifier)) {
          return false;
        }
        typePieceCollectionIdentifiers.push(typePieceIdentifier);
        return true;
      });
      return [...typePiecesToAdd, ...typePieceCollection];
    }
    return typePieceCollection;
  }
}
