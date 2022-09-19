import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { Status } from './status.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }
  url: string = ' http://localhost:3000/Status';

  getStatus() {
    return this.http.get<Status[]>(this.url);
  }
  addStatus(data: Status) {
    return this.http.post<Status>('http://localhost:3000/Status', data);
  }
  getStatusById(id: string) {
    return this.http.get<Status>(`http://localhost:3000/Status/${id}`);
   }
   updateStatus(data: Status){
    return this.http.put(`http://localhost:3000/Status/${data.id}`,data);
   }
   deleteStatus(id:string){
    return this.http.delete<Status>(`http://localhost:3000/Status/${id}`).pipe(map((res: any ) =>{
      return res
    }));
 }
 getStatusDetails(id: string){
  return this.http.get<Status>(`http://localhost:3000/Status/${id}`);
 }
 //MultipleDelete
 deleteMultiStatus(id : string){
  return this.http.delete<any>(`http://localhost:3000/Status/${id}`).pipe(map((res: any ) =>{
    return res
  }));
}
}
