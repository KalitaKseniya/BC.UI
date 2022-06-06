import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Manufacturer } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ManufacturersService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Manufacturer[]>{
    return this.http.get<Manufacturer[]>(`${environment.serverUrl}/api/admin/manufacturers`)
  }
}
