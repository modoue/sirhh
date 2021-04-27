import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ISanctionAgent, SanctionAgent } from '../sanction-agent.model';

import { SanctionAgentService } from './sanction-agent.service';

describe('Service Tests', () => {
  describe('SanctionAgent Service', () => {
    let service: SanctionAgentService;
    let httpMock: HttpTestingController;
    let elemDefault: ISanctionAgent;
    let expectedResult: ISanctionAgent | ISanctionAgent[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(SanctionAgentService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        version: 0,
        motifSanction: 'AAAAAAA',
        dateSanction: currentDate,
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
            dateSanction: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a SanctionAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateSanction: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateSanction: currentDate,
          },
          returnedFromService
        );

        service.create(new SanctionAgent()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a SanctionAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            motifSanction: 'BBBBBB',
            dateSanction: currentDate.format(DATE_FORMAT),
            observations: 'BBBBBB',
            file: 'BBBBBB',
            nomFile: 'BBBBBB',
            typeFile: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateSanction: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a SanctionAgent', () => {
        const patchObject = Object.assign(
          {
            dateSanction: currentDate.format(DATE_FORMAT),
            observations: 'BBBBBB',
            nomFile: 'BBBBBB',
            typeFile: 'BBBBBB',
          },
          new SanctionAgent()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateSanction: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of SanctionAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            motifSanction: 'BBBBBB',
            dateSanction: currentDate.format(DATE_FORMAT),
            observations: 'BBBBBB',
            file: 'BBBBBB',
            nomFile: 'BBBBBB',
            typeFile: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateSanction: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a SanctionAgent', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addSanctionAgentToCollectionIfMissing', () => {
        it('should add a SanctionAgent to an empty array', () => {
          const sanctionAgent: ISanctionAgent = { id: 123 };
          expectedResult = service.addSanctionAgentToCollectionIfMissing([], sanctionAgent);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(sanctionAgent);
        });

        it('should not add a SanctionAgent to an array that contains it', () => {
          const sanctionAgent: ISanctionAgent = { id: 123 };
          const sanctionAgentCollection: ISanctionAgent[] = [
            {
              ...sanctionAgent,
            },
            { id: 456 },
          ];
          expectedResult = service.addSanctionAgentToCollectionIfMissing(sanctionAgentCollection, sanctionAgent);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a SanctionAgent to an array that doesn't contain it", () => {
          const sanctionAgent: ISanctionAgent = { id: 123 };
          const sanctionAgentCollection: ISanctionAgent[] = [{ id: 456 }];
          expectedResult = service.addSanctionAgentToCollectionIfMissing(sanctionAgentCollection, sanctionAgent);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(sanctionAgent);
        });

        it('should add only unique SanctionAgent to an array', () => {
          const sanctionAgentArray: ISanctionAgent[] = [{ id: 123 }, { id: 456 }, { id: 10025 }];
          const sanctionAgentCollection: ISanctionAgent[] = [{ id: 123 }];
          expectedResult = service.addSanctionAgentToCollectionIfMissing(sanctionAgentCollection, ...sanctionAgentArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const sanctionAgent: ISanctionAgent = { id: 123 };
          const sanctionAgent2: ISanctionAgent = { id: 456 };
          expectedResult = service.addSanctionAgentToCollectionIfMissing([], sanctionAgent, sanctionAgent2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(sanctionAgent);
          expect(expectedResult).toContain(sanctionAgent2);
        });

        it('should accept null and undefined values', () => {
          const sanctionAgent: ISanctionAgent = { id: 123 };
          expectedResult = service.addSanctionAgentToCollectionIfMissing([], null, sanctionAgent, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(sanctionAgent);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
