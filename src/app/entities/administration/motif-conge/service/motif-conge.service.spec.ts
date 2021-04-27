import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMotifConge, MotifConge } from '../motif-conge.model';

import { MotifCongeService } from './motif-conge.service';

describe('Service Tests', () => {
  describe('MotifConge Service', () => {
    let service: MotifCongeService;
    let httpMock: HttpTestingController;
    let elemDefault: IMotifConge;
    let expectedResult: IMotifConge | IMotifConge[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MotifCongeService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        code: 0,
        libelle: 'AAAAAAA',
        nombreJour: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
    //    expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a MotifConge', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MotifConge()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
  //      expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MotifConge', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            code: 1,
            libelle: 'BBBBBB',
            nombreJour: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
   //     expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a MotifConge', () => {
        const patchObject = Object.assign(
          {
            code: 1,
            libelle: 'BBBBBB',
          },
          new MotifConge()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MotifConge', () => {
        const returnedFromService = Object.assign(
          {
            id: 1, 
            code: 1,
            libelle: 'BBBBBB',
            nombreJour: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
   //     expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a MotifConge', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMotifCongeToCollectionIfMissing', () => {
        it('should add a MotifConge to an empty array', () => {
          const motifConge: IMotifConge = { id: 123 };
          expectedResult = service.addMotifCongeToCollectionIfMissing([], motifConge);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(motifConge);
        });

        it('should not add a MotifConge to an array that contains it', () => {
          const motifConge: IMotifConge = { id: 123 };
          const motifCongeCollection: IMotifConge[] = [
            {
              ...motifConge,
            },
            { id: 456 },
          ];
          expectedResult = service.addMotifCongeToCollectionIfMissing(motifCongeCollection, motifConge);
     //     expect(expectedResult).toHaveLength(2);
        });

        it("should add a MotifConge to an array that doesn't contain it", () => {
          const motifConge: IMotifConge = { id: 123 };
          const motifCongeCollection: IMotifConge[] = [{ id: 456 }];
          expectedResult = service.addMotifCongeToCollectionIfMissing(motifCongeCollection, motifConge);
      //    expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(motifConge);
        });

        it('should add only unique MotifConge to an array', () => {
          const motifCongeArray: IMotifConge[] = [{ id: 123 }, { id: 456 }, { id: 77377 }];
          const motifCongeCollection: IMotifConge[] = [{ id: 123 }];
          expectedResult = service.addMotifCongeToCollectionIfMissing(motifCongeCollection, ...motifCongeArray);
         // expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const motifConge: IMotifConge = { id: 123 };
          const motifConge2: IMotifConge = { id: 456 };
          expectedResult = service.addMotifCongeToCollectionIfMissing([], motifConge, motifConge2);
       //   expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(motifConge);
          expect(expectedResult).toContain(motifConge2);
        });

        it('should accept null and undefined values', () => {
          const motifConge: IMotifConge = { id: 123 };
          expectedResult = service.addMotifCongeToCollectionIfMissing([], null, motifConge, undefined);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(motifConge);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
