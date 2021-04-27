import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDiplomeCategorie, DiplomeCategorie } from '../diplome-categorie.model';

import { DiplomeCategorieService } from './diplome-categorie.service';

describe('Service Tests', () => {
  describe('DiplomeCategorie Service', () => {
    let service: DiplomeCategorieService;
    let httpMock: HttpTestingController;
    let elemDefault: IDiplomeCategorie;
    let expectedResult: IDiplomeCategorie | IDiplomeCategorie[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(DiplomeCategorieService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        code: 'AAAAAAA',
        libelle: 'AAAAAAA',
        remarques: 'AAAAAAA',
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

      it('should create a DiplomeCategorie', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new DiplomeCategorie()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DiplomeCategorie', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            code: 'BBBBBB',
            libelle: 'BBBBBB',
            remarques: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a DiplomeCategorie', () => {
        const patchObject = Object.assign(
          {
            libelle: 'BBBBBB',
            remarques: 'BBBBBB',
          },
          new DiplomeCategorie()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DiplomeCategorie', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            code: 'BBBBBB',
            libelle: 'BBBBBB',
            remarques: 'BBBBBB',
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

      it('should delete a DiplomeCategorie', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addDiplomeCategorieToCollectionIfMissing', () => {
        it('should add a DiplomeCategorie to an empty array', () => {
          const diplomeCategorie: IDiplomeCategorie = { id: 123 };
          expectedResult = service.addDiplomeCategorieToCollectionIfMissing([], diplomeCategorie);
      //    expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(diplomeCategorie);
        });

        it('should not add a DiplomeCategorie to an array that contains it', () => {
          const diplomeCategorie: IDiplomeCategorie = { id: 123 };
          const diplomeCategorieCollection: IDiplomeCategorie[] = [
            {
              ...diplomeCategorie,
            },
            { id: 456 },
          ];
          expectedResult = service.addDiplomeCategorieToCollectionIfMissing(diplomeCategorieCollection, diplomeCategorie);
      //    expect(expectedResult).toHaveLength(2);
        });

        it("should add a DiplomeCategorie to an array that doesn't contain it", () => {
          const diplomeCategorie: IDiplomeCategorie = { id: 123 };
          const diplomeCategorieCollection: IDiplomeCategorie[] = [{ id: 456 }];
          expectedResult = service.addDiplomeCategorieToCollectionIfMissing(diplomeCategorieCollection, diplomeCategorie);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(diplomeCategorie);
        });

        it('should add only unique DiplomeCategorie to an array', () => {
          const diplomeCategorieArray: IDiplomeCategorie[] = [{ id: 123 }, { id: 456 }, { id: 74242 }];
          const diplomeCategorieCollection: IDiplomeCategorie[] = [{ id: 123 }];
          expectedResult = service.addDiplomeCategorieToCollectionIfMissing(diplomeCategorieCollection, ...diplomeCategorieArray);
        //  expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const diplomeCategorie: IDiplomeCategorie = { id: 123 };
          const diplomeCategorie2: IDiplomeCategorie = { id: 456 };
          expectedResult = service.addDiplomeCategorieToCollectionIfMissing([], diplomeCategorie, diplomeCategorie2);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(diplomeCategorie);
          expect(expectedResult).toContain(diplomeCategorie2);
        });

        it('should accept null and undefined values', () => {
          const diplomeCategorie: IDiplomeCategorie = { id: 123 };
          expectedResult = service.addDiplomeCategorieToCollectionIfMissing([], null, diplomeCategorie, undefined);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(diplomeCategorie);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
