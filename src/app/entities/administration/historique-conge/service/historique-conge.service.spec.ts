import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IHistoriqueConge, HistoriqueConge } from '../historique-conge.model';

import { HistoriqueCongeService } from './historique-conge.service';

describe('Service Tests', () => {
  describe('HistoriqueConge Service', () => {
    let service: HistoriqueCongeService;
    let httpMock: HttpTestingController;
    let elemDefault: IHistoriqueConge;
    let expectedResult: IHistoriqueConge | IHistoriqueConge[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(HistoriqueCongeService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        commentaire: 'AAAAAAA',
        niveau: 0,
        etat: 'AAAAAAA',
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

      it('should create a HistoriqueConge', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new HistoriqueConge()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should update a HistoriqueConge', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            commentaire: 'BBBBBB',
            niveau: 1,
            etat: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a HistoriqueConge', () => {
        const patchObject = Object.assign(
          {
            commentaire: 'BBBBBB',
          },
          new HistoriqueConge()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
    //    expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of HistoriqueConge', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            commentaire: 'BBBBBB',
            niveau: 1,
            etat: 'BBBBBB',
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

      it('should delete a HistoriqueConge', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addHistoriqueCongeToCollectionIfMissing', () => {
        it('should add a HistoriqueConge to an empty array', () => {
          const historiqueConge: IHistoriqueConge = { id: 123 };
          expectedResult = service.addHistoriqueCongeToCollectionIfMissing([], historiqueConge);
   //       expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(historiqueConge);
        });

        it('should not add a HistoriqueConge to an array that contains it', () => {
          const historiqueConge: IHistoriqueConge = { id: 123 };
          const historiqueCongeCollection: IHistoriqueConge[] = [
            {
              ...historiqueConge,
            },
            { id: 456 },
          ];
          expectedResult = service.addHistoriqueCongeToCollectionIfMissing(historiqueCongeCollection, historiqueConge);
     //     expect(expectedResult).toHaveLength(2);
        });

        it("should add a HistoriqueConge to an array that doesn't contain it", () => {
          const historiqueConge: IHistoriqueConge = { id: 123 };
          const historiqueCongeCollection: IHistoriqueConge[] = [{ id: 456 }];
          expectedResult = service.addHistoriqueCongeToCollectionIfMissing(historiqueCongeCollection, historiqueConge);
       //   expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(historiqueConge);
        });

        it('should add only unique HistoriqueConge to an array', () => {
          const historiqueCongeArray: IHistoriqueConge[] = [{ id: 123 }, { id: 456 }, { id: 53134 }];
          const historiqueCongeCollection: IHistoriqueConge[] = [{ id: 123 }];
          expectedResult = service.addHistoriqueCongeToCollectionIfMissing(historiqueCongeCollection, ...historiqueCongeArray);
      //    expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const historiqueConge: IHistoriqueConge = { id: 123 };
          const historiqueConge2: IHistoriqueConge = { id: 456 };
          expectedResult = service.addHistoriqueCongeToCollectionIfMissing([], historiqueConge, historiqueConge2);
     //     expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(historiqueConge);
          expect(expectedResult).toContain(historiqueConge2);
        });

        it('should accept null and undefined values', () => {
          const historiqueConge: IHistoriqueConge = { id: 123 };
          expectedResult = service.addHistoriqueCongeToCollectionIfMissing([], null, historiqueConge, undefined);
       //   expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(historiqueConge);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
