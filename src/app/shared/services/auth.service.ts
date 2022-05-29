import { UserForAuthenticationDto, ServerAuthResponse } from './../interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';


@Injectable({ providedIn: 'root' })
export class AuthService {
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
    return localStorage.getItem('jwt-userid');
  }

  constructor(private http: HttpClient) {}

  login(userForAuth: UserForAuthenticationDto): Observable<any> {
    return this.http
      .post(`${environment.serverUrl}/api/authentication/login`, userForAuth)
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

    const tokenInfo =  jwt_decode(token);
    const userId = tokenInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

    localStorage.setItem('jwt', token);
    localStorage.setItem('jwt-exp', expDate.toString());
    localStorage.setItem('jwt-role', role);
    localStorage.setItem('jwt-userid', userId);
  }

  private handleError(error: HttpErrorResponse) {
    //console.log('From handle error authservice:', error.error)
    return throwError(error);
  }
}
