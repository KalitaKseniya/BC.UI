import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Permission, PermissionForRole, Role, RoleForCreationDto, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  getRoles(): Observable<any>{
    return this.http.get<Role[]>(`${environment.serverUrl}/api/admin/roles`)
  }

  getUsersForRole(roleName: string): Observable<any>{
    return this.http.get<User[]>(`${environment.serverUrl}/api/admin/roles/${roleName}/users`)
  }
}
