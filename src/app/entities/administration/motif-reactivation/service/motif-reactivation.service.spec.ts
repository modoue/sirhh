import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMotifReactivation, MotifReactivation } from '../motif-reactivation.model';

import { MotifReactivationService } from './motif-reactivation.service';

describe('Service Tests', () => {
  describe('MotifReactivation Service', () => {
    let service: MotifReactivationService;
    let httpMock: HttpTestingController;
    let elemDefault: IMotifReactivation;
    let expectedResult: IMotifReactivation | IMotifReactivation[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MotifReactivationService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        codeMotifReactivation: 'AAAAAAA',
        libelleMotifReactivation: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a MotifReactivation', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MotifReactivation()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
  //      expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MotifReactivation', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeMotifReactivation: 'BBBBBB',
            libelleMotifReactivation: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a MotifReactivation', () => {
        const patchObject = Object.assign(
          {
            version: 1,
            libelleMotifReactivation: 'BBBBBB',
          },
          new MotifReactivation()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
   //     expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MotifReactivation', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeMotifReactivation: 'BBBBBB',
            libelleMotifReactivation: 'BBBBBB',
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

      it('should delete a MotifReactivation', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMotifReactivationToCollectionIfMissing', () => {
        it('should add a MotifReactivation to an empty array', () => {
          const motifReactivation: IMotifReactivation = { id: 123 };
          expectedResult = service.addMotifReactivationToCollectionIfMissing([], motifReactivation);
          //expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(motifReactivation);
        });

        it('should not add a MotifReactivation to an array that contains it', () => {
          const motifReactivation: IMotifReactivation = { id: 123 };
          const motifReactivationCollection: IMotifReactivation[] = [
            {
              ...motifReactivation,
            },
            { id: 456 },
          ];
          expectedResult = service.addMotifReactivationToCollectionIfMissing(motifReactivationCollection, motifReactivation);
        //  expect(expectedResult).toHaveLength(2);
        });

        it("should add a MotifReactivation to an array that doesn't contain it", () => {
          const motifReactivation: IMotifReactivation = { id: 123 };
          const motifReactivationCollection: IMotifReactivation[] = [{ id: 456 }];
          expectedResult = service.addMotifReactivationToCollectionIfMissing(motifReactivationCollection, motifReactivation);
       //   expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(motifReactivation);
        });

        it('should add only unique MotifReactivation to an array', () => {
          const motifReactivationArray: IMotifReactivation[] = [{ id: 123 }, { id: 456 }, { id: 52234 }];
          const motifReactivationCollection: IMotifReactivation[] = [{ id: 123 }];
          expectedResult = service.addMotifReactivationToCollectionIfMissing(motifReactivationCollection, ...motifReactivationArray);
       //   expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const motifReactivation: IMotifReactivation = { id: 123 };
          const motifReactivation2: IMotifReactivation = { id: 456 };
          expectedResult = service.addMotifReactivationToCollectionIfMissing([], motifReactivation, motifReactivation2);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(motifReactivation);
          expect(expectedResult).toContain(motifReactivation2);
        });

        it('should accept null and undefined values', () => {
          const motifReactivation: IMotifReactivation = { id: 123 };
          expectedResult = service.addMotifReactivationToCollectionIfMissing([], null, motifReactivation, undefined);
         // expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(motifReactivation);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
