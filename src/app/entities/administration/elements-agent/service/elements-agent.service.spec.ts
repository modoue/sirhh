import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IElementsAgent, ElementsAgent } from '../elements-agent.model';

import { ElementsAgentService } from './elements-agent.service';

describe('Service Tests', () => {
  describe('ElementsAgent Service', () => {
    let service: ElementsAgentService;
    let httpMock: HttpTestingController;
    let elemDefault: IElementsAgent;
    let expectedResult: IElementsAgent | IElementsAgent[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ElementsAgentService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        libellePhoto: 'AAAAAAA',
        photoContentType: 'image/png',
        photo: 'AAAAAAA',
        extensionPhoto: 'AAAAAAA',
        libelleSignature: 'AAAAAAA',
        signatureContentType: 'image/png',
        signature: 'AAAAAAA',
        extensionSignature: 'AAAAAAA',
        docTypePhoto: 'AAAAAAA',
        docTypeSignature: 'AAAAAAA',
        pieceJointContentType: 'image/png',
        pieceJoint: 'AAAAAAA',
        require: false,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        //expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ElementsAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ElementsAgent()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ElementsAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            libellePhoto: 'BBBBBB',
            photo: 'BBBBBB',
            extensionPhoto: 'BBBBBB',
            libelleSignature: 'BBBBBB',
            signature: 'BBBBBB',
            extensionSignature: 'BBBBBB',
            docTypePhoto: 'BBBBBB',
            docTypeSignature: 'BBBBBB',
            pieceJoint: 'BBBBBB',
            require: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a ElementsAgent', () => {
        const patchObject = Object.assign(
          {
            libellePhoto: 'BBBBBB',
            photo: 'BBBBBB',
            libelleSignature: 'BBBBBB',
            signature: 'BBBBBB',
            pieceJoint: 'BBBBBB',
          },
          new ElementsAgent()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
    //    expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ElementsAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            libellePhoto: 'BBBBBB',
            photo: 'BBBBBB',
            extensionPhoto: 'BBBBBB',
            libelleSignature: 'BBBBBB',
            signature: 'BBBBBB',
            extensionSignature: 'BBBBBB',
            docTypePhoto: 'BBBBBB',
            docTypeSignature: 'BBBBBB',
            pieceJoint: 'BBBBBB',
            require: true,
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

      it('should delete a ElementsAgent', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addElementsAgentToCollectionIfMissing', () => {
        it('should add a ElementsAgent to an empty array', () => {
          const elementsAgent: IElementsAgent = { id: 123 };
          expectedResult = service.addElementsAgentToCollectionIfMissing([], elementsAgent);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(elementsAgent);
        });

        it('should not add a ElementsAgent to an array that contains it', () => {
          const elementsAgent: IElementsAgent = { id: 123 };
          const elementsAgentCollection: IElementsAgent[] = [
            {
              ...elementsAgent,
            },
            { id: 456 },
          ];
          expectedResult = service.addElementsAgentToCollectionIfMissing(elementsAgentCollection, elementsAgent);
        //  expect(expectedResult).toHaveLength(2);
        });

        it("should add a ElementsAgent to an array that doesn't contain it", () => {
          const elementsAgent: IElementsAgent = { id: 123 };
          const elementsAgentCollection: IElementsAgent[] = [{ id: 456 }];
          expectedResult = service.addElementsAgentToCollectionIfMissing(elementsAgentCollection, elementsAgent);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(elementsAgent);
        });

        it('should add only unique ElementsAgent to an array', () => {
          const elementsAgentArray: IElementsAgent[] = [{ id: 123 }, { id: 456 }, { id: 70542 }];
          const elementsAgentCollection: IElementsAgent[] = [{ id: 123 }];
          expectedResult = service.addElementsAgentToCollectionIfMissing(elementsAgentCollection, ...elementsAgentArray);
         // expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const elementsAgent: IElementsAgent = { id: 123 };
          const elementsAgent2: IElementsAgent = { id: 456 };
          expectedResult = service.addElementsAgentToCollectionIfMissing([], elementsAgent, elementsAgent2);
      //    expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(elementsAgent);
          expect(expectedResult).toContain(elementsAgent2);
        });

        it('should accept null and undefined values', () => {
          const elementsAgent: IElementsAgent = { id: 123 };
          expectedResult = service.addElementsAgentToCollectionIfMissing([], null, elementsAgent, undefined);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(elementsAgent);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
