import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private http: HttpClient) { }
  apiEndpoint: string  = environment.BackendApiEndpointEmployee;

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiEndpoint}`);
  }
  
  add(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiEndpoint}`, employee);
  }

  getById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiEndpoint}/${id}`);
   }

   getByCode(code: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiEndpoint}/?empCode=${code}`);
   }

   update(id: string ,data: Employee): any{
    return this.http.put(`${this.apiEndpoint}/${id}`, data);
   }

   delete(id:string): Observable<Employee>{
    return this.http.delete<Employee>(`${this.apiEndpoint}/${id}`).pipe(map((res: any ) =>{
      return res
    }));
 }
}