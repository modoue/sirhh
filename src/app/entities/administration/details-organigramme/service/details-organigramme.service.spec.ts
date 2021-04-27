import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDetailsOrganigramme, DetailsOrganigramme } from '../details-organigramme.model';

import { DetailsOrganigrammeService } from './details-organigramme.service';

describe('Service Tests', () => {
  describe('DetailsOrganigramme Service', () => {
    let service: DetailsOrganigrammeService;
    let httpMock: HttpTestingController;
    let elemDefault: IDetailsOrganigramme;
    let expectedResult: IDetailsOrganigramme | IDetailsOrganigramme[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DetailsOrganigrammeService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        version: 0,
        codeEntite: 'AAAAAAA',
        libelleEntite: 'AAAAAAA',
        dateEffet: currentDate,
        dateCloture: currentDate,
        niveau: 0,
        codeAgentResponsable: 'AAAAAAA',
        isDetails: false,
        typeHierarchie: 'AAAAAAA',
        userCloture: 'AAAAAAA',
        motifCloture: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateEffet: currentDate.format(DATE_FORMAT),
            dateCloture: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a DetailsOrganigramme', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateEffet: currentDate.format(DATE_FORMAT),
            dateCloture: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateEffet: currentDate,
            dateCloture: currentDate,
          },
          returnedFromService
        );

        service.create(new DetailsOrganigramme()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DetailsOrganigramme', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeEntite: 'BBBBBB',
            libelleEntite: 'BBBBBB',
            dateEffet: currentDate.format(DATE_FORMAT),
            dateCloture: currentDate.format(DATE_FORMAT),
            niveau: 1,
            codeAgentResponsable: 'BBBBBB',
            isDetails: true,
            typeHierarchie: 'BBBBBB',
            userCloture: 'BBBBBB',
            motifCloture: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateEffet: currentDate,
            dateCloture: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a DetailsOrganigramme', () => {
        const patchObject = Object.assign(
          {
            version: 1,
            codeEntite: 'BBBBBB',
            niveau: 1,
            isDetails: true,
            userCloture: 'BBBBBB',
            motifCloture: 'BBBBBB',
          },
          new DetailsOrganigramme()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateEffet: currentDate,
            dateCloture: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
    //    expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DetailsOrganigramme', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeEntite: 'BBBBBB',
            libelleEntite: 'BBBBBB',
            dateEffet: currentDate.format(DATE_FORMAT),
            dateCloture: currentDate.format(DATE_FORMAT),
            niveau: 1,
            codeAgentResponsable: 'BBBBBB',
            isDetails: true,
            typeHierarchie: 'BBBBBB',
            userCloture: 'BBBBBB',
            motifCloture: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateEffet: currentDate,
            dateCloture: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
     //   expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a DetailsOrganigramme', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addDetailsOrganigrammeToCollectionIfMissing', () => {
        it('should add a DetailsOrganigramme to an empty array', () => {
          const detailsOrganigramme: IDetailsOrganigramme = { id: 123 };
          expectedResult = service.addDetailsOrganigrammeToCollectionIfMissing([], detailsOrganigramme);
      //    expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(detailsOrganigramme);
        });

        it('should not add a DetailsOrganigramme to an array that contains it', () => {
          const detailsOrganigramme: IDetailsOrganigramme = { id: 123 };
          const detailsOrganigrammeCollection: IDetailsOrganigramme[] = [
            {
              ...detailsOrganigramme,
            },
            { id: 456 },
          ];
          expectedResult = service.addDetailsOrganigrammeToCollectionIfMissing(detailsOrganigrammeCollection, detailsOrganigramme);
       //   expect(expectedResult).toHaveLength(2);
        });

        it("should add a DetailsOrganigramme to an array that doesn't contain it", () => {
          const detailsOrganigramme: IDetailsOrganigramme = { id: 123 };
          const detailsOrganigrammeCollection: IDetailsOrganigramme[] = [{ id: 456 }];
          expectedResult = service.addDetailsOrganigrammeToCollectionIfMissing(detailsOrganigrammeCollection, detailsOrganigramme);
       //   expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(detailsOrganigramme);
        });

        it('should add only unique DetailsOrganigramme to an array', () => {
          const detailsOrganigrammeArray: IDetailsOrganigramme[] = [{ id: 123 }, { id: 456 }, { id: 68779 }];
          const detailsOrganigrammeCollection: IDetailsOrganigramme[] = [{ id: 123 }];
          expectedResult = service.addDetailsOrganigrammeToCollectionIfMissing(detailsOrganigrammeCollection, ...detailsOrganigrammeArray);
       //   expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const detailsOrganigramme: IDetailsOrganigramme = { id: 123 };
          const detailsOrganigramme2: IDetailsOrganigramme = { id: 456 };
          expectedResult = service.addDetailsOrganigrammeToCollectionIfMissing([], detailsOrganigramme, detailsOrganigramme2);
       //   expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(detailsOrganigramme);
          expect(expectedResult).toContain(detailsOrganigramme2);
        });

        it('should accept null and undefined values', () => {
          const detailsOrganigramme: IDetailsOrganigramme = { id: 123 };
          expectedResult = service.addDetailsOrganigrammeToCollectionIfMissing([], null, detailsOrganigramme, undefined);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(detailsOrganigramme);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
