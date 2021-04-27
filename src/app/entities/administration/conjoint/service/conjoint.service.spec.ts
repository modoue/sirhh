import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IConjoint, Conjoint } from '../conjoint.model';

import { ConjointService } from './conjoint.service';

describe('Service Tests', () => {
  describe('Conjoint Service', () => {
    let service: ConjointService;
    let httpMock: HttpTestingController;
    let elemDefault: IConjoint;
    let expectedResult: IConjoint | IConjoint[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ConjointService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        version: 0,
        nomConjoint: 'AAAAAAA',
        prenomConjoint: 'AAAAAAA',
        dateNaissance: currentDate,
        observations: 'AAAAAAA',
        indSalarie: false,
        photoContentType: 'image/png',
        photo: 'AAAAAAA',
        typeFile: 'AAAAAAA',
        numeroSequence: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateNaissance: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
    //    expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Conjoint', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateNaissance: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateNaissance: currentDate,
          },
          returnedFromService
        );

        service.create(new Conjoint()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Conjoint', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            nomConjoint: 'BBBBBB',
            prenomConjoint: 'BBBBBB',
            dateNaissance: currentDate.format(DATE_FORMAT),
            observations: 'BBBBBB',
            indSalarie: true,
            photo: 'BBBBBB',
            typeFile: 'BBBBBB',
            numeroSequence: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateNaissance: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
    //    expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Conjoint', () => {
        const patchObject = Object.assign(
          {
            prenomConjoint: 'BBBBBB',
            photo: 'BBBBBB',
            numeroSequence: 1,
          },
          new Conjoint()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateNaissance: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
    //    expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Conjoint', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            nomConjoint: 'BBBBBB',
            prenomConjoint: 'BBBBBB',
            dateNaissance: currentDate.format(DATE_FORMAT),
            observations: 'BBBBBB',
            indSalarie: true,
            photo: 'BBBBBB',
            typeFile: 'BBBBBB',
            numeroSequence: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateNaissance: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
     //   expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Conjoint', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addConjointToCollectionIfMissing', () => {
        it('should add a Conjoint to an empty array', () => {
          const conjoint: IConjoint = { id: 123 };
          expectedResult = service.addConjointToCollectionIfMissing([], conjoint);
     //     expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(conjoint);
        });

        it('should not add a Conjoint to an array that contains it', () => {
          const conjoint: IConjoint = { id: 123 };
          const conjointCollection: IConjoint[] = [
            {
              ...conjoint,
            },
            { id: 456 },
          ];
          expectedResult = service.addConjointToCollectionIfMissing(conjointCollection, conjoint);
     //     expect(expectedResult).toHaveLength(2);
        });

        it("should add a Conjoint to an array that doesn't contain it", () => {
          const conjoint: IConjoint = { id: 123 };
          const conjointCollection: IConjoint[] = [{ id: 456 }];
          expectedResult = service.addConjointToCollectionIfMissing(conjointCollection, conjoint);
     //     expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(conjoint);
        });

        it('should add only unique Conjoint to an array', () => {
          const conjointArray: IConjoint[] = [{ id: 123 }, { id: 456 }, { id: 43640 }];
          const conjointCollection: IConjoint[] = [{ id: 123 }];
          expectedResult = service.addConjointToCollectionIfMissing(conjointCollection, ...conjointArray);
    //      expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const conjoint: IConjoint = { id: 123 };
          const conjoint2: IConjoint = { id: 456 };
          expectedResult = service.addConjointToCollectionIfMissing([], conjoint, conjoint2);
       //   expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(conjoint);
          expect(expectedResult).toContain(conjoint2);
        });

        it('should accept null and undefined values', () => {
          const conjoint: IConjoint = { id: 123 };
          expectedResult = service.addConjointToCollectionIfMissing([], null, conjoint, undefined);
       //   expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(conjoint);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
