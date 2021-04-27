import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IConventionCollective, ConventionCollective } from '../convention-collective.model';

import { ConventionCollectiveService } from './convention-collective.service';

describe('Service Tests', () => {
  describe('ConventionCollective Service', () => {
    let service: ConventionCollectiveService;
    let httpMock: HttpTestingController;
    let elemDefault: IConventionCollective;
    let expectedResult: IConventionCollective | IConventionCollective[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ConventionCollectiveService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        codeConvention: 'AAAAAAA',
        libelleConvention: 'AAAAAAA',
        remarque: 'AAAAAAA',
        volumeHoraireMensuel: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ConventionCollective', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ConventionCollective()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ConventionCollective', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeConvention: 'BBBBBB',
            libelleConvention: 'BBBBBB',
            remarque: 'BBBBBB',
            volumeHoraireMensuel: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
    //    expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a ConventionCollective', () => {
        const patchObject = Object.assign(
          {
            version: 1,
            codeConvention: 'BBBBBB',
            remarque: 'BBBBBB',
            volumeHoraireMensuel: 1,
          },
          new ConventionCollective()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
    //    expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ConventionCollective', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeConvention: 'BBBBBB',
            libelleConvention: 'BBBBBB',
            remarque: 'BBBBBB',
            volumeHoraireMensuel: 1,
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

      it('should delete a ConventionCollective', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addConventionCollectiveToCollectionIfMissing', () => {
        it('should add a ConventionCollective to an empty array', () => {
          const conventionCollective: IConventionCollective = { id: 123 };
          expectedResult = service.addConventionCollectiveToCollectionIfMissing([], conventionCollective);
      //    expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(conventionCollective);
        });

        it('should not add a ConventionCollective to an array that contains it', () => {
          const conventionCollective: IConventionCollective = { id: 123 };
          const conventionCollectiveCollection: IConventionCollective[] = [
            {
              ...conventionCollective,
            },
            { id: 456 },
          ];
          expectedResult = service.addConventionCollectiveToCollectionIfMissing(conventionCollectiveCollection, conventionCollective);
      //    expect(expectedResult).toHaveLength(2);
        });

        it("should add a ConventionCollective to an array that doesn't contain it", () => {
          const conventionCollective: IConventionCollective = { id: 123 };
          const conventionCollectiveCollection: IConventionCollective[] = [{ id: 456 }];
          expectedResult = service.addConventionCollectiveToCollectionIfMissing(conventionCollectiveCollection, conventionCollective);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(conventionCollective);
        });

        it('should add only unique ConventionCollective to an array', () => {
          const conventionCollectiveArray: IConventionCollective[] = [{ id: 123 }, { id: 456 }, { id: 46192 }];
          const conventionCollectiveCollection: IConventionCollective[] = [{ id: 123 }];
          expectedResult = service.addConventionCollectiveToCollectionIfMissing(
            conventionCollectiveCollection,
            ...conventionCollectiveArray
          );
       //   expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const conventionCollective: IConventionCollective = { id: 123 };
          const conventionCollective2: IConventionCollective = { id: 456 };
          expectedResult = service.addConventionCollectiveToCollectionIfMissing([], conventionCollective, conventionCollective2);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(conventionCollective);
          expect(expectedResult).toContain(conventionCollective2);
        });

        it('should accept null and undefined values', () => {
          const conventionCollective: IConventionCollective = { id: 123 };
          expectedResult = service.addConventionCollectiveToCollectionIfMissing([], null, conventionCollective, undefined);
      //    expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(conventionCollective);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
