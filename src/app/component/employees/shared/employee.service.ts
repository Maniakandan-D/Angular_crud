import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { Employees } from './employee.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:3000/Employees';

  getEmployee() {
    return this.http.get<Employees[]>(this.url);
  }
  addEmployee(data: Employees) {
    return this.http.post<Employees>('http://localhost:3000/Employees', data);
  }
  getEmployeeById(id: number) {
    return this.http.get<Employees>(`http://localhost:3000/Employees/${id}`);
   }
   update(data: Employees){
    return this.http.put(`http://localhost:3000/Employees/${data.id}`,data);
   }
   delete(id:number){
    return this.http.delete<Employees>(`http://localhost:3000/Employees/${id}`).pipe(map((res: any ) =>{
      return res
    }));
 }
 getDetails(id: number){
  return this.http.get<Employees>(`http://localhost:3000/Employees/${id}`);
 }
}
