import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Candidate } from '../models/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns 
   */
  list(): Observable<Candidate[]>{
    return this.http.get<Candidate[]>(`${environment.url_api_gateway}/candidates`);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  getOne(id: string): Observable<Candidate>{
    return this.http.get<Candidate>(`${environment.url_api_gateway}/candidate/${id}`);
  }

  /**
   * 
   * @param candidate 
   * @returns 
   */
  create(candidate: Candidate){
    return this.http.post<Candidate>(`${environment.url_api_gateway}/candidate/insert`, candidate);
  }

  /**
   * 
   * @param id 
   * @param candidate 
   * @returns 
   */
  edit(id: string, candidate: Candidate){
    return this.http.put<Candidate>(`${environment.url_api_gateway}/candidate/update/${id}`, candidate);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  delete(id: string){
    return this.http.delete(`${environment.url_api_gateway}/course/delete/${id}`);
  }
}
