import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PartModel, PartModelForCreationDto } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class PartModelsService {

  constructor(private http: HttpClient) { }

  getPartModels(): Observable<PartModel[]>{
    return this.http.get<PartModel[]>(`${environment.serverPartUrl}/api/admin/partModels`)
  }

  createPartModel(partModel: PartModelForCreationDto): Observable<void>{
    return this.http.post<void>(`${environment.serverPartUrl}/api/admin/partModels`, partModel)
  }

  // getChatById(id: number): Observable<PartModel>{
  //   return this.http.get<PartModel>(`${environment.serverUrl}/api/chats/${id}`)
  // }

  deletePartModel(id: string): Observable<void>{
    return this.http.delete<void>(`${environment.serverPartUrl}/api/admin/partModels/${id}`)
  }

  // updateChat(id: number, chat: ChatForManipulationDto): Observable<void>{
  //   return this.http.put<void>(`${environment.serverUrl}/api/chats/${id}`, chat)
  // }
}
