import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { keycloakUrl } from 'environments/environment';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Define API
  apiURL = `${keycloakUrl}auth/admin/realms/jhipster/`;

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch agents list
  getUser(): Observable<HttpResponse<User>> {
    return this.http.get<any>(this.apiURL + 'users',{
      headers:this.httpOptions.headers,
      observe:'response'
      })
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  handleError(handleError: any): import("rxjs").OperatorFunction<HttpResponse<any>, any> {
    throw new Error('Method not implemented.');
  }

}
