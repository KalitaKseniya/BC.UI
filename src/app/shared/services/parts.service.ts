import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Part, PartDto } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PartsService {
  serverUrl: string;

  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl;
  }

  getAll(): Observable<Part[]>{
    return this.http.get<Part[]>(`${this.serverUrl}/api/admin/parts`)
  }

  create(part: PartDto): Observable<void>{
    return this.http.post<void>(`${this.serverUrl}/api/admin/parts`, part)
  }

  delete(id: string): Observable<void>{
    return this.http.delete<void>(`${this.serverUrl}/api/admin/parts/${id}`)
  }

  update(id: string, part: PartDto): Observable<void>{
    return this.http.put<void>(`${this.serverUrl}/api/admin/parts/${id}`, part)
  }

  getById(id: string): Observable<Part>{
    return this.http.get<Part>(`${this.serverUrl}/api/admin/parts/${id}`)
  }
}
