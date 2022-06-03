import { UserForAuthenticationDto, ServerAuthResponse } from './../interfaces';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { ObjectResult, UserRegisterRequest } from '../models/models';
import { Configuration } from '../configuration';


@Injectable({ providedIn: 'root' })
export class AuthService {
  protected basePath = '/';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  get token(): string {
    const expDate = new Date(localStorage.getItem('jwt-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('jwt');
  }

  get role() {
    const expDate = new Date(localStorage.getItem('jwt-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('jwt-role');
  }

  get userId() {
    const expDate = new Date(localStorage.getItem('jwt-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return this.getDataFromToken('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier');
  }

  get userEmail() {
    const expDate = new Date(localStorage.getItem('jwt-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return this.getDataFromToken('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress');
  }

  constructor(private http: HttpClient) {
    this.basePath = environment.serverUrl;
  }

  login(userForAuth: UserForAuthenticationDto): Observable<any> {
    return this.http
      .post(`${this.basePath}/api/authentication/login`, userForAuth)
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  public isAdmin = (): boolean => {
    const role = localStorage.getItem("jwt-role");

    return role === 'Admin';
  }

  public isUser = (): boolean => {
    const role = localStorage.getItem("jwt-role");

    return role === 'User';
  }

  public isMaster = (): boolean => {
    const role = localStorage.getItem("jwt-role");

    return role === 'Master';
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: ServerAuthResponse) {
    if (!response) {
      localStorage.clear();
      return;
    }
    const token = response.token;
    const expDate = new Date(Date.now() + response.minutesToExpire * 1000 * 60);
    const role = response.role;


    localStorage.setItem('jwt', token);
    localStorage.setItem('jwt-exp', expDate.toString());
    localStorage.setItem('jwt-role', role);
  }

  private handleError(error: HttpErrorResponse) {
    //console.log('From handle error authservice:', error.error)
    return throwError(error);
  }

  private getDataFromToken(name: string){
    const tokenInfo = jwt_decode(this.token);
    return tokenInfo[name];
  }

   /**
     * User registration in system.
     *
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public register(body?: UserRegisterRequest, observe?: 'body', reportProgress?: boolean): Observable<ObjectResult>;
    public register(body?: UserRegisterRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ObjectResult>>;
    public register(body?: UserRegisterRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ObjectResult>>;
    public register(body?: UserRegisterRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json-patch+json',
            'application/json',
            'text/json',
            'application/_*+json'
        ];

        return this.http.request<ObjectResult>('post',`${this.basePath}/api/Authentication/register`,
            {
                body: body,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
}
