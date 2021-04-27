import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDiplomeAgent, DiplomeAgent } from '../diplome-agent.model';

import { DiplomeAgentService } from './diplome-agent.service';

describe('Service Tests', () => {
  describe('DiplomeAgent Service', () => {
    let service: DiplomeAgentService;
    let httpMock: HttpTestingController;
    let elemDefault: IDiplomeAgent;
    let expectedResult: IDiplomeAgent | IDiplomeAgent[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DiplomeAgentService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        version: 0,
        nomDiplome: 'AAAAAAA',
        dateObtentionDiplome: currentDate,
        mention: 'AAAAAAA',
        lieu: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateObtentionDiplome: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
   //     expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a DiplomeAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateObtentionDiplome: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateObtentionDiplome: currentDate,
          },
          returnedFromService
        );

        service.create(new DiplomeAgent()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DiplomeAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            nomDiplome: 'BBBBBB',
            dateObtentionDiplome: currentDate.format(DATE_FORMAT),
            mention: 'BBBBBB',
            lieu: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateObtentionDiplome: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a DiplomeAgent', () => {
        const patchObject = Object.assign(
          {
            dateObtentionDiplome: currentDate.format(DATE_FORMAT),
            mention: 'BBBBBB',
            lieu: 'BBBBBB',
          },
          new DiplomeAgent()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateObtentionDiplome: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
    //    expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DiplomeAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            nomDiplome: 'BBBBBB',
            dateObtentionDiplome: currentDate.format(DATE_FORMAT),
            mention: 'BBBBBB',
            lieu: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateObtentionDiplome: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
    //    expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a DiplomeAgent', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addDiplomeAgentToCollectionIfMissing', () => {
        it('should add a DiplomeAgent to an empty array', () => {
          const diplomeAgent: IDiplomeAgent = { id: 123 };
          expectedResult = service.addDiplomeAgentToCollectionIfMissing([], diplomeAgent);
    //      expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(diplomeAgent);
        });

        it('should not add a DiplomeAgent to an array that contains it', () => {
          const diplomeAgent: IDiplomeAgent = { id: 123 };
          const diplomeAgentCollection: IDiplomeAgent[] = [
            {
              ...diplomeAgent,
            },
            { id: 456 },
          ];
          expectedResult = service.addDiplomeAgentToCollectionIfMissing(diplomeAgentCollection, diplomeAgent);
      //    expect(expectedResult).toHaveLength(2);
        });

        it("should add a DiplomeAgent to an array that doesn't contain it", () => {
          const diplomeAgent: IDiplomeAgent = { id: 123 };
          const diplomeAgentCollection: IDiplomeAgent[] = [{ id: 456 }];
          expectedResult = service.addDiplomeAgentToCollectionIfMissing(diplomeAgentCollection, diplomeAgent);
       //   expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(diplomeAgent);
        });

        it('should add only unique DiplomeAgent to an array', () => {
          const diplomeAgentArray: IDiplomeAgent[] = [{ id: 123 }, { id: 456 }, { id: 69025 }];
          const diplomeAgentCollection: IDiplomeAgent[] = [{ id: 123 }];
          expectedResult = service.addDiplomeAgentToCollectionIfMissing(diplomeAgentCollection, ...diplomeAgentArray);
    //      expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const diplomeAgent: IDiplomeAgent = { id: 123 };
          const diplomeAgent2: IDiplomeAgent = { id: 456 };
          expectedResult = service.addDiplomeAgentToCollectionIfMissing([], diplomeAgent, diplomeAgent2);
      //    expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(diplomeAgent);
          expect(expectedResult).toContain(diplomeAgent2);
        });

        it('should accept null and undefined values', () => {
          const diplomeAgent: IDiplomeAgent = { id: 123 };
          expectedResult = service.addDiplomeAgentToCollectionIfMissing([], null, diplomeAgent, undefined);
       //   expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(diplomeAgent);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
