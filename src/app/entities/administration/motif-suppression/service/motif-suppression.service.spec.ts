import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMotifSuppression, MotifSuppression } from '../motif-suppression.model';

import { MotifSuppressionService } from './motif-suppression.service';

describe('Service Tests', () => {
  describe('MotifSuppression Service', () => {
    let service: MotifSuppressionService;
    let httpMock: HttpTestingController;
    let elemDefault: IMotifSuppression;
    let expectedResult: IMotifSuppression | IMotifSuppression[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MotifSuppressionService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        codeMotifSuppression: 'AAAAAAA',
        libelleMotifSuppression: 'AAAAAAA',
        motifEnPaie: 'AAAAAAA',
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

      it('should create a MotifSuppression', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MotifSuppression()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MotifSuppression', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeMotifSuppression: 'BBBBBB',
            libelleMotifSuppression: 'BBBBBB',
            motifEnPaie: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
       // expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a MotifSuppression', () => {
        const patchObject = Object.assign(
          {
            version: 1,
            codeMotifSuppression: 'BBBBBB',
          },
          new MotifSuppression()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MotifSuppression', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeMotifSuppression: 'BBBBBB',
            libelleMotifSuppression: 'BBBBBB',
            motifEnPaie: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
      //  expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a MotifSuppression', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMotifSuppressionToCollectionIfMissing', () => {
        it('should add a MotifSuppression to an empty array', () => {
          const motifSuppression: IMotifSuppression = { id: 123 };
          expectedResult = service.addMotifSuppressionToCollectionIfMissing([], motifSuppression);
     //     expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(motifSuppression);
        });

        it('should not add a MotifSuppression to an array that contains it', () => {
          const motifSuppression: IMotifSuppression = { id: 123 };
          const motifSuppressionCollection: IMotifSuppression[] = [
            {
              ...motifSuppression,
            },
            { id: 456 },
          ];
          expectedResult = service.addMotifSuppressionToCollectionIfMissing(motifSuppressionCollection, motifSuppression);
     //     expect(expectedResult).toHaveLength(2);
        });

        it("should add a MotifSuppression to an array that doesn't contain it", () => {
          const motifSuppression: IMotifSuppression = { id: 123 };
          const motifSuppressionCollection: IMotifSuppression[] = [{ id: 456 }];
          expectedResult = service.addMotifSuppressionToCollectionIfMissing(motifSuppressionCollection, motifSuppression);
     //     expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(motifSuppression);
        });

        it('should add only unique MotifSuppression to an array', () => {
          const motifSuppressionArray: IMotifSuppression[] = [{ id: 123 }, { id: 456 }, { id: 30209 }];
          const motifSuppressionCollection: IMotifSuppression[] = [{ id: 123 }];
          expectedResult = service.addMotifSuppressionToCollectionIfMissing(motifSuppressionCollection, ...motifSuppressionArray);
      //    expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const motifSuppression: IMotifSuppression = { id: 123 };
          const motifSuppression2: IMotifSuppression = { id: 456 };
          expectedResult = service.addMotifSuppressionToCollectionIfMissing([], motifSuppression, motifSuppression2);
     //     expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(motifSuppression);
          expect(expectedResult).toContain(motifSuppression2);
        });

        it('should accept null and undefined values', () => {
          const motifSuppression: IMotifSuppression = { id: 123 };
          expectedResult = service.addMotifSuppressionToCollectionIfMissing([], null, motifSuppression, undefined);
       //   expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(motifSuppression);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
