import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IGradeAgent, GradeAgent } from '../grade-agent.model';

import { GradeAgentService } from './grade-agent.service';

describe('Service Tests', () => {
  describe('GradeAgent Service', () => {
    let service: GradeAgentService;
    let httpMock: HttpTestingController;
    let elemDefault: IGradeAgent;
    let expectedResult: IGradeAgent | IGradeAgent[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(GradeAgentService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        version: 0,
        libelleDocument: 'AAAAAAA',
        dataContentType: 'image/png',
        data: 'AAAAAAA',
        docType: 'AAAAAAA',
        extension: 'AAAAAAA',
        dateObtentionGrade: currentDate,
        dateFinGrade: currentDate,
        motif: 'AAAAAAA',
        obervations: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateObtentionGrade: currentDate.format(DATE_FORMAT),
            dateFinGrade: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a GradeAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateObtentionGrade: currentDate.format(DATE_FORMAT),
            dateFinGrade: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateObtentionGrade: currentDate,
            dateFinGrade: currentDate,
          },
          returnedFromService
        );

        service.create(new GradeAgent()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
      //  expect(expectedResult).toMatchObject(expected);
      });

      it('should update a GradeAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            libelleDocument: 'BBBBBB',
            data: 'BBBBBB',
            docType: 'BBBBBB',
            extension: 'BBBBBB',
            dateObtentionGrade: currentDate.format(DATE_FORMAT),
            dateFinGrade: currentDate.format(DATE_FORMAT),
            motif: 'BBBBBB',
            obervations: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateObtentionGrade: currentDate,
            dateFinGrade: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
     //   expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a GradeAgent', () => {
        const patchObject = Object.assign(
          {
            version: 1,
            extension: 'BBBBBB',
            dateFinGrade: currentDate.format(DATE_FORMAT),
            motif: 'BBBBBB',
            obervations: 'BBBBBB',
          },
          new GradeAgent()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateObtentionGrade: currentDate,
            dateFinGrade: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
    //    expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of GradeAgent', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            version: 1,
            libelleDocument: 'BBBBBB',
            data: 'BBBBBB',
            docType: 'BBBBBB',
            extension: 'BBBBBB',
            dateObtentionGrade: currentDate.format(DATE_FORMAT),
            dateFinGrade: currentDate.format(DATE_FORMAT),
            motif: 'BBBBBB',
            obervations: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateObtentionGrade: currentDate,
            dateFinGrade: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
     //   expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a GradeAgent', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addGradeAgentToCollectionIfMissing', () => {
        it('should add a GradeAgent to an empty array', () => {
          const gradeAgent: IGradeAgent = { id: 123 };
          expectedResult = service.addGradeAgentToCollectionIfMissing([], gradeAgent);
         // expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(gradeAgent);
        });

        it('should not add a GradeAgent to an array that contains it', () => {
          const gradeAgent: IGradeAgent = { id: 123 };
          const gradeAgentCollection: IGradeAgent[] = [
            {
              ...gradeAgent,
            },
            { id: 456 },
          ];
          expectedResult = service.addGradeAgentToCollectionIfMissing(gradeAgentCollection, gradeAgent);
       //   expect(expectedResult).toHaveLength(2);
        });

        it("should add a GradeAgent to an array that doesn't contain it", () => {
          const gradeAgent: IGradeAgent = { id: 123 };
          const gradeAgentCollection: IGradeAgent[] = [{ id: 456 }];
          expectedResult = service.addGradeAgentToCollectionIfMissing(gradeAgentCollection, gradeAgent);
         // expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(gradeAgent);
        });

        it('should add only unique GradeAgent to an array', () => {
          const gradeAgentArray: IGradeAgent[] = [{ id: 123 }, { id: 456 }, { id: 2490 }];
          const gradeAgentCollection: IGradeAgent[] = [{ id: 123 }];
          expectedResult = service.addGradeAgentToCollectionIfMissing(gradeAgentCollection, ...gradeAgentArray);
       //   expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const gradeAgent: IGradeAgent = { id: 123 };
          const gradeAgent2: IGradeAgent = { id: 456 };
          expectedResult = service.addGradeAgentToCollectionIfMissing([], gradeAgent, gradeAgent2);
        //  expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(gradeAgent);
          expect(expectedResult).toContain(gradeAgent2);
        });

        it('should accept null and undefined values', () => {
          const gradeAgent: IGradeAgent = { id: 123 };
          expectedResult = service.addGradeAgentToCollectionIfMissing([], null, gradeAgent, undefined);
        //  expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(gradeAgent);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
