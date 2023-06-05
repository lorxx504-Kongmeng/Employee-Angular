import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IEmployee} from "./interfaces/IEmployee";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {}
  public addEmployee(input: IEmployee) : Observable<IEmployee> {
    return this.httpClient.post("http://localhost:8008/api/employee/add", input) as Observable<IEmployee>;
  }
  public findAll() : Observable<IEmployee[]> {
    return this.httpClient.get("http://localhost:8008/api/employee/all") as Observable<IEmployee[]>;
  }
  public findById(id: number) : Observable<IEmployee> {
    return this.httpClient.get(`http://localhost:8008/api/employee/find{${id}`) as Observable<IEmployee>;
  }
  public deleteById(id: number) : void {
    this.httpClient.get(`http://localhost:8008/api/employee/delete?=${id}`);
  }

}
