import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Part } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PartsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Part[]>{
    return this.http.get<Part[]>(`${environment.serverPartUrl}/api/admin/parts`)
  }
}
