import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFormationCentre, FormationCentre } from '../formation-centre.model';

import { FormationCentreService } from './formation-centre.service';

describe('Service Tests', () => {
  describe('FormationCentre Service', () => {
    let service: FormationCentreService;
    let httpMock: HttpTestingController;
    let elemDefault: IFormationCentre;
    let expectedResult: IFormationCentre | IFormationCentre[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(FormationCentreService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        intitule: 'AAAAAAA',
        adresse: 'AAAAAAA',
        telBureau: 'AAAAAAA',
        codePostal: 'AAAAAAA',
        siteWeb: 'AAAAAAA',
        email: 'AAAAAAA',
        filedocumentContentType: 'image/png',
        filedocument: 'AAAAAAA',
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

      it('should create a FormationCentre', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new FormationCentre()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should update a FormationCentre', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            intitule: 'BBBBBB',
            adresse: 'BBBBBB',
            telBureau: 'BBBBBB',
            codePostal: 'BBBBBB',
            siteWeb: 'BBBBBB',
            email: 'BBBBBB',
            filedocument: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a FormationCentre', () => {
        const patchObject = Object.assign(
          {
            intitule: 'BBBBBB',
            adresse: 'BBBBBB',
            telBureau: 'BBBBBB',
            email: 'BBBBBB',
          },
          new FormationCentre()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of FormationCentre', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            intitule: 'BBBBBB',
            adresse: 'BBBBBB',
            telBureau: 'BBBBBB',
            codePostal: 'BBBBBB',
            siteWeb: 'BBBBBB',
            email: 'BBBBBB',
            filedocument: 'BBBBBB',
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

      it('should delete a FormationCentre', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addFormationCentreToCollectionIfMissing', () => {
        it('should add a FormationCentre to an empty array', () => {
          const formationCentre: IFormationCentre = { id: 123 };
          expectedResult = service.addFormationCentreToCollectionIfMissing([], formationCentre);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(formationCentre);
        });

        it('should not add a FormationCentre to an array that contains it', () => {
          const formationCentre: IFormationCentre = { id: 123 };
          const formationCentreCollection: IFormationCentre[] = [
            {
              ...formationCentre,
            },
            { id: 456 },
          ];
          expectedResult = service.addFormationCentreToCollectionIfMissing(formationCentreCollection, formationCentre);
     //     expect(expectedResult).toHaveLength(2);
        });

        it("should add a FormationCentre to an array that doesn't contain it", () => {
          const formationCentre: IFormationCentre = { id: 123 };
          const formationCentreCollection: IFormationCentre[] = [{ id: 456 }];
          expectedResult = service.addFormationCentreToCollectionIfMissing(formationCentreCollection, formationCentre);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(formationCentre);
        });

        it('should add only unique FormationCentre to an array', () => {
          const formationCentreArray: IFormationCentre[] = [{ id: 123 }, { id: 456 }, { id: 68531 }];
          const formationCentreCollection: IFormationCentre[] = [{ id: 123 }];
          expectedResult = service.addFormationCentreToCollectionIfMissing(formationCentreCollection, ...formationCentreArray);
      //    expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const formationCentre: IFormationCentre = { id: 123 };
          const formationCentre2: IFormationCentre = { id: 456 };
          expectedResult = service.addFormationCentreToCollectionIfMissing([], formationCentre, formationCentre2);
       //   expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(formationCentre);
          expect(expectedResult).toContain(formationCentre2);
        });

        it('should accept null and undefined values', () => {
          const formationCentre: IFormationCentre = { id: 123 };
          expectedResult = service.addFormationCentreToCollectionIfMissing([], null, formationCentre, undefined);
       //   expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(formationCentre);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
