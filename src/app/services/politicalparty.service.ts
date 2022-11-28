import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Political_party } from '../models/political_party.model';

@Injectable({
  providedIn: 'root'
})
export class politicalpartiesService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns 
   */
  list(): Observable<Political_party[]>{
    return this.http.get<Political_party[]>(`${environment.url_api_gateway}/political_party`);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  getOne(id: string): Observable<Political_party>{
    return this.http.get<Political_party>(`${environment.url_api_gateway}/political_party/${id}`);
  }

  /**
   * 
   * @param department 
   * @returns 
   */
  create(department: Political_party){
    return this.http.post<Political_party>(`${environment.url_api_gateway}/political_party/insert`, department);
  }

  /**
   * 
   * @param id 
   * @param department
   * @returns 
   */
  edit(id: string, department: Political_party){
    return this.http.put<Political_party>(`${environment.url_api_gateway}/political_party/update/${id}`, department);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  delete(id: string){
    return this.http.delete(`${environment.url_api_gateway}/political_party/delete/${id}`);
  }
}
