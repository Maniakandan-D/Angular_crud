import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders } from '@angular/common/http';
import { Employees } from './employee.model';
import { map } from 'rxjs/operators';

<<<<<<< HEAD

=======
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
<<<<<<< HEAD

=======
  productUrl ='http://localhost:3000';
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:3000/Employees';

  getEmployee() {
    return this.http.get<Employees[]>(this.url);
  }
  addEmployee(data: Employees) {
    return this.http.post<Employees>('http://localhost:3000/Employees', data);
  }
  getEmployeeById(id: string) {
    return this.http.get<Employees>(`http://localhost:3000/Employees/${id}`);
   }
   update(data: Employees){
    return this.http.put(`http://localhost:3000/Employees/${data.id}`,data);
   }
   delete(id:string){
    return this.http.delete<Employees>(`http://localhost:3000/Employees/${id}`).pipe(map((res: any ) =>{
      return res
    }));
 }
 getDetails(id: string){
  return this.http.get<Employees>(`http://localhost:3000/Employees/${id}`);
 }
 //MultipleDelete
 deleteEmployees(id : string){
  return this.http.delete<any>(`http://localhost:3000/Employees/${id}`).pipe(map((res: any ) =>{
    return res
  }));
}
<<<<<<< HEAD


=======
>>>>>>> 0b374fea9a8bcce8e53828033ad8204effe8be1d
}
