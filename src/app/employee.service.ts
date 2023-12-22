import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface data {
  id: number;
  age: number;
}


@Injectable({
  providedIn: 'root'
})


export class EmployeeService {

  private apiUrl = 'https://retoolapi.dev/HYd96h/data';

  constructor(private http: HttpClient) { }
  getData(): Observable<data[]> {
    return this.http.get<data[]>(this.apiUrl);
  }


}
