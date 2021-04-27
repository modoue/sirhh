import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISanction, Sanction } from '../sanction.model';

import { SanctionService } from './sanction.service';

describe('Service Tests', () => {
  describe('Sanction Service', () => {
    let service: SanctionService;
    let httpMock: HttpTestingController;
    let elemDefault: ISanction;
    let expectedResult: ISanction | ISanction[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(SanctionService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        codeSanction: 'AAAAAAA',
        libelleSanction: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Sanction', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Sanction()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Sanction', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeSanction: 'BBBBBB',
            libelleSanction: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Sanction', () => {
        const patchObject = Object.assign(
          {
            version: 1,
          },
          new Sanction()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Sanction', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeSanction: 'BBBBBB',
            libelleSanction: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Sanction', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addSanctionToCollectionIfMissing', () => {
        it('should add a Sanction to an empty array', () => {
          const sanction: ISanction = { id: 123 };
          expectedResult = service.addSanctionToCollectionIfMissing([], sanction);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(sanction);
        });

        it('should not add a Sanction to an array that contains it', () => {
          const sanction: ISanction = { id: 123 };
          const sanctionCollection: ISanction[] = [
            {
              ...sanction,
            },
            { id: 456 },
          ];
          expectedResult = service.addSanctionToCollectionIfMissing(sanctionCollection, sanction);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Sanction to an array that doesn't contain it", () => {
          const sanction: ISanction = { id: 123 };
          const sanctionCollection: ISanction[] = [{ id: 456 }];
          expectedResult = service.addSanctionToCollectionIfMissing(sanctionCollection, sanction);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(sanction);
        });

        it('should add only unique Sanction to an array', () => {
          const sanctionArray: ISanction[] = [{ id: 123 }, { id: 456 }, { id: 53891 }];
          const sanctionCollection: ISanction[] = [{ id: 123 }];
          expectedResult = service.addSanctionToCollectionIfMissing(sanctionCollection, ...sanctionArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const sanction: ISanction = { id: 123 };
          const sanction2: ISanction = { id: 456 };
          expectedResult = service.addSanctionToCollectionIfMissing([], sanction, sanction2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(sanction);
          expect(expectedResult).toContain(sanction2);
        });

        it('should accept null and undefined values', () => {
          const sanction: ISanction = { id: 123 };
          expectedResult = service.addSanctionToCollectionIfMissing([], null, sanction, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(sanction);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
