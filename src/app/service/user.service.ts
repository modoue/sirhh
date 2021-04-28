import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { createRequestOption } from 'app/core/request/request-util';
import { Pagination } from 'app/core/request/request.model';
import { keycloakUrl } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IUser, User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements Resolve<any>
{
  [x: string]: any;
    
    orders: any[];
    onOrdersChanged: BehaviorSubject<any>;
      // Define API

  // Define API
  apiURL = `${keycloakUrl}auth/admin/realms/jhipster/`;

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
/**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
 constructor(
  private _httpClient: HttpClient
)
{
  // Set the defaults
  this.onOrdersChanged = new BehaviorSubject({});
}

/**
* Resolver
*
* @param {ActivatedRouteSnapshot} route
* @param {RouterStateSnapshot} state
* @returns {Observable<any> | Promise<any> | any}
*/
resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
{
  return new Promise<void>((resolve, reject) => {

      Promise.all([
          this.getOrders()
      ]).then(
          () => {
              resolve();
          },
          reject
      );
  });
}
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
/**
* Get orders
*
* @returns {Promise<any>}
*/

getUser(): Observable<HttpResponse<any>> {
  return this._httpClient.get<any>(this.apiURL + 'users',{
    headers:this.httpOptions.headers,
    observe:'response',
    
    })
  .pipe(
    retry(1),
    catchError(null)
  )
}
  // HttpClient API post() method => Create agent
  createUser(user): Observable<HttpResponse<any>> {
    return this._httpClient.post<any>(this.apiURL + 'users', JSON.stringify(user),{
      headers:this.httpOptions.headers,
      observe:'response'
    })
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 

  // HttpClient API delete() method => Delete agent
/*   deleteAgent(id):Observable<HttpResponse<any>>{
    return this.http.delete<Boolean>(this.apiURL + '/delete/'+id,{
      headers:this.httpOptions.headers,
      observe:'response'
    })
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
    }
 */
}
