import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PartModel, PartModelForCreationOrUpdateDto } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class PartModelsService {
  serverUrl: string;
  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl;
   }

  getPartModels(): Observable<PartModel[]>{
    return this.http.get<PartModel[]>(`${this.serverUrl}/api/admin/part-models`)
  }

  createPartModel(partModel: PartModelForCreationOrUpdateDto): Observable<void>{
    return this.http.post<void>(`${this.serverUrl}/api/admin/part-models`, partModel)
  }

  getPartModelById(id: string): Observable<PartModel>{
    return this.http.get<PartModel>(`${this.serverUrl}/api/admin/part-models/${id}`)
  }

  deletePartModel(id: string): Observable<void>{
    return this.http.delete<void>(`${this.serverUrl}/api/admin/part-models/${id}`)
  }

  updatePartModel(id: string, partModel: PartModelForCreationOrUpdateDto): Observable<void>{
    return this.http.put<void>(`${this.serverUrl}/api/admin/part-models/${id}`, partModel)
  }
}
