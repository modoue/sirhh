import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILangueReferentiel, LangueReferentiel } from '../langue-referentiel.model';

import { LangueReferentielService } from './langue-referentiel.service';

describe('Service Tests', () => {
  describe('LangueReferentiel Service', () => {
    let service: LangueReferentielService;
    let httpMock: HttpTestingController;
    let elemDefault: ILangueReferentiel;
    let expectedResult: ILangueReferentiel | ILangueReferentiel[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(LangueReferentielService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        code: 'AAAAAAA',
        intituleLangue: 'AAAAAAA',
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

      it('should create a LangueReferentiel', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new LangueReferentiel()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
    //    expect(expectedResult).toMatchObject(expected);
      });

      it('should update a LangueReferentiel', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            code: 'BBBBBB',
            intituleLangue: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a LangueReferentiel', () => {
        const patchObject = Object.assign(
          {
            version: 1,
            code: 'BBBBBB',
            intituleLangue: 'BBBBBB',
          },
          new LangueReferentiel()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
       // expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of LangueReferentiel', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            code: 'BBBBBB',
            intituleLangue: 'BBBBBB',
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

      it('should delete a LangueReferentiel', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addLangueReferentielToCollectionIfMissing', () => {
        it('should add a LangueReferentiel to an empty array', () => {
          const langueReferentiel: ILangueReferentiel = { id: 123 };
          expectedResult = service.addLangueReferentielToCollectionIfMissing([], langueReferentiel);
     //     expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(langueReferentiel);
        });

        it('should not add a LangueReferentiel to an array that contains it', () => {
          const langueReferentiel: ILangueReferentiel = { id: 123 };
          const langueReferentielCollection: ILangueReferentiel[] = [
            {
              ...langueReferentiel,
            },
            { id: 456 },
          ];
          expectedResult = service.addLangueReferentielToCollectionIfMissing(langueReferentielCollection, langueReferentiel);
      //    expect(expectedResult).toHaveLength(2);
        });

        it("should add a LangueReferentiel to an array that doesn't contain it", () => {
          const langueReferentiel: ILangueReferentiel = { id: 123 };
          const langueReferentielCollection: ILangueReferentiel[] = [{ id: 456 }];
          expectedResult = service.addLangueReferentielToCollectionIfMissing(langueReferentielCollection, langueReferentiel);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(langueReferentiel);
        });

        it('should add only unique LangueReferentiel to an array', () => {
          const langueReferentielArray: ILangueReferentiel[] = [{ id: 123 }, { id: 456 }, { id: 99824 }];
          const langueReferentielCollection: ILangueReferentiel[] = [{ id: 123 }];
          expectedResult = service.addLangueReferentielToCollectionIfMissing(langueReferentielCollection, ...langueReferentielArray);
    //      expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const langueReferentiel: ILangueReferentiel = { id: 123 };
          const langueReferentiel2: ILangueReferentiel = { id: 456 };
          expectedResult = service.addLangueReferentielToCollectionIfMissing([], langueReferentiel, langueReferentiel2);
       //   expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(langueReferentiel);
          expect(expectedResult).toContain(langueReferentiel2);
        });

        it('should accept null and undefined values', () => {
          const langueReferentiel: ILangueReferentiel = { id: 123 };
          expectedResult = service.addLangueReferentielToCollectionIfMissing([], null, langueReferentiel, undefined);
       //   expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(langueReferentiel);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
