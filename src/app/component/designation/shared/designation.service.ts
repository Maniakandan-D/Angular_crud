import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { Designation } from './designation.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  
  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:3000/Designation';

  getDesignation() {
    return this.http.get<Designation[]>(this.url);
  }
  addDesignation(data: Designation) {
    return this.http.post<Designation>('http://localhost:3000/Designation', data);
  }
  getDesignationById(id: string) {
    return this.http.get<Designation>(`http://localhost:3000/Designation/${id}`);
   }

   getDesignationByName(name: string) {
    return this.http.get<Designation>(`http://localhost:3000/Designation?designation=${name}`);
   }

   updateDesignation(data: Designation){
    return this.http.put(`http://localhost:3000/Designation/${data.id}`,data);
   }
   deleteDesignation(id:string){
    return this.http.delete<Designation>(`http://localhost:3000/Designation/${id}`).pipe(map((res: any ) =>{
      return res
    }));
 }
  getDesignationDetails(id: string){
  return this.http.get<Designation>(`http://localhost:3000/Designation/${id}`);
 }
  //MultipleDelete
  deleteMultiDesignation(id : string){
    return this.http.delete<any>(`http://localhost:3000/Designation/${id}`).pipe(map((res: any ) =>{
      return res
    }));
  }
}
