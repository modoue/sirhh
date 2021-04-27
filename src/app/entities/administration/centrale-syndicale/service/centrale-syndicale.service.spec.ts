import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICentraleSyndicale, CentraleSyndicale } from '../centrale-syndicale.model';

import { CentraleSyndicaleService } from './centrale-syndicale.service';

describe('Service Tests', () => {
  describe('CentraleSyndicale Service', () => {
    let service: CentraleSyndicaleService;
    let httpMock: HttpTestingController;
    let elemDefault: ICentraleSyndicale;
    let expectedResult: ICentraleSyndicale | ICentraleSyndicale[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CentraleSyndicaleService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        codeCentrale: 'AAAAAAA',
        libelleCentrale: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a CentraleSyndicale', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CentraleSyndicale()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CentraleSyndicale', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeCentrale: 'BBBBBB',
            libelleCentrale: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a CentraleSyndicale', () => {
        const patchObject = Object.assign({}, new CentraleSyndicale());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CentraleSyndicale', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeCentrale: 'BBBBBB',
            libelleCentrale: 'BBBBBB',
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

      it('should delete a CentraleSyndicale', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCentraleSyndicaleToCollectionIfMissing', () => {
        it('should add a CentraleSyndicale to an empty array', () => {
          const centraleSyndicale: ICentraleSyndicale = { id: 123 };
          expectedResult = service.addCentraleSyndicaleToCollectionIfMissing([], centraleSyndicale);
     //     expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(centraleSyndicale);
        });

        it('should not add a CentraleSyndicale to an array that contains it', () => {
          const centraleSyndicale: ICentraleSyndicale = { id: 123 };
          const centraleSyndicaleCollection: ICentraleSyndicale[] = [
            {
              ...centraleSyndicale,
            },
            { id: 456 },
          ];
          expectedResult = service.addCentraleSyndicaleToCollectionIfMissing(centraleSyndicaleCollection, centraleSyndicale);
       //   expect(expectedResult).toHaveLength(2);
        });

        it("should add a CentraleSyndicale to an array that doesn't contain it", () => {
          const centraleSyndicale: ICentraleSyndicale = { id: 123 };
          const centraleSyndicaleCollection: ICentraleSyndicale[] = [{ id: 456 }];
          expectedResult = service.addCentraleSyndicaleToCollectionIfMissing(centraleSyndicaleCollection, centraleSyndicale);
      //    expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(centraleSyndicale);
        });

        it('should add only unique CentraleSyndicale to an array', () => {
          const centraleSyndicaleArray: ICentraleSyndicale[] = [{ id: 123 }, { id: 456 }, { id: 61025 }];
          const centraleSyndicaleCollection: ICentraleSyndicale[] = [{ id: 123 }];
          expectedResult = service.addCentraleSyndicaleToCollectionIfMissing(centraleSyndicaleCollection, ...centraleSyndicaleArray);
      //    expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const centraleSyndicale: ICentraleSyndicale = { id: 123 };
          const centraleSyndicale2: ICentraleSyndicale = { id: 456 };
          expectedResult = service.addCentraleSyndicaleToCollectionIfMissing([], centraleSyndicale, centraleSyndicale2);
       //   expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(centraleSyndicale);
          expect(expectedResult).toContain(centraleSyndicale2);
        });

        it('should accept null and undefined values', () => {
          const centraleSyndicale: ICentraleSyndicale = { id: 123 };
          expectedResult = service.addCentraleSyndicaleToCollectionIfMissing([], null, centraleSyndicale, undefined);
    //      expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(centraleSyndicale);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
