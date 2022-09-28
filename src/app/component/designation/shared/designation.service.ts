import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { Designation } from './designation.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DesignationService {
  constructor(private http: HttpClient) { }
  apiEndpoint: string  = environment.BackendApiEndpointDesign;

  getAll() : Observable<Designation[]>{
    return this.http.get<Designation[]>(`${this.apiEndpoint}`);
  }

  add(designation: Designation): Observable<Designation> {
    return this.http.post<Designation>(`${this.apiEndpoint}`, designation);
  }

  getById(id: string): Observable<Designation> {
    return this.http.get<Designation>(`${this.apiEndpoint}/${id}`);
  }

  getByName(name: string): Observable<Designation[]> {
    return this.http.get<Designation[]>(`${this.apiEndpoint}/?name=${name}`);
  }

  update(data: Designation): Observable<Designation>{
    return this.http.put<Designation>(`${this.apiEndpoint}/${data.id}`,data);
  }

  delete(id:string): Observable<Designation>{
    return this.http.delete<Designation>(`${this.apiEndpoint}/${id}`).pipe(map((res: any ) =>{
      return res
    }));
 }
}
