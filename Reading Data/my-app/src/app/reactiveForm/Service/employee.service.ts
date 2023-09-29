import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IEmployee } from '../Model/IEmployee';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  baseUrl = 'http://localhost:3000/employees';
  constructor(private htt: HttpClient) {}
  getEmployees(): Observable<IEmployee[]> {
    return this.htt
      .get<IEmployee[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  addEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.htt
      .post<IEmployee>(this.baseUrl, employee, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }
  getEmployee(id: number): Observable<IEmployee> {
    return this.htt
      .get<IEmployee>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateEmployee(employee: IEmployee): Observable<void> {
    return this.htt
      .put<void>(`${this.baseUrl}/${employee.id}`, employee, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<void> {
    return this.htt
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError(
      'There is a problem with the service. We are notified & working on it. Please try again later.'
    );
  }
}
