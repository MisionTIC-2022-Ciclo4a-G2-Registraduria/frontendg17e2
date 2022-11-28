import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Vote } from '../models/vote.model';

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns 
   */
  list(): Observable<Vote[]>{
    return this.http.get<Vote[]>(`${environment.url_api_gateway}/votes`);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  getOne(id: string): Observable<Vote>{
    return this.http.get<Vote>(`${environment.url_api_gateway}/vote/${id}`);
  }

  /**
   * 
   * @param enrollment 
   * @returns 
   */
  create(enrollment: Vote){
    return this.http.post<Vote>(`${environment.url_api_gateway}/vote/insert`, enrollment);
  }

  /**
   * 
   * @param id 
   * @param Vote 
   * @returns 
   */
  edit(id: string, enrollment: Vote){
    return this.http.put<Vote>(`${environment.url_api_gateway}/vote/update/${id}`, enrollment);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  delete(id: string){
    return this.http.delete(`${environment.url_api_gateway}/vote/delete/${id}`);
  }
}
