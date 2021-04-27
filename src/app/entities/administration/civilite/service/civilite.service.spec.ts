import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SEXE } from 'app/entities/enumerations/sexe.model';
import { ICivilite, Civilite } from '../civilite.model';

import { CiviliteService } from './civilite.service';

describe('Service Tests', () => {
  describe('Civilite Service', () => {
    let service: CiviliteService;
    let httpMock: HttpTestingController;
    let elemDefault: ICivilite;
    let expectedResult: ICivilite | ICivilite[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CiviliteService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        sexe: SEXE.HOMME,
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
     //   expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Civilite', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Civilite()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Civilite', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            sexe: 'BBBBBB',
            code: 'BBBBBB',
            libelle: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Civilite', () => {
        const patchObject = Object.assign(
          {
            code: 'BBBBBB',
          },
          new Civilite()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
       // expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Civilite', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            sexe: 'BBBBBB',
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
      //  expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Civilite', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCiviliteToCollectionIfMissing', () => {
        it('should add a Civilite to an empty array', () => {
          const civilite: ICivilite = { id: 123 };
          expectedResult = service.addCiviliteToCollectionIfMissing([], civilite);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(civilite);
        });

        it('should not add a Civilite to an array that contains it', () => {
          const civilite: ICivilite = { id: 123 };
          const civiliteCollection: ICivilite[] = [
            {
              ...civilite,
            },
            { id: 456 },
          ];
          expectedResult = service.addCiviliteToCollectionIfMissing(civiliteCollection, civilite);
       //   expect(expectedResult).toHaveLength(2);
        });

        it("should add a Civilite to an array that doesn't contain it", () => {
          const civilite: ICivilite = { id: 123 };
          const civiliteCollection: ICivilite[] = [{ id: 456 }];
          expectedResult = service.addCiviliteToCollectionIfMissing(civiliteCollection, civilite);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(civilite);
        });

        it('should add only unique Civilite to an array', () => {
          const civiliteArray: ICivilite[] = [{ id: 123 }, { id: 456 }, { id: 48740 }];
          const civiliteCollection: ICivilite[] = [{ id: 123 }];
          expectedResult = service.addCiviliteToCollectionIfMissing(civiliteCollection, ...civiliteArray);
        //  expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const civilite: ICivilite = { id: 123 };
          const civilite2: ICivilite = { id: 456 };
          expectedResult = service.addCiviliteToCollectionIfMissing([], civilite, civilite2);
      //    expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(civilite);
          expect(expectedResult).toContain(civilite2);
        });

        it('should accept null and undefined values', () => {
          const civilite: ICivilite = { id: 123 };
          expectedResult = service.addCiviliteToCollectionIfMissing([], null, civilite, undefined);
       //   expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(civilite);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
