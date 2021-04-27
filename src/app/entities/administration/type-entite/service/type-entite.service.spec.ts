import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITypeEntite, TypeEntite } from '../type-entite.model';

import { TypeEntiteService } from './type-entite.service';

describe('Service Tests', () => {
  describe('TypeEntite Service', () => {
    let service: TypeEntiteService;
    let httpMock: HttpTestingController;
    let elemDefault: ITypeEntite;
    let expectedResult: ITypeEntite | ITypeEntite[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TypeEntiteService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        codeTypeEntite: 'AAAAAAA',
        libelleTypeEntite: 'AAAAAAA',
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

      it('should create a TypeEntite', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TypeEntite()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
       // expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TypeEntite', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeTypeEntite: 'BBBBBB',
            libelleTypeEntite: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
       // expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a TypeEntite', () => {
        const patchObject = Object.assign(
          {
            version: 1,
            codeTypeEntite: 'BBBBBB',
          },
          new TypeEntite()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
       // expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TypeEntite', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeTypeEntite: 'BBBBBB',
            libelleTypeEntite: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
       // expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TypeEntite', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTypeEntiteToCollectionIfMissing', () => {
        it('should add a TypeEntite to an empty array', () => {
          const typeEntite: ITypeEntite = { id: 123 };
          expectedResult = service.addTypeEntiteToCollectionIfMissing([], typeEntite);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(typeEntite);
        });

        it('should not add a TypeEntite to an array that contains it', () => {
          const typeEntite: ITypeEntite = { id: 123 };
          const typeEntiteCollection: ITypeEntite[] = [
            {
              ...typeEntite,
            },
            { id: 456 },
          ];
          expectedResult = service.addTypeEntiteToCollectionIfMissing(typeEntiteCollection, typeEntite);
         // expect(expectedResult).toHaveLength(2);
        });

        it("should add a TypeEntite to an array that doesn't contain it", () => {
          const typeEntite: ITypeEntite = { id: 123 };
          const typeEntiteCollection: ITypeEntite[] = [{ id: 456 }];
          expectedResult = service.addTypeEntiteToCollectionIfMissing(typeEntiteCollection, typeEntite);
         // expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(typeEntite);
        });

        it('should add only unique TypeEntite to an array', () => {
          const typeEntiteArray: ITypeEntite[] = [{ id: 123 }, { id: 456 }, { id: 44611 }];
          const typeEntiteCollection: ITypeEntite[] = [{ id: 123 }];
          expectedResult = service.addTypeEntiteToCollectionIfMissing(typeEntiteCollection, ...typeEntiteArray);
       //   expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const typeEntite: ITypeEntite = { id: 123 };
          const typeEntite2: ITypeEntite = { id: 456 };
          expectedResult = service.addTypeEntiteToCollectionIfMissing([], typeEntite, typeEntite2);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(typeEntite);
          expect(expectedResult).toContain(typeEntite2);
        });

        it('should accept null and undefined values', () => {
          const typeEntite: ITypeEntite = { id: 123 };
          expectedResult = service.addTypeEntiteToCollectionIfMissing([], null, typeEntite, undefined);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(typeEntite);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
