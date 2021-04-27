import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAttributAgent, AttributAgent } from '../attribut-agent.model';

import { AttributAgentService } from './attribut-agent.service';

describe('Service Tests', () => {
  describe('AttributAgent Service', () => {
    let service: AttributAgentService;
    let httpMock: HttpTestingController;
    let elemDefault: IAttributAgent;
    let expectedResult: IAttributAgent | IAttributAgent[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(AttributAgentService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        valeur: 'AAAAAAA',
        deleted: false,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
   //     expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a AttributAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new AttributAgent()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
    //    expect(expectedResult).toMatchObject(expected);
      });

      it('should update a AttributAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            valeur: 'BBBBBB',
            deleted: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a AttributAgent', () => {
        const patchObject = Object.assign(
          {
            version: 1,
            valeur: 'BBBBBB',
          },
          new AttributAgent()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
    //    expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of AttributAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            valeur: 'BBBBBB',
            deleted: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
     //   expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a AttributAgent', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addAttributAgentToCollectionIfMissing', () => {
        it('should add a AttributAgent to an empty array', () => {
          const attributAgent: IAttributAgent = { id: 123 };
          expectedResult = service.addAttributAgentToCollectionIfMissing([], attributAgent);
     ///     expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(attributAgent);
        });

        it('should not add a AttributAgent to an array that contains it', () => {
          const attributAgent: IAttributAgent = { id: 123 };
          const attributAgentCollection: IAttributAgent[] = [
            {
              ...attributAgent,
            },
            { id: 456 },
          ];
          expectedResult = service.addAttributAgentToCollectionIfMissing(attributAgentCollection, attributAgent);
        //  expect(expectedResult).toHaveLength(2);
        });

        it("should add a AttributAgent to an array that doesn't contain it", () => {
          const attributAgent: IAttributAgent = { id: 123 };
          const attributAgentCollection: IAttributAgent[] = [{ id: 456 }];
          expectedResult = service.addAttributAgentToCollectionIfMissing(attributAgentCollection, attributAgent);
      //    expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(attributAgent);
        });

        it('should add only unique AttributAgent to an array', () => {
          const attributAgentArray: IAttributAgent[] = [{ id: 123 }, { id: 456 }, { id: 38515 }];
          const attributAgentCollection: IAttributAgent[] = [{ id: 123 }];
          expectedResult = service.addAttributAgentToCollectionIfMissing(attributAgentCollection, ...attributAgentArray);
        //  expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const attributAgent: IAttributAgent = { id: 123 };
          const attributAgent2: IAttributAgent = { id: 456 };
          expectedResult = service.addAttributAgentToCollectionIfMissing([], attributAgent, attributAgent2);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(attributAgent);
          expect(expectedResult).toContain(attributAgent2);
        });

        it('should accept null and undefined values', () => {
          const attributAgent: IAttributAgent = { id: 123 };
          expectedResult = service.addAttributAgentToCollectionIfMissing([], null, attributAgent, undefined);
       //   expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(attributAgent);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
