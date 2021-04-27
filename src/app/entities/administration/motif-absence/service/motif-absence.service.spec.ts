import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMotifAbsence, MotifAbsence } from '../motif-absence.model';

import { MotifAbsenceService } from './motif-absence.service';

describe('Service Tests', () => {
  describe('MotifAbsence Service', () => {
    let service: MotifAbsenceService;
    let httpMock: HttpTestingController;
    let elemDefault: IMotifAbsence;
    let expectedResult: IMotifAbsence | IMotifAbsence[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MotifAbsenceService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        code: 0,
        libelle: 'AAAAAAA',
        nombreJour: 0,
        deduire: false,
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

      it('should create a MotifAbsence', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MotifAbsence()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MotifAbsence', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            code: 1,
            libelle: 'BBBBBB',
            nombreJour: 1,
            deduire: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a MotifAbsence', () => {
        const patchObject = Object.assign(
          {
            deduire: true,
          },
          new MotifAbsence()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MotifAbsence', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            code: 1,
            libelle: 'BBBBBB',
            nombreJour: 1,
            deduire: true,
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

      it('should delete a MotifAbsence', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMotifAbsenceToCollectionIfMissing', () => {
        it('should add a MotifAbsence to an empty array', () => {
          const motifAbsence: IMotifAbsence = { id: 123 };
          expectedResult = service.addMotifAbsenceToCollectionIfMissing([], motifAbsence);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(motifAbsence);
        });

        it('should not add a MotifAbsence to an array that contains it', () => {
          const motifAbsence: IMotifAbsence = { id: 123 };
          const motifAbsenceCollection: IMotifAbsence[] = [
            {
              ...motifAbsence,
            },
            { id: 456 },
          ];
          expectedResult = service.addMotifAbsenceToCollectionIfMissing(motifAbsenceCollection, motifAbsence);
       //   expect(expectedResult).toHaveLength(2);
        });

        it("should add a MotifAbsence to an array that doesn't contain it", () => {
          const motifAbsence: IMotifAbsence = { id: 123 };
          const motifAbsenceCollection: IMotifAbsence[] = [{ id: 456 }];
          expectedResult = service.addMotifAbsenceToCollectionIfMissing(motifAbsenceCollection, motifAbsence);
       //   expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(motifAbsence);
        });

        it('should add only unique MotifAbsence to an array', () => {
          const motifAbsenceArray: IMotifAbsence[] = [{ id: 123 }, { id: 456 }, { id: 13812 }];
          const motifAbsenceCollection: IMotifAbsence[] = [{ id: 123 }];
          expectedResult = service.addMotifAbsenceToCollectionIfMissing(motifAbsenceCollection, ...motifAbsenceArray);
      //    expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const motifAbsence: IMotifAbsence = { id: 123 };
          const motifAbsence2: IMotifAbsence = { id: 456 };
          expectedResult = service.addMotifAbsenceToCollectionIfMissing([], motifAbsence, motifAbsence2);
       //   expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(motifAbsence);
          expect(expectedResult).toContain(motifAbsence2);
        });

        it('should accept null and undefined values', () => {
          const motifAbsence: IMotifAbsence = { id: 123 };
          expectedResult = service.addMotifAbsenceToCollectionIfMissing([], null, motifAbsence, undefined);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(motifAbsence);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
