import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { Department } from './department.model';
import { map } from 'rxjs/operators';


<<<<<<< HEAD

=======
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
<<<<<<< HEAD
   departmentNames = ['Software', 'IT', 'HR', 'Finance', 'Network'];
=======

>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
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
<<<<<<< HEAD
 deleteMultiDepartment(id : string){
=======
 deleteEmployees(id : string){
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
  return this.http.delete<any>(`http://localhost:3000/Departments/${id}`).pipe(map((res: any ) =>{
    return res
  }));
}
}
