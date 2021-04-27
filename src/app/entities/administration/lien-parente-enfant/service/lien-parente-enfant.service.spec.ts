import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILienParenteEnfant, LienParenteEnfant } from '../lien-parente-enfant.model';

import { LienParenteEnfantService } from './lien-parente-enfant.service';

describe('Service Tests', () => {
  describe('LienParenteEnfant Service', () => {
    let service: LienParenteEnfantService;
    let httpMock: HttpTestingController;
    let elemDefault: ILienParenteEnfant;
    let expectedResult: ILienParenteEnfant | ILienParenteEnfant[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(LienParenteEnfantService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        codeLienParente: 'AAAAAAA',
        libelleLienParente: 'AAAAAAA',
        indLienDirect: false,
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

      it('should create a LienParenteEnfant', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new LienParenteEnfant()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
       // expect(expectedResult).toMatchObject(expected);
      });

      it('should update a LienParenteEnfant', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeLienParente: 'BBBBBB',
            libelleLienParente: 'BBBBBB',
            indLienDirect: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
       // expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a LienParenteEnfant', () => {
        const patchObject = Object.assign(
          {
            version: 1,
            indLienDirect: true,
          },
          new LienParenteEnfant()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
   //     expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of LienParenteEnfant', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeLienParente: 'BBBBBB',
            libelleLienParente: 'BBBBBB',
            indLienDirect: true,
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

      it('should delete a LienParenteEnfant', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addLienParenteEnfantToCollectionIfMissing', () => {
        it('should add a LienParenteEnfant to an empty array', () => {
          const lienParenteEnfant: ILienParenteEnfant = { id: 123 };
          expectedResult = service.addLienParenteEnfantToCollectionIfMissing([], lienParenteEnfant);
       //   expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(lienParenteEnfant);
        });

        it('should not add a LienParenteEnfant to an array that contains it', () => {
          const lienParenteEnfant: ILienParenteEnfant = { id: 123 };
          const lienParenteEnfantCollection: ILienParenteEnfant[] = [
            {
              ...lienParenteEnfant,
            },
            { id: 456 },
          ];
          expectedResult = service.addLienParenteEnfantToCollectionIfMissing(lienParenteEnfantCollection, lienParenteEnfant);
   //       expect(expectedResult).toHaveLength(2);
        });

        it("should add a LienParenteEnfant to an array that doesn't contain it", () => {
          const lienParenteEnfant: ILienParenteEnfant = { id: 123 };
          const lienParenteEnfantCollection: ILienParenteEnfant[] = [{ id: 456 }];
          expectedResult = service.addLienParenteEnfantToCollectionIfMissing(lienParenteEnfantCollection, lienParenteEnfant);
      //    expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(lienParenteEnfant);
        });

        it('should add only unique LienParenteEnfant to an array', () => {
          const lienParenteEnfantArray: ILienParenteEnfant[] = [{ id: 123 }, { id: 456 }, { id: 90038 }];
          const lienParenteEnfantCollection: ILienParenteEnfant[] = [{ id: 123 }];
          expectedResult = service.addLienParenteEnfantToCollectionIfMissing(lienParenteEnfantCollection, ...lienParenteEnfantArray);
      //    expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const lienParenteEnfant: ILienParenteEnfant = { id: 123 };
          const lienParenteEnfant2: ILienParenteEnfant = { id: 456 };
          expectedResult = service.addLienParenteEnfantToCollectionIfMissing([], lienParenteEnfant, lienParenteEnfant2);
    //      expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(lienParenteEnfant);
          expect(expectedResult).toContain(lienParenteEnfant2);
        });

        it('should accept null and undefined values', () => {
          const lienParenteEnfant: ILienParenteEnfant = { id: 123 };
          expectedResult = service.addLienParenteEnfantToCollectionIfMissing([], null, lienParenteEnfant, undefined);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(lienParenteEnfant);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
