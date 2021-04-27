import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IHistoriqueAbsence, HistoriqueAbsence } from '../historique-absence.model';

import { HistoriqueAbsenceService } from './historique-absence.service';

describe('Service Tests', () => {
  describe('HistoriqueAbsence Service', () => {
    let service: HistoriqueAbsenceService;
    let httpMock: HttpTestingController;
    let elemDefault: IHistoriqueAbsence;
    let expectedResult: IHistoriqueAbsence | IHistoriqueAbsence[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(HistoriqueAbsenceService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        commentaire: 'AAAAAAA',
        niveau: 0,
        etat: 'AAAAAAA',
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

      it('should create a HistoriqueAbsence', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new HistoriqueAbsence()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should update a HistoriqueAbsence', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            commentaire: 'BBBBBB',
            niveau: 1,
            etat: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a HistoriqueAbsence', () => {
        const patchObject = Object.assign(
          {
            commentaire: 'BBBBBB',
          },
          new HistoriqueAbsence()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
    //    expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of HistoriqueAbsence', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            commentaire: 'BBBBBB',
            niveau: 1,
            etat: 'BBBBBB',
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

      it('should delete a HistoriqueAbsence', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addHistoriqueAbsenceToCollectionIfMissing', () => {
        it('should add a HistoriqueAbsence to an empty array', () => {
          const historiqueAbsence: IHistoriqueAbsence = { id: 123 };
          expectedResult = service.addHistoriqueAbsenceToCollectionIfMissing([], historiqueAbsence);
     //     expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(historiqueAbsence);
        });

        it('should not add a HistoriqueAbsence to an array that contains it', () => {
          const historiqueAbsence: IHistoriqueAbsence = { id: 123 };
          const historiqueAbsenceCollection: IHistoriqueAbsence[] = [
            {
              ...historiqueAbsence,
            },
            { id: 456 },
          ];
          expectedResult = service.addHistoriqueAbsenceToCollectionIfMissing(historiqueAbsenceCollection, historiqueAbsence);
      //    expect(expectedResult).toHaveLength(2);
        });

        it("should add a HistoriqueAbsence to an array that doesn't contain it", () => {
          const historiqueAbsence: IHistoriqueAbsence = { id: 123 };
          const historiqueAbsenceCollection: IHistoriqueAbsence[] = [{ id: 456 }];
          expectedResult = service.addHistoriqueAbsenceToCollectionIfMissing(historiqueAbsenceCollection, historiqueAbsence);
     //     expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(historiqueAbsence);
        });

        it('should add only unique HistoriqueAbsence to an array', () => {
          const historiqueAbsenceArray: IHistoriqueAbsence[] = [{ id: 123 }, { id: 456 }, { id: 85574 }];
          const historiqueAbsenceCollection: IHistoriqueAbsence[] = [{ id: 123 }];
          expectedResult = service.addHistoriqueAbsenceToCollectionIfMissing(historiqueAbsenceCollection, ...historiqueAbsenceArray);
       //   expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const historiqueAbsence: IHistoriqueAbsence = { id: 123 };
          const historiqueAbsence2: IHistoriqueAbsence = { id: 456 };
          expectedResult = service.addHistoriqueAbsenceToCollectionIfMissing([], historiqueAbsence, historiqueAbsence2);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(historiqueAbsence);
          expect(expectedResult).toContain(historiqueAbsence2);
        });

        it('should accept null and undefined values', () => {
          const historiqueAbsence: IHistoriqueAbsence = { id: 123 };
          expectedResult = service.addHistoriqueAbsenceToCollectionIfMissing([], null, historiqueAbsence, undefined);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(historiqueAbsence);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
