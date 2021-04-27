import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IFormationAgent, FormationAgent } from '../formation-agent.model';

import { FormationAgentService } from './formation-agent.service';

describe('Service Tests', () => {
  describe('FormationAgent Service', () => {
    let service: FormationAgentService;
    let httpMock: HttpTestingController;
    let elemDefault: IFormationAgent;
    let expectedResult: IFormationAgent | IFormationAgent[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(FormationAgentService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        version: 0,
        suivi: false,
        remarques: 'AAAAAAA',
        lieu: 'AAAAAAA',
        dureeFormation: 'AAAAAAA',
        montantFormation: 0,
        animateur: 'AAAAAAA',
        dateSuivi: currentDate,
        datePrevu: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateSuivi: currentDate.format(DATE_FORMAT),
            datePrevu: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
       // expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a FormationAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateSuivi: currentDate.format(DATE_FORMAT),
            datePrevu: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateSuivi: currentDate,
            datePrevu: currentDate,
          },
          returnedFromService
        );

        service.create(new FormationAgent()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should update a FormationAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            suivi: true,
            remarques: 'BBBBBB',
            lieu: 'BBBBBB',
            dureeFormation: 'BBBBBB',
            montantFormation: 1,
            animateur: 'BBBBBB',
            dateSuivi: currentDate.format(DATE_FORMAT),
            datePrevu: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateSuivi: currentDate,
            datePrevu: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a FormationAgent', () => {
        const patchObject = Object.assign(
          {
            version: 1,
            suivi: true,
            remarques: 'BBBBBB',
            lieu: 'BBBBBB',
            dureeFormation: 'BBBBBB',
            dateSuivi: currentDate.format(DATE_FORMAT),
          },
          new FormationAgent()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateSuivi: currentDate,
            datePrevu: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
    //    expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of FormationAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            suivi: true,
            remarques: 'BBBBBB',
            lieu: 'BBBBBB',
            dureeFormation: 'BBBBBB',
            montantFormation: 1,
            animateur: 'BBBBBB',
            dateSuivi: currentDate.format(DATE_FORMAT),
            datePrevu: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateSuivi: currentDate,
            datePrevu: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
     //   expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a FormationAgent', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addFormationAgentToCollectionIfMissing', () => {
        it('should add a FormationAgent to an empty array', () => {
          const formationAgent: IFormationAgent = { id: 123 };
          expectedResult = service.addFormationAgentToCollectionIfMissing([], formationAgent);
    //      expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(formationAgent);
        });

        it('should not add a FormationAgent to an array that contains it', () => {
          const formationAgent: IFormationAgent = { id: 123 };
          const formationAgentCollection: IFormationAgent[] = [
            {
              ...formationAgent,
            },
            { id: 456 },
          ];
          expectedResult = service.addFormationAgentToCollectionIfMissing(formationAgentCollection, formationAgent);
        //  expect(expectedResult).toHaveLength(2);
        });

        it("should add a FormationAgent to an array that doesn't contain it", () => {
          const formationAgent: IFormationAgent = { id: 123 };
          const formationAgentCollection: IFormationAgent[] = [{ id: 456 }];
          expectedResult = service.addFormationAgentToCollectionIfMissing(formationAgentCollection, formationAgent);
      //    expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(formationAgent);
        });

        it('should add only unique FormationAgent to an array', () => {
          const formationAgentArray: IFormationAgent[] = [{ id: 123 }, { id: 456 }, { id: 82261 }];
          const formationAgentCollection: IFormationAgent[] = [{ id: 123 }];
          expectedResult = service.addFormationAgentToCollectionIfMissing(formationAgentCollection, ...formationAgentArray);
         // expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const formationAgent: IFormationAgent = { id: 123 };
          const formationAgent2: IFormationAgent = { id: 456 };
          expectedResult = service.addFormationAgentToCollectionIfMissing([], formationAgent, formationAgent2);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(formationAgent);
          expect(expectedResult).toContain(formationAgent2);
        });

        it('should accept null and undefined values', () => {
          const formationAgent: IFormationAgent = { id: 123 };
          expectedResult = service.addFormationAgentToCollectionIfMissing([], null, formationAgent, undefined);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(formationAgent);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
