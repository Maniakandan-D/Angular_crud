import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { Department } from './department.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
   
  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:3000/Departments';

  getDepartment() {
    return this.http.get<Department[]>(this.url);
  }
  addDepartment(data: Department) {
    return this.http.post<Department>('http://localhost:3000/Departments', data);
  }
  getDepartmentById(id: string) {
    return this.http.get<Department>(`http://localhost:3000/Departments/${id}`);
   }
   getDepartmentByName(name: string) {
    return this.http.get<Department>(`http://localhost:3000/Departments/?department=${name}`);
   }
   getDepartmentByCode(code: number) {
    return this.http.get<Department>(`http://localhost:3000/Departments/?departmentCode=${code}`);
   }
   update(data: Department){
    return this.http.put(`http://localhost:3000/Departments/${data.id}`,data);
   }
   delete(id:string){
    return this.http.delete<Department>(`http://localhost:3000/Departments/${id}`).pipe(map((res: any ) =>{
      return res
    }));
 }
 getDetails(id: string){
  return this.http.get<Department>(`http://localhost:3000/Departments/${id}`);
 }
 //MultipleDelete
 deleteMultiDepartment(id : string){
  return this.http.delete<any>(`http://localhost:3000/Departments/${id}`).pipe(map((res: any ) =>{
    return res
  }));
}
}
