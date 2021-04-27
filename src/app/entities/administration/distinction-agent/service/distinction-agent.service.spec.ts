import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDistinctionAgent, DistinctionAgent } from '../distinction-agent.model';

import { DistinctionAgentService } from './distinction-agent.service';

describe('Service Tests', () => {
  describe('DistinctionAgent Service', () => {
    let service: DistinctionAgentService;
    let httpMock: HttpTestingController;
    let elemDefault: IDistinctionAgent;
    let expectedResult: IDistinctionAgent | IDistinctionAgent[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DistinctionAgentService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        version: 0,
        distinction: 'AAAAAAA',
        dateDistinction: currentDate,
        motifDistinction: 'AAAAAAA',
        observations: 'AAAAAAA',
        fileContentType: 'image/png',
        file: 'AAAAAAA',
        nomFile: 'AAAAAAA',
        typeFile: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateDistinction: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a DistinctionAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateDistinction: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDistinction: currentDate,
          },
          returnedFromService
        );

        service.create(new DistinctionAgent()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DistinctionAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            distinction: 'BBBBBB',
            dateDistinction: currentDate.format(DATE_FORMAT),
            motifDistinction: 'BBBBBB',
            observations: 'BBBBBB',
            file: 'BBBBBB',
            nomFile: 'BBBBBB',
            typeFile: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDistinction: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a DistinctionAgent', () => {
        const patchObject = Object.assign(
          {
            version: 1,
            dateDistinction: currentDate.format(DATE_FORMAT),
            file: 'BBBBBB',
            nomFile: 'BBBBBB',
          },
          new DistinctionAgent()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateDistinction: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DistinctionAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            distinction: 'BBBBBB',
            dateDistinction: currentDate.format(DATE_FORMAT),
            motifDistinction: 'BBBBBB',
            observations: 'BBBBBB',
            file: 'BBBBBB',
            nomFile: 'BBBBBB',
            typeFile: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDistinction: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a DistinctionAgent', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addDistinctionAgentToCollectionIfMissing', () => {
        it('should add a DistinctionAgent to an empty array', () => {
          const distinctionAgent: IDistinctionAgent = { id: 123 };
          expectedResult = service.addDistinctionAgentToCollectionIfMissing([], distinctionAgent);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(distinctionAgent);
        });

        it('should not add a DistinctionAgent to an array that contains it', () => {
          const distinctionAgent: IDistinctionAgent = { id: 123 };
          const distinctionAgentCollection: IDistinctionAgent[] = [
            {
              ...distinctionAgent,
            },
            { id: 456 },
          ];
          expectedResult = service.addDistinctionAgentToCollectionIfMissing(distinctionAgentCollection, distinctionAgent);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a DistinctionAgent to an array that doesn't contain it", () => {
          const distinctionAgent: IDistinctionAgent = { id: 123 };
          const distinctionAgentCollection: IDistinctionAgent[] = [{ id: 456 }];
          expectedResult = service.addDistinctionAgentToCollectionIfMissing(distinctionAgentCollection, distinctionAgent);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(distinctionAgent);
        });

        it('should add only unique DistinctionAgent to an array', () => {
          const distinctionAgentArray: IDistinctionAgent[] = [{ id: 123 }, { id: 456 }, { id: 56596 }];
          const distinctionAgentCollection: IDistinctionAgent[] = [{ id: 123 }];
          expectedResult = service.addDistinctionAgentToCollectionIfMissing(distinctionAgentCollection, ...distinctionAgentArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const distinctionAgent: IDistinctionAgent = { id: 123 };
          const distinctionAgent2: IDistinctionAgent = { id: 456 };
          expectedResult = service.addDistinctionAgentToCollectionIfMissing([], distinctionAgent, distinctionAgent2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(distinctionAgent);
          expect(expectedResult).toContain(distinctionAgent2);
        });

        it('should accept null and undefined values', () => {
          const distinctionAgent: IDistinctionAgent = { id: 123 };
          expectedResult = service.addDistinctionAgentToCollectionIfMissing([], null, distinctionAgent, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(distinctionAgent);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
