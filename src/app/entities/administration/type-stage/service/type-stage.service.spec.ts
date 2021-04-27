import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITypeStage, TypeStage } from '../type-stage.model';

import { TypeStageService } from './type-stage.service';

describe('Service Tests', () => {
  describe('TypeStage Service', () => {
    let service: TypeStageService;
    let httpMock: HttpTestingController;
    let elemDefault: ITypeStage;
    let expectedResult: ITypeStage | ITypeStage[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TypeStageService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        code: 'AAAAAAA',
        libelle: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TypeStage', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TypeStage()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TypeStage', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            code: 'BBBBBB',
            libelle: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a TypeStage', () => {
        const patchObject = Object.assign(
          {
            libelle: 'BBBBBB',
          },
          new TypeStage()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TypeStage', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            code: 'BBBBBB',
            libelle: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TypeStage', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTypeStageToCollectionIfMissing', () => {
        it('should add a TypeStage to an empty array', () => {
          const typeStage: ITypeStage = { id: 123 };
          expectedResult = service.addTypeStageToCollectionIfMissing([], typeStage);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(typeStage);
        });

        it('should not add a TypeStage to an array that contains it', () => {
          const typeStage: ITypeStage = { id: 123 };
          const typeStageCollection: ITypeStage[] = [
            {
              ...typeStage,
            },
            { id: 456 },
          ];
          expectedResult = service.addTypeStageToCollectionIfMissing(typeStageCollection, typeStage);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a TypeStage to an array that doesn't contain it", () => {
          const typeStage: ITypeStage = { id: 123 };
          const typeStageCollection: ITypeStage[] = [{ id: 456 }];
          expectedResult = service.addTypeStageToCollectionIfMissing(typeStageCollection, typeStage);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(typeStage);
        });

        it('should add only unique TypeStage to an array', () => {
          const typeStageArray: ITypeStage[] = [{ id: 123 }, { id: 456 }, { id: 52179 }];
          const typeStageCollection: ITypeStage[] = [{ id: 123 }];
          expectedResult = service.addTypeStageToCollectionIfMissing(typeStageCollection, ...typeStageArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const typeStage: ITypeStage = { id: 123 };
          const typeStage2: ITypeStage = { id: 456 };
          expectedResult = service.addTypeStageToCollectionIfMissing([], typeStage, typeStage2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(typeStage);
          expect(expectedResult).toContain(typeStage2);
        });

        it('should accept null and undefined values', () => {
          const typeStage: ITypeStage = { id: 123 };
          expectedResult = service.addTypeStageToCollectionIfMissing([], null, typeStage, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(typeStage);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
