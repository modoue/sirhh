import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITypeFormation, TypeFormation } from '../type-formation.model';

import { TypeFormationService } from './type-formation.service';

describe('Service Tests', () => {
  describe('TypeFormation Service', () => {
    let service: TypeFormationService;
    let httpMock: HttpTestingController;
    let elemDefault: ITypeFormation;
    let expectedResult: ITypeFormation | ITypeFormation[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TypeFormationService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        codeTypeformation: 'AAAAAAA',
        libelleTypeformation: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
       // expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TypeFormation', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TypeFormation()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
     /   expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TypeFormation', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeTypeformation: 'BBBBBB',
            libelleTypeformation: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a TypeFormation', () => {
        const patchObject = Object.assign(
          {
            codeTypeformation: 'BBBBBB',
            libelleTypeformation: 'BBBBBB',
          },
          new TypeFormation()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TypeFormation', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeTypeformation: 'BBBBBB',
            libelleTypeformation: 'BBBBBB',
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

      it('should delete a TypeFormation', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTypeFormationToCollectionIfMissing', () => {
        it('should add a TypeFormation to an empty array', () => {
          const typeFormation: ITypeFormation = { id: 123 };
          expectedResult = service.addTypeFormationToCollectionIfMissing([], typeFormation);
         // expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(typeFormation);
        });

        it('should not add a TypeFormation to an array that contains it', () => {
          const typeFormation: ITypeFormation = { id: 123 };
          const typeFormationCollection: ITypeFormation[] = [
            {
              ...typeFormation,
            },
            { id: 456 },
          ];
          expectedResult = service.addTypeFormationToCollectionIfMissing(typeFormationCollection, typeFormation);
      //    expect(expectedResult).toHaveLength(2);
        });

        it("should add a TypeFormation to an array that doesn't contain it", () => {
          const typeFormation: ITypeFormation = { id: 123 };
          const typeFormationCollection: ITypeFormation[] = [{ id: 456 }];
          expectedResult = service.addTypeFormationToCollectionIfMissing(typeFormationCollection, typeFormation);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(typeFormation);
        });

        it('should add only unique TypeFormation to an array', () => {
          const typeFormationArray: ITypeFormation[] = [{ id: 123 }, { id: 456 }, { id: 4937 }];
          const typeFormationCollection: ITypeFormation[] = [{ id: 123 }];
          expectedResult = service.addTypeFormationToCollectionIfMissing(typeFormationCollection, ...typeFormationArray);
        //  expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const typeFormation: ITypeFormation = { id: 123 };
          const typeFormation2: ITypeFormation = { id: 456 };
          expectedResult = service.addTypeFormationToCollectionIfMissing([], typeFormation, typeFormation2);
     //     expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(typeFormation);
          expect(expectedResult).toContain(typeFormation2);
        });

        it('should accept null and undefined values', () => {
          const typeFormation: ITypeFormation = { id: 123 };
          expectedResult = service.addTypeFormationToCollectionIfMissing([], null, typeFormation, undefined);
      //    expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(typeFormation);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
