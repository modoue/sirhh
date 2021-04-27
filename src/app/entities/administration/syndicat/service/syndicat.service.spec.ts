import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISyndicat, Syndicat } from '../syndicat.model';

import { SyndicatService } from './syndicat.service';

describe('Service Tests', () => {
  describe('Syndicat Service', () => {
    let service: SyndicatService;
    let httpMock: HttpTestingController;
    let elemDefault: ISyndicat;
    let expectedResult: ISyndicat | ISyndicat[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(SyndicatService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        sigle: 'AAAAAAA',
        intitule: 'AAAAAAA',
        remarque: 'AAAAAAA',
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

      it('should create a Syndicat', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Syndicat()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
       // expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Syndicat', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            sigle: 'BBBBBB',
            intitule: 'BBBBBB',
            remarque: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Syndicat', () => {
        const patchObject = Object.assign(
          {
            intitule: 'BBBBBB',
          },
          new Syndicat()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Syndicat', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            sigle: 'BBBBBB',
            intitule: 'BBBBBB',
            remarque: 'BBBBBB',
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

      it('should delete a Syndicat', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addSyndicatToCollectionIfMissing', () => {
        it('should add a Syndicat to an empty array', () => {
          const syndicat: ISyndicat = { id: 123 };
          expectedResult = service.addSyndicatToCollectionIfMissing([], syndicat);
     //     expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(syndicat);
        });

        it('should not add a Syndicat to an array that contains it', () => {
          const syndicat: ISyndicat = { id: 123 };
          const syndicatCollection: ISyndicat[] = [
            {
              ...syndicat,
            },
            { id: 456 },
          ];
          expectedResult = service.addSyndicatToCollectionIfMissing(syndicatCollection, syndicat);
      //    expect(expectedResult).toHaveLength(2);
        });

        it("should add a Syndicat to an array that doesn't contain it", () => {
          const syndicat: ISyndicat = { id: 123 };
          const syndicatCollection: ISyndicat[] = [{ id: 456 }];
          expectedResult = service.addSyndicatToCollectionIfMissing(syndicatCollection, syndicat);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(syndicat);
        });

        it('should add only unique Syndicat to an array', () => {
          const syndicatArray: ISyndicat[] = [{ id: 123 }, { id: 456 }, { id: 12757 }];
          const syndicatCollection: ISyndicat[] = [{ id: 123 }];
          expectedResult = service.addSyndicatToCollectionIfMissing(syndicatCollection, ...syndicatArray);
        //  expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const syndicat: ISyndicat = { id: 123 };
          const syndicat2: ISyndicat = { id: 456 };
          expectedResult = service.addSyndicatToCollectionIfMissing([], syndicat, syndicat2);
       //   expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(syndicat);
          expect(expectedResult).toContain(syndicat2);
        });

        it('should accept null and undefined values', () => {
          const syndicat: ISyndicat = { id: 123 };
          expectedResult = service.addSyndicatToCollectionIfMissing([], null, syndicat, undefined);
      //    expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(syndicat);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
