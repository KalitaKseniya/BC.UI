import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Provider, ProviderDto } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  serverUrl: string;

  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl;
  }

  getAll(): Observable<Provider[]>{
    return this.http.get<Provider[]>(`${this.serverUrl}/api/admin/providers`)
  }

  create(provider: ProviderDto): Observable<void>{
    return this.http.post<void>(`${this.serverUrl}/api/admin/providers`, provider)
  }

  delete(id: string): Observable<void>{
    return this.http.delete<void>(`${this.serverUrl}/api/admin/providers/${id}`)
  }

  update(id: string, provider: ProviderDto): Observable<void>{
    return this.http.put<void>(`${this.serverUrl}/api/admin/providers/${id}`, provider)
  }

  getById(id: string): Observable<Provider>{
    return this.http.get<Provider>(`${this.serverUrl}/api/admin/providers/${id}`)
  }
}
