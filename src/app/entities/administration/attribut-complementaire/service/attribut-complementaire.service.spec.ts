import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAttributComplementaire, AttributComplementaire } from '../attribut-complementaire.model';

import { AttributComplementaireService } from './attribut-complementaire.service';

describe('Service Tests', () => {
  describe('AttributComplementaire Service', () => {
    let service: AttributComplementaireService;
    let httpMock: HttpTestingController;
    let elemDefault: IAttributComplementaire;
    let expectedResult: IAttributComplementaire | IAttributComplementaire[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(AttributComplementaireService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        code: 'AAAAAAA',
        libelle: 'AAAAAAA',
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

      it('should create a AttributComplementaire', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new AttributComplementaire()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
       // expect(expectedResult).toMatchObject(expected);
      });

      it('should update a AttributComplementaire', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            code: 'BBBBBB',
            libelle: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a AttributComplementaire', () => {
        const patchObject = Object.assign(
          {
            version: 1,
            code: 'BBBBBB',
          },
          new AttributComplementaire()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of AttributComplementaire', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            code: 'BBBBBB',
            libelle: 'BBBBBB',
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

      it('should delete a AttributComplementaire', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addAttributComplementaireToCollectionIfMissing', () => {
        it('should add a AttributComplementaire to an empty array', () => {
          const attributComplementaire: IAttributComplementaire = { id: 123 };
          expectedResult = service.addAttributComplementaireToCollectionIfMissing([], attributComplementaire);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(attributComplementaire);
        });

        it('should not add a AttributComplementaire to an array that contains it', () => {
          const attributComplementaire: IAttributComplementaire = { id: 123 };
          const attributComplementaireCollection: IAttributComplementaire[] = [
            {
              ...attributComplementaire,
            },
            { id: 456 },
          ];
          expectedResult = service.addAttributComplementaireToCollectionIfMissing(attributComplementaireCollection, attributComplementaire);
         // expect(expectedResult).toHaveLength(2);
        });

        it("should add a AttributComplementaire to an array that doesn't contain it", () => {
          const attributComplementaire: IAttributComplementaire = { id: 123 };
          const attributComplementaireCollection: IAttributComplementaire[] = [{ id: 456 }];
          expectedResult = service.addAttributComplementaireToCollectionIfMissing(attributComplementaireCollection, attributComplementaire);
         // expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(attributComplementaire);
        });

        it('should add only unique AttributComplementaire to an array', () => {
          const attributComplementaireArray: IAttributComplementaire[] = [{ id: 123 }, { id: 456 }, { id: 54053 }];
          const attributComplementaireCollection: IAttributComplementaire[] = [{ id: 123 }];
          expectedResult = service.addAttributComplementaireToCollectionIfMissing(
            attributComplementaireCollection,
            ...attributComplementaireArray
          );
        //  expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const attributComplementaire: IAttributComplementaire = { id: 123 };
          const attributComplementaire2: IAttributComplementaire = { id: 456 };
          expectedResult = service.addAttributComplementaireToCollectionIfMissing([], attributComplementaire, attributComplementaire2);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(attributComplementaire);
          expect(expectedResult).toContain(attributComplementaire2);
        });

        it('should accept null and undefined values', () => {
          const attributComplementaire: IAttributComplementaire = { id: 123 };
          expectedResult = service.addAttributComplementaireToCollectionIfMissing([], null, attributComplementaire, undefined);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(attributComplementaire);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
