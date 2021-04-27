import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IRegimeHoraireAgent, RegimeHoraireAgent } from '../regime-horaire-agent.model';

import { RegimeHoraireAgentService } from './regime-horaire-agent.service';

describe('Service Tests', () => {
  describe('RegimeHoraireAgent Service', () => {
    let service: RegimeHoraireAgentService;
    let httpMock: HttpTestingController;
    let elemDefault: IRegimeHoraireAgent;
    let expectedResult: IRegimeHoraireAgent | IRegimeHoraireAgent[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(RegimeHoraireAgentService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        version: 0,
        dateEffet: currentDate,
        dateFinEffet: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateEffet: currentDate.format(DATE_FORMAT),
            dateFinEffet: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a RegimeHoraireAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateEffet: currentDate.format(DATE_FORMAT),
            dateFinEffet: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateEffet: currentDate,
            dateFinEffet: currentDate,
          },
          returnedFromService
        );

        service.create(new RegimeHoraireAgent()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a RegimeHoraireAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            dateEffet: currentDate.format(DATE_FORMAT),
            dateFinEffet: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateEffet: currentDate,
            dateFinEffet: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a RegimeHoraireAgent', () => {
        const patchObject = Object.assign(
          {
            version: 1,
          },
          new RegimeHoraireAgent()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateEffet: currentDate,
            dateFinEffet: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of RegimeHoraireAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            dateEffet: currentDate.format(DATE_FORMAT),
            dateFinEffet: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateEffet: currentDate,
            dateFinEffet: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a RegimeHoraireAgent', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addRegimeHoraireAgentToCollectionIfMissing', () => {
        it('should add a RegimeHoraireAgent to an empty array', () => {
          const regimeHoraireAgent: IRegimeHoraireAgent = { id: 123 };
          expectedResult = service.addRegimeHoraireAgentToCollectionIfMissing([], regimeHoraireAgent);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(regimeHoraireAgent);
        });

        it('should not add a RegimeHoraireAgent to an array that contains it', () => {
          const regimeHoraireAgent: IRegimeHoraireAgent = { id: 123 };
          const regimeHoraireAgentCollection: IRegimeHoraireAgent[] = [
            {
              ...regimeHoraireAgent,
            },
            { id: 456 },
          ];
          expectedResult = service.addRegimeHoraireAgentToCollectionIfMissing(regimeHoraireAgentCollection, regimeHoraireAgent);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a RegimeHoraireAgent to an array that doesn't contain it", () => {
          const regimeHoraireAgent: IRegimeHoraireAgent = { id: 123 };
          const regimeHoraireAgentCollection: IRegimeHoraireAgent[] = [{ id: 456 }];
          expectedResult = service.addRegimeHoraireAgentToCollectionIfMissing(regimeHoraireAgentCollection, regimeHoraireAgent);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(regimeHoraireAgent);
        });

        it('should add only unique RegimeHoraireAgent to an array', () => {
          const regimeHoraireAgentArray: IRegimeHoraireAgent[] = [{ id: 123 }, { id: 456 }, { id: 19301 }];
          const regimeHoraireAgentCollection: IRegimeHoraireAgent[] = [{ id: 123 }];
          expectedResult = service.addRegimeHoraireAgentToCollectionIfMissing(regimeHoraireAgentCollection, ...regimeHoraireAgentArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const regimeHoraireAgent: IRegimeHoraireAgent = { id: 123 };
          const regimeHoraireAgent2: IRegimeHoraireAgent = { id: 456 };
          expectedResult = service.addRegimeHoraireAgentToCollectionIfMissing([], regimeHoraireAgent, regimeHoraireAgent2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(regimeHoraireAgent);
          expect(expectedResult).toContain(regimeHoraireAgent2);
        });

        it('should accept null and undefined values', () => {
          const regimeHoraireAgent: IRegimeHoraireAgent = { id: 123 };
          expectedResult = service.addRegimeHoraireAgentToCollectionIfMissing([], null, regimeHoraireAgent, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(regimeHoraireAgent);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
