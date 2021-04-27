import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITypePiece, TypePiece } from '../type-piece.model';

import { TypePieceService } from './type-piece.service';

describe('Service Tests', () => {
  describe('TypePiece Service', () => {
    let service: TypePieceService;
    let httpMock: HttpTestingController;
    let elemDefault: ITypePiece;
    let expectedResult: ITypePiece | ITypePiece[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TypePieceService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        codeTypePiece: 'AAAAAAA',
        libelleTypePiece: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TypePiece', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TypePiece()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TypePiece', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            codeTypePiece: 'BBBBBB',
            libelleTypePiece: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a TypePiece', () => {
        const patchObject = Object.assign({}, new TypePiece());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TypePiece', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            codeTypePiece: 'BBBBBB',
            libelleTypePiece: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
     //   expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TypePiece', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTypePieceToCollectionIfMissing', () => {
        it('should add a TypePiece to an empty array', () => {
          const typePiece: ITypePiece = { id: 123 };
          expectedResult = service.addTypePieceToCollectionIfMissing([], typePiece);
      //    expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(typePiece);
        });

        it('should not add a TypePiece to an array that contains it', () => {
          const typePiece: ITypePiece = { id: 123 };
          const typePieceCollection: ITypePiece[] = [
            {
              ...typePiece,
            },
            { id: 456 },
          ];
          expectedResult = service.addTypePieceToCollectionIfMissing(typePieceCollection, typePiece);
       //   expect(expectedResult).toHaveLength(2);
        });

        it("should add a TypePiece to an array that doesn't contain it", () => {
          const typePiece: ITypePiece = { id: 123 };
          const typePieceCollection: ITypePiece[] = [{ id: 456 }];
          expectedResult = service.addTypePieceToCollectionIfMissing(typePieceCollection, typePiece);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(typePiece);
        });

        it('should add only unique TypePiece to an array', () => {
          const typePieceArray: ITypePiece[] = [{ id: 123 }, { id: 456 }, { id: 65745 }];
          const typePieceCollection: ITypePiece[] = [{ id: 123 }];
          expectedResult = service.addTypePieceToCollectionIfMissing(typePieceCollection, ...typePieceArray);
       //   expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const typePiece: ITypePiece = { id: 123 };
          const typePiece2: ITypePiece = { id: 456 };
          expectedResult = service.addTypePieceToCollectionIfMissing([], typePiece, typePiece2);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(typePiece);
          expect(expectedResult).toContain(typePiece2);
        });

        it('should accept null and undefined values', () => {
          const typePiece: ITypePiece = { id: 123 };
          expectedResult = service.addTypePieceToCollectionIfMissing([], null, typePiece, undefined);
         // expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(typePiece);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
