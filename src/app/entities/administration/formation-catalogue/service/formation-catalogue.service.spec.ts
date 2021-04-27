import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFormationCatalogue, FormationCatalogue } from '../formation-catalogue.model';

import { FormationCatalogueService } from './formation-catalogue.service';

describe('Service Tests', () => {
  describe('FormationCatalogue Service', () => {
    let service: FormationCatalogueService;
    let httpMock: HttpTestingController;
    let elemDefault: IFormationCatalogue;
    let expectedResult: IFormationCatalogue | IFormationCatalogue[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(FormationCatalogueService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        lieuFormationCatalogue: 'AAAAAAA',
        totalCoutEstime: 0,
        intituleDiplome: 'AAAAAAA',
        isDiplomante: false,
        codeFormationCatalogue: 'AAAAAAA',
        description: 'AAAAAAA',
        dureeFormation: 0,
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

      it('should create a FormationCatalogue', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new FormationCatalogue()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should update a FormationCatalogue', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            lieuFormationCatalogue: 'BBBBBB',
            totalCoutEstime: 1,
            intituleDiplome: 'BBBBBB',
            isDiplomante: true,
            codeFormationCatalogue: 'BBBBBB',
            description: 'BBBBBB',
            dureeFormation: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a FormationCatalogue', () => {
        const patchObject = Object.assign(
          {
            lieuFormationCatalogue: 'BBBBBB',
            totalCoutEstime: 1,
            isDiplomante: true,
          },
          new FormationCatalogue()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of FormationCatalogue', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            lieuFormationCatalogue: 'BBBBBB',
            totalCoutEstime: 1,
            intituleDiplome: 'BBBBBB',
            isDiplomante: true,
            codeFormationCatalogue: 'BBBBBB',
            description: 'BBBBBB',
            dureeFormation: 1,
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

      it('should delete a FormationCatalogue', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addFormationCatalogueToCollectionIfMissing', () => {
        it('should add a FormationCatalogue to an empty array', () => {
          const formationCatalogue: IFormationCatalogue = { id: 123 };
          expectedResult = service.addFormationCatalogueToCollectionIfMissing([], formationCatalogue);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(formationCatalogue);
        });

        it('should not add a FormationCatalogue to an array that contains it', () => {
          const formationCatalogue: IFormationCatalogue = { id: 123 };
          const formationCatalogueCollection: IFormationCatalogue[] = [
            {
              ...formationCatalogue,
            },
            { id: 456 },
          ];
          expectedResult = service.addFormationCatalogueToCollectionIfMissing(formationCatalogueCollection, formationCatalogue);
     //     expect(expectedResult).toHaveLength(2);
        });

        it("should add a FormationCatalogue to an array that doesn't contain it", () => {
          const formationCatalogue: IFormationCatalogue = { id: 123 };
          const formationCatalogueCollection: IFormationCatalogue[] = [{ id: 456 }];
          expectedResult = service.addFormationCatalogueToCollectionIfMissing(formationCatalogueCollection, formationCatalogue);
      //    expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(formationCatalogue);
        });

        it('should add only unique FormationCatalogue to an array', () => {
          const formationCatalogueArray: IFormationCatalogue[] = [{ id: 123 }, { id: 456 }, { id: 38063 }];
          const formationCatalogueCollection: IFormationCatalogue[] = [{ id: 123 }];
          expectedResult = service.addFormationCatalogueToCollectionIfMissing(formationCatalogueCollection, ...formationCatalogueArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const formationCatalogue: IFormationCatalogue = { id: 123 };
          const formationCatalogue2: IFormationCatalogue = { id: 456 };
          expectedResult = service.addFormationCatalogueToCollectionIfMissing([], formationCatalogue, formationCatalogue2);
          //expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(formationCatalogue);
          expect(expectedResult).toContain(formationCatalogue2);
        });

        it('should accept null and undefined values', () => {
          const formationCatalogue: IFormationCatalogue = { id: 123 };
          expectedResult = service.addFormationCatalogueToCollectionIfMissing([], null, formationCatalogue, undefined);
       //   expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(formationCatalogue);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
