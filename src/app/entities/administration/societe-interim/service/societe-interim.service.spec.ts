import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISocieteInterim, SocieteInterim } from '../societe-interim.model';

import { SocieteInterimService } from './societe-interim.service';

describe('Service Tests', () => {
  describe('SocieteInterim Service', () => {
    let service: SocieteInterimService;
    let httpMock: HttpTestingController;
    let elemDefault: ISocieteInterim;
    let expectedResult: ISocieteInterim | ISocieteInterim[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(SocieteInterimService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        version: 0,
        codeSocieteInterim: 'AAAAAAA',
        libelleSocieteInterim: 'AAAAAAA',
        adr1: 'AAAAAAA',
        adr2: 'AAAAAAA',
        tel1: 'AAAAAAA',
        tel2: 'AAAAAAA',
        fax: 'AAAAAAA',
        email: 'AAAAAAA',
        contact: 'AAAAAAA',
        emailContact: 'AAAAAAA',
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

      it('should create a SocieteInterim', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new SocieteInterim()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a SocieteInterim', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeSocieteInterim: 'BBBBBB',
            libelleSocieteInterim: 'BBBBBB',
            adr1: 'BBBBBB',
            adr2: 'BBBBBB',
            tel1: 'BBBBBB',
            tel2: 'BBBBBB',
            fax: 'BBBBBB',
            email: 'BBBBBB',
            contact: 'BBBBBB',
            emailContact: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a SocieteInterim', () => {
        const patchObject = Object.assign(
          {
            version: 1,
            codeSocieteInterim: 'BBBBBB',
            libelleSocieteInterim: 'BBBBBB',
            adr1: 'BBBBBB',
            tel1: 'BBBBBB',
            fax: 'BBBBBB',
            contact: 'BBBBBB',
          },
          new SocieteInterim()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of SocieteInterim', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeSocieteInterim: 'BBBBBB',
            libelleSocieteInterim: 'BBBBBB',
            adr1: 'BBBBBB',
            adr2: 'BBBBBB',
            tel1: 'BBBBBB',
            tel2: 'BBBBBB',
            fax: 'BBBBBB',
            email: 'BBBBBB',
            contact: 'BBBBBB',
            emailContact: 'BBBBBB',
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

      it('should delete a SocieteInterim', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addSocieteInterimToCollectionIfMissing', () => {
        it('should add a SocieteInterim to an empty array', () => {
          const societeInterim: ISocieteInterim = { id: 123 };
          expectedResult = service.addSocieteInterimToCollectionIfMissing([], societeInterim);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(societeInterim);
        });

        it('should not add a SocieteInterim to an array that contains it', () => {
          const societeInterim: ISocieteInterim = { id: 123 };
          const societeInterimCollection: ISocieteInterim[] = [
            {
              ...societeInterim,
            },
            { id: 456 },
          ];
          expectedResult = service.addSocieteInterimToCollectionIfMissing(societeInterimCollection, societeInterim);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a SocieteInterim to an array that doesn't contain it", () => {
          const societeInterim: ISocieteInterim = { id: 123 };
          const societeInterimCollection: ISocieteInterim[] = [{ id: 456 }];
          expectedResult = service.addSocieteInterimToCollectionIfMissing(societeInterimCollection, societeInterim);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(societeInterim);
        });

        it('should add only unique SocieteInterim to an array', () => {
          const societeInterimArray: ISocieteInterim[] = [{ id: 123 }, { id: 456 }, { id: 51798 }];
          const societeInterimCollection: ISocieteInterim[] = [{ id: 123 }];
          expectedResult = service.addSocieteInterimToCollectionIfMissing(societeInterimCollection, ...societeInterimArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const societeInterim: ISocieteInterim = { id: 123 };
          const societeInterim2: ISocieteInterim = { id: 456 };
          expectedResult = service.addSocieteInterimToCollectionIfMissing([], societeInterim, societeInterim2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(societeInterim);
          expect(expectedResult).toContain(societeInterim2);
        });

        it('should accept null and undefined values', () => {
          const societeInterim: ISocieteInterim = { id: 123 };
          expectedResult = service.addSocieteInterimToCollectionIfMissing([], null, societeInterim, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(societeInterim);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
