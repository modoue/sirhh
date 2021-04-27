import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IRegimeHoraire, RegimeHoraire } from '../regime-horaire.model';

import { RegimeHoraireService } from './regime-horaire.service';

describe('Service Tests', () => {
  describe('RegimeHoraire Service', () => {
    let service: RegimeHoraireService;
    let httpMock: HttpTestingController;
    let elemDefault: IRegimeHoraire;
    let expectedResult: IRegimeHoraire | IRegimeHoraire[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(RegimeHoraireService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        version: 0,
        codeRegime: 'AAAAAAA',
        libelleRegime: 'AAAAAAA',
        heureDebut: currentDate,
        heureFin: currentDate,
        heurePauseDebut: currentDate,
        heurePauseFin: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            heureDebut: currentDate.format(DATE_FORMAT),
            heureFin: currentDate.format(DATE_FORMAT),
            heurePauseDebut: currentDate.format(DATE_FORMAT),
            heurePauseFin: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a RegimeHoraire', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            heureDebut: currentDate.format(DATE_FORMAT),
            heureFin: currentDate.format(DATE_FORMAT),
            heurePauseDebut: currentDate.format(DATE_FORMAT),
            heurePauseFin: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            heureDebut: currentDate,
            heureFin: currentDate,
            heurePauseDebut: currentDate,
            heurePauseFin: currentDate,
          },
          returnedFromService
        );

        service.create(new RegimeHoraire()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a RegimeHoraire', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeRegime: 'BBBBBB',
            libelleRegime: 'BBBBBB',
            heureDebut: currentDate.format(DATE_FORMAT),
            heureFin: currentDate.format(DATE_FORMAT),
            heurePauseDebut: currentDate.format(DATE_FORMAT),
            heurePauseFin: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            heureDebut: currentDate,
            heureFin: currentDate,
            heurePauseDebut: currentDate,
            heurePauseFin: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a RegimeHoraire', () => {
        const patchObject = Object.assign(
          {
            libelleRegime: 'BBBBBB',
            heureFin: currentDate.format(DATE_FORMAT),
            heurePauseDebut: currentDate.format(DATE_FORMAT),
            heurePauseFin: currentDate.format(DATE_FORMAT),
          },
          new RegimeHoraire()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            heureDebut: currentDate,
            heureFin: currentDate,
            heurePauseDebut: currentDate,
            heurePauseFin: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of RegimeHoraire', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            codeRegime: 'BBBBBB',
            libelleRegime: 'BBBBBB',
            heureDebut: currentDate.format(DATE_FORMAT),
            heureFin: currentDate.format(DATE_FORMAT),
            heurePauseDebut: currentDate.format(DATE_FORMAT),
            heurePauseFin: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            heureDebut: currentDate,
            heureFin: currentDate,
            heurePauseDebut: currentDate,
            heurePauseFin: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a RegimeHoraire', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addRegimeHoraireToCollectionIfMissing', () => {
        it('should add a RegimeHoraire to an empty array', () => {
          const regimeHoraire: IRegimeHoraire = { id: 123 };
          expectedResult = service.addRegimeHoraireToCollectionIfMissing([], regimeHoraire);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(regimeHoraire);
        });

        it('should not add a RegimeHoraire to an array that contains it', () => {
          const regimeHoraire: IRegimeHoraire = { id: 123 };
          const regimeHoraireCollection: IRegimeHoraire[] = [
            {
              ...regimeHoraire,
            },
            { id: 456 },
          ];
          expectedResult = service.addRegimeHoraireToCollectionIfMissing(regimeHoraireCollection, regimeHoraire);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a RegimeHoraire to an array that doesn't contain it", () => {
          const regimeHoraire: IRegimeHoraire = { id: 123 };
          const regimeHoraireCollection: IRegimeHoraire[] = [{ id: 456 }];
          expectedResult = service.addRegimeHoraireToCollectionIfMissing(regimeHoraireCollection, regimeHoraire);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(regimeHoraire);
        });

        it('should add only unique RegimeHoraire to an array', () => {
          const regimeHoraireArray: IRegimeHoraire[] = [{ id: 123 }, { id: 456 }, { id: 64083 }];
          const regimeHoraireCollection: IRegimeHoraire[] = [{ id: 123 }];
          expectedResult = service.addRegimeHoraireToCollectionIfMissing(regimeHoraireCollection, ...regimeHoraireArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const regimeHoraire: IRegimeHoraire = { id: 123 };
          const regimeHoraire2: IRegimeHoraire = { id: 456 };
          expectedResult = service.addRegimeHoraireToCollectionIfMissing([], regimeHoraire, regimeHoraire2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(regimeHoraire);
          expect(expectedResult).toContain(regimeHoraire2);
        });

        it('should accept null and undefined values', () => {
          const regimeHoraire: IRegimeHoraire = { id: 123 };
          expectedResult = service.addRegimeHoraireToCollectionIfMissing([], null, regimeHoraire, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(regimeHoraire);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
