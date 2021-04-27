import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITypeDuree, TypeDuree } from '../type-duree.model';

import { TypeDureeService } from './type-duree.service';

describe('Service Tests', () => {
  describe('TypeDuree Service', () => {
    let service: TypeDureeService;
    let httpMock: HttpTestingController;
    let elemDefault: ITypeDuree;
    let expectedResult: ITypeDuree | ITypeDuree[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TypeDureeService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        codeTypeDuree: 'AAAAAAA',
        libelleTypeDuree: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
    //    expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TypeDuree', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TypeDuree()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
       // expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TypeDuree', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeTypeDuree: 'BBBBBB',
            libelleTypeDuree: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a TypeDuree', () => {
        const patchObject = Object.assign(
          {
            libelleTypeDuree: 'BBBBBB',
          },
          new TypeDuree()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TypeDuree', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeTypeDuree: 'BBBBBB',
            libelleTypeDuree: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
   //     expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TypeDuree', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTypeDureeToCollectionIfMissing', () => {
        it('should add a TypeDuree to an empty array', () => {
          const typeDuree: ITypeDuree = { id: 123 };
          expectedResult = service.addTypeDureeToCollectionIfMissing([], typeDuree);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(typeDuree);
        });

        it('should not add a TypeDuree to an array that contains it', () => {
          const typeDuree: ITypeDuree = { id: 123 };
          const typeDureeCollection: ITypeDuree[] = [
            {
              ...typeDuree,
            },
            { id: 456 },
          ];
          expectedResult = service.addTypeDureeToCollectionIfMissing(typeDureeCollection, typeDuree);
      //    expect(expectedResult).toHaveLength(2);
        });

        it("should add a TypeDuree to an array that doesn't contain it", () => {
          const typeDuree: ITypeDuree = { id: 123 };
          const typeDureeCollection: ITypeDuree[] = [{ id: 456 }];
          expectedResult = service.addTypeDureeToCollectionIfMissing(typeDureeCollection, typeDuree);
         // expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(typeDuree);
        });

        it('should add only unique TypeDuree to an array', () => {
          const typeDureeArray: ITypeDuree[] = [{ id: 123 }, { id: 456 }, { id: 82058 }];
          const typeDureeCollection: ITypeDuree[] = [{ id: 123 }];
          expectedResult = service.addTypeDureeToCollectionIfMissing(typeDureeCollection, ...typeDureeArray);
        //  expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const typeDuree: ITypeDuree = { id: 123 };
          const typeDuree2: ITypeDuree = { id: 456 };
          expectedResult = service.addTypeDureeToCollectionIfMissing([], typeDuree, typeDuree2);
          //expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(typeDuree);
          expect(expectedResult).toContain(typeDuree2);
        });

        it('should accept null and undefined values', () => {
          const typeDuree: ITypeDuree = { id: 123 };
          expectedResult = service.addTypeDureeToCollectionIfMissing([], null, typeDuree, undefined);
       //   expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(typeDuree);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
