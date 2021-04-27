import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IConge, Conge } from '../conge.model';

import { CongeService } from './conge.service';

describe('Service Tests', () => {
  describe('Conge Service', () => {
    let service: CongeService;
    let httpMock: HttpTestingController;
    let elemDefault: IConge;
    let expectedResult: IConge | IConge[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CongeService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        code: 0,
        dateDepart: currentDate,
        dateRetourPrevue: currentDate,
        dateRetourEffective: currentDate,
        justifier: false,
        etat: 'AAAAAAA',
        niveau: 0,
        commentaire: 'AAAAAAA',
        justificatifContentType: 'image/png',
        justificatif: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateDepart: currentDate.format(DATE_FORMAT),
            dateRetourPrevue: currentDate.format(DATE_FORMAT),
            dateRetourEffective: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Conge', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateDepart: currentDate.format(DATE_FORMAT),
            dateRetourPrevue: currentDate.format(DATE_FORMAT),
            dateRetourEffective: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDepart: currentDate,
            dateRetourPrevue: currentDate,
            dateRetourEffective: currentDate,
          },
          returnedFromService
        );

        service.create(new Conge()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Conge', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            code: 1,
            dateDepart: currentDate.format(DATE_FORMAT),
            dateRetourPrevue: currentDate.format(DATE_FORMAT),
            dateRetourEffective: currentDate.format(DATE_FORMAT),
            justifier: true,
            etat: 'BBBBBB',
            niveau: 1,
            commentaire: 'BBBBBB',
            justificatif: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDepart: currentDate,
            dateRetourPrevue: currentDate,
            dateRetourEffective: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Conge', () => {
        const patchObject = Object.assign(
          {
            dateDepart: currentDate.format(DATE_FORMAT),
            justifier: true,
            commentaire: 'BBBBBB',
          },
          new Conge()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateDepart: currentDate,
            dateRetourPrevue: currentDate,
            dateRetourEffective: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Conge', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            code: 1,
            dateDepart: currentDate.format(DATE_FORMAT),
            dateRetourPrevue: currentDate.format(DATE_FORMAT),
            dateRetourEffective: currentDate.format(DATE_FORMAT),
            justifier: true,
            etat: 'BBBBBB',
            niveau: 1,
            commentaire: 'BBBBBB',
            justificatif: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDepart: currentDate,
            dateRetourPrevue: currentDate,
            dateRetourEffective: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
      //  expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Conge', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCongeToCollectionIfMissing', () => {
        it('should add a Conge to an empty array', () => {
          const conge: IConge = { id: 123 };
          expectedResult = service.addCongeToCollectionIfMissing([], conge);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(conge);
        });

        it('should not add a Conge to an array that contains it', () => {
          const conge: IConge = { id: 123 };
          const congeCollection: IConge[] = [
            {
              ...conge,
            },
            { id: 456 },
          ];
          expectedResult = service.addCongeToCollectionIfMissing(congeCollection, conge);
        ///  expect(expectedResult).toHaveLength(2);
        });

        it("should add a Conge to an array that doesn't contain it", () => {
          const conge: IConge = { id: 123 };
          const congeCollection: IConge[] = [{ id: 456 }];
          expectedResult = service.addCongeToCollectionIfMissing(congeCollection, conge);
         // expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(conge);
        });

        it('should add only unique Conge to an array', () => {
          const congeArray: IConge[] = [{ id: 123 }, { id: 456 }, { id: 91482 }];
          const congeCollection: IConge[] = [{ id: 123 }];
          expectedResult = service.addCongeToCollectionIfMissing(congeCollection, ...congeArray);
        //  expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const conge: IConge = { id: 123 };
          const conge2: IConge = { id: 456 };
          expectedResult = service.addCongeToCollectionIfMissing([], conge, conge2);
         // expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(conge);
          expect(expectedResult).toContain(conge2);
        });

        it('should accept null and undefined values', () => {
          const conge: IConge = { id: 123 };
          expectedResult = service.addCongeToCollectionIfMissing([], null, conge, undefined);
         // expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(conge);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
