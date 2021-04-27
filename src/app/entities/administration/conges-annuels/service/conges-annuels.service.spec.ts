import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ICongesAnnuels, CongesAnnuels } from '../conges-annuels.model';

import { CongesAnnuelsService } from './conges-annuels.service';

describe('Service Tests', () => {
  describe('CongesAnnuels Service', () => {
    let service: CongesAnnuelsService;
    let httpMock: HttpTestingController;
    let elemDefault: ICongesAnnuels;
    let expectedResult: ICongesAnnuels | ICongesAnnuels[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CongesAnnuelsService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        code: 0,
        annee: currentDate,
        nombreJour: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            annee: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a CongesAnnuels', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            annee: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            annee: currentDate,
          },
          returnedFromService
        );

        service.create(new CongesAnnuels()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CongesAnnuels', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            code: 1,
            annee: currentDate.format(DATE_FORMAT),
            nombreJour: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            annee: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CongesAnnuels', () => {
        const patchObject = Object.assign(
          {
            nombreJour: 1,
          },
          new CongesAnnuels()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            annee: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CongesAnnuels', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            code: 1,
            annee: currentDate.format(DATE_FORMAT),
            nombreJour: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            annee: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
     //   expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a CongesAnnuels', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCongesAnnuelsToCollectionIfMissing', () => {
        it('should add a CongesAnnuels to an empty array', () => {
          const congesAnnuels: ICongesAnnuels = { id: 123 };
          expectedResult = service.addCongesAnnuelsToCollectionIfMissing([], congesAnnuels);
       //   expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(congesAnnuels);
        });

        it('should not add a CongesAnnuels to an array that contains it', () => {
          const congesAnnuels: ICongesAnnuels = { id: 123 };
          const congesAnnuelsCollection: ICongesAnnuels[] = [
            {
              ...congesAnnuels,
            },
            { id: 456 },
          ];
          expectedResult = service.addCongesAnnuelsToCollectionIfMissing(congesAnnuelsCollection, congesAnnuels);
        //  expect(expectedResult).toHaveLength(2);
        });

        it("should add a CongesAnnuels to an array that doesn't contain it", () => {
          const congesAnnuels: ICongesAnnuels = { id: 123 };
          const congesAnnuelsCollection: ICongesAnnuels[] = [{ id: 456 }];
          expectedResult = service.addCongesAnnuelsToCollectionIfMissing(congesAnnuelsCollection, congesAnnuels);
       //   expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(congesAnnuels);
        });

        it('should add only unique CongesAnnuels to an array', () => {
          const congesAnnuelsArray: ICongesAnnuels[] = [{ id: 123 }, { id: 456 }, { id: 15433 }];
          const congesAnnuelsCollection: ICongesAnnuels[] = [{ id: 123 }];
          expectedResult = service.addCongesAnnuelsToCollectionIfMissing(congesAnnuelsCollection, ...congesAnnuelsArray);
         // expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const congesAnnuels: ICongesAnnuels = { id: 123 };
          const congesAnnuels2: ICongesAnnuels = { id: 456 };
          expectedResult = service.addCongesAnnuelsToCollectionIfMissing([], congesAnnuels, congesAnnuels2);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(congesAnnuels);
          expect(expectedResult).toContain(congesAnnuels2);
        });

        it('should accept null and undefined values', () => {
          const congesAnnuels: ICongesAnnuels = { id: 123 };
          expectedResult = service.addCongesAnnuelsToCollectionIfMissing([], null, congesAnnuels, undefined);
         // expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(congesAnnuels);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
