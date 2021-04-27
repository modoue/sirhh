import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRappelConges, RappelConges } from '../rappel-conges.model';

import { RappelCongesService } from './rappel-conges.service';

describe('Service Tests', () => {
  describe('RappelConges Service', () => {
    let service: RappelCongesService;
    let httpMock: HttpTestingController;
    let elemDefault: IRappelConges;
    let expectedResult: IRappelConges | IRappelConges[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(RappelCongesService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
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

      it('should create a RappelConges', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new RappelConges()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a RappelConges', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a RappelConges', () => {
        const patchObject = Object.assign({}, new RappelConges());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of RappelConges', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
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

      it('should delete a RappelConges', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addRappelCongesToCollectionIfMissing', () => {
        it('should add a RappelConges to an empty array', () => {
          const rappelConges: IRappelConges = { id: 123 };
          expectedResult = service.addRappelCongesToCollectionIfMissing([], rappelConges);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(rappelConges);
        });

        it('should not add a RappelConges to an array that contains it', () => {
          const rappelConges: IRappelConges = { id: 123 };
          const rappelCongesCollection: IRappelConges[] = [
            {
              ...rappelConges,
            },
            { id: 456 },
          ];
          expectedResult = service.addRappelCongesToCollectionIfMissing(rappelCongesCollection, rappelConges);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a RappelConges to an array that doesn't contain it", () => {
          const rappelConges: IRappelConges = { id: 123 };
          const rappelCongesCollection: IRappelConges[] = [{ id: 456 }];
          expectedResult = service.addRappelCongesToCollectionIfMissing(rappelCongesCollection, rappelConges);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(rappelConges);
        });

        it('should add only unique RappelConges to an array', () => {
          const rappelCongesArray: IRappelConges[] = [{ id: 123 }, { id: 456 }, { id: 82258 }];
          const rappelCongesCollection: IRappelConges[] = [{ id: 123 }];
          expectedResult = service.addRappelCongesToCollectionIfMissing(rappelCongesCollection, ...rappelCongesArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const rappelConges: IRappelConges = { id: 123 };
          const rappelConges2: IRappelConges = { id: 456 };
          expectedResult = service.addRappelCongesToCollectionIfMissing([], rappelConges, rappelConges2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(rappelConges);
          expect(expectedResult).toContain(rappelConges2);
        });

        it('should accept null and undefined values', () => {
          const rappelConges: IRappelConges = { id: 123 };
          expectedResult = service.addRappelCongesToCollectionIfMissing([], null, rappelConges, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(rappelConges);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
