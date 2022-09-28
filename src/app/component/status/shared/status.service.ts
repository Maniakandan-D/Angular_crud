import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { Status } from './status.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StatusService {

  constructor(private http: HttpClient) { }
  apiEndpoint: string  = environment.BackendApiEndpointStatus;

  getAll() : Observable<Status[]>{
    return this.http.get<Status[]>(`${this.apiEndpoint}`);
  }

  add(status: Status): Observable<Status> {
    return this.http.post<Status>(`${this.apiEndpoint}`, status);
  }

  getById(id: string) : Observable<Status>{
    return this.http.get<Status>(`${this.apiEndpoint}/${id}`);
   }

   getByName(name: string) : Observable<Status[]>{
    return this.http.get<Status[]>(`${this.apiEndpoint}/?name=${name}`);
   }

   update(data: Status): any{
    return this.http.put(`${this.apiEndpoint}/${data.id}`,data);
   }

   delete(id:string): Observable<Status>{
    return this.http.delete<Status>(`${this.apiEndpoint}/${id}`).pipe(map((res: any ) =>{
      return res
    }));
 }
}
