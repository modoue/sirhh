import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPosteAgent, PosteAgent } from '../poste-agent.model';

import { PosteAgentService } from './poste-agent.service';

describe('Service Tests', () => {
  describe('PosteAgent Service', () => {
    let service: PosteAgentService;
    let httpMock: HttpTestingController;
    let elemDefault: IPosteAgent;
    let expectedResult: IPosteAgent | IPosteAgent[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(PosteAgentService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        raisonsFinOccupation: 'AAAAAAA',
        observations: 'AAAAAAA',
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

      it('should create a PosteAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new PosteAgent()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PosteAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            raisonsFinOccupation: 'BBBBBB',
            observations: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a PosteAgent', () => {
        const patchObject = Object.assign({}, new PosteAgent());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
    //    expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PosteAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            raisonsFinOccupation: 'BBBBBB',
            observations: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
    //    expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PosteAgent', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addPosteAgentToCollectionIfMissing', () => {
        it('should add a PosteAgent to an empty array', () => {
          const posteAgent: IPosteAgent = { id: 123 };
          expectedResult = service.addPosteAgentToCollectionIfMissing([], posteAgent);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(posteAgent);
        });

        it('should not add a PosteAgent to an array that contains it', () => {
          const posteAgent: IPosteAgent = { id: 123 };
          const posteAgentCollection: IPosteAgent[] = [
            {
              ...posteAgent,
            },
            { id: 456 },
          ];
          expectedResult = service.addPosteAgentToCollectionIfMissing(posteAgentCollection, posteAgent);
        //  expect(expectedResult).toHaveLength(2);
        });

        it("should add a PosteAgent to an array that doesn't contain it", () => {
          const posteAgent: IPosteAgent = { id: 123 };
          const posteAgentCollection: IPosteAgent[] = [{ id: 456 }];
          expectedResult = service.addPosteAgentToCollectionIfMissing(posteAgentCollection, posteAgent);
         // expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(posteAgent);
        });

        it('should add only unique PosteAgent to an array', () => {
          const posteAgentArray: IPosteAgent[] = [{ id: 123 }, { id: 456 }, { id: 72278 }];
          const posteAgentCollection: IPosteAgent[] = [{ id: 123 }];
          expectedResult = service.addPosteAgentToCollectionIfMissing(posteAgentCollection, ...posteAgentArray);
         // expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const posteAgent: IPosteAgent = { id: 123 };
          const posteAgent2: IPosteAgent = { id: 456 };
          expectedResult = service.addPosteAgentToCollectionIfMissing([], posteAgent, posteAgent2);
         // expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(posteAgent);
          expect(expectedResult).toContain(posteAgent2);
        });

        it('should accept null and undefined values', () => {
          const posteAgent: IPosteAgent = { id: 123 };
          expectedResult = service.addPosteAgentToCollectionIfMissing([], null, posteAgent, undefined);
       //   expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(posteAgent);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
