import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { Department } from './department.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  
  constructor(private http: HttpClient) { }
  apiEndpoint: string  = environment.BackendApiEndpointDept;

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiEndpoint}`);
  }

  add(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.apiEndpoint}`, department);
  }

  getById(id: string): Observable<Department> {
    return this.http.get<Department>(`${this.apiEndpoint}/${id}`);
  }

  getByName(name: string): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiEndpoint}/?name=${name}`);
  }

  update(data: Department): Observable<Department>{
    return this.http.put<Department>(`${this.apiEndpoint}/${data.id}`,data);
  }

  delete(id:string): Observable<Department>{
    return this.http.delete<Department>(`${this.apiEndpoint}/${id}`).
    pipe(map((res: any ) =>{
      return res
    }));
  }
}
