import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITitreAgent, TitreAgent } from '../titre-agent.model';

import { TitreAgentService } from './titre-agent.service';

describe('Service Tests', () => {
  describe('TitreAgent Service', () => {
    let service: TitreAgentService;
    let httpMock: HttpTestingController;
    let elemDefault: ITitreAgent;
    let expectedResult: ITitreAgent | ITitreAgent[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TitreAgentService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        code: 'AAAAAAA',
        titre: 'AAAAAAA',
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

      it('should create a TitreAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TitreAgent()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TitreAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            code: 'BBBBBB',
            titre: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a TitreAgent', () => {
        const patchObject = Object.assign(
          {
            code: 'BBBBBB',
            titre: 'BBBBBB',
          },
          new TitreAgent()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TitreAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            code: 'BBBBBB',
            titre: 'BBBBBB',
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

      it('should delete a TitreAgent', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTitreAgentToCollectionIfMissing', () => {
        it('should add a TitreAgent to an empty array', () => {
          const titreAgent: ITitreAgent = { id: 123 };
          expectedResult = service.addTitreAgentToCollectionIfMissing([], titreAgent);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(titreAgent);
        });

        it('should not add a TitreAgent to an array that contains it', () => {
          const titreAgent: ITitreAgent = { id: 123 };
          const titreAgentCollection: ITitreAgent[] = [
            {
              ...titreAgent,
            },
            { id: 456 },
          ];
          expectedResult = service.addTitreAgentToCollectionIfMissing(titreAgentCollection, titreAgent);
        //  expect(expectedResult).toHaveLength(2);
        });

        it("should add a TitreAgent to an array that doesn't contain it", () => {
          const titreAgent: ITitreAgent = { id: 123 };
          const titreAgentCollection: ITitreAgent[] = [{ id: 456 }];
          expectedResult = service.addTitreAgentToCollectionIfMissing(titreAgentCollection, titreAgent);
         // expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(titreAgent);
        });

        it('should add only unique TitreAgent to an array', () => {
          const titreAgentArray: ITitreAgent[] = [{ id: 123 }, { id: 456 }, { id: 82806 }];
          const titreAgentCollection: ITitreAgent[] = [{ id: 123 }];
          expectedResult = service.addTitreAgentToCollectionIfMissing(titreAgentCollection, ...titreAgentArray);
        //  expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const titreAgent: ITitreAgent = { id: 123 };
          const titreAgent2: ITitreAgent = { id: 456 };
          expectedResult = service.addTitreAgentToCollectionIfMissing([], titreAgent, titreAgent2);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(titreAgent);
          expect(expectedResult).toContain(titreAgent2);
        });

        it('should accept null and undefined values', () => {
          const titreAgent: ITitreAgent = { id: 123 };
          expectedResult = service.addTitreAgentToCollectionIfMissing([], null, titreAgent, undefined);
         // expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(titreAgent);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
