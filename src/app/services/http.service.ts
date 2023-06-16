import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IEmployee, IEmployeePost, IEmployeeUpdate} from "../interfaces/IEmployee";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}
  public addEmployee(input: IEmployeePost) : Observable<IEmployee[]> {
    return this.httpClient.post(`${this.apiServerUrl}add`, input) as Observable<IEmployee[]>;
  }
  public findAll() : Observable<IEmployee[]> {
    return this.httpClient.get(`${this.apiServerUrl}all`) as Observable<IEmployee[]>;
  }
  public findById(id: number) : Observable<IEmployee> {
    return this.httpClient.get(`${this.apiServerUrl}find{${id}`) as Observable<IEmployee>;
  }
  public deleteById(id: number): Observable<IEmployee[]> {
    return this.httpClient.delete(`${this.apiServerUrl}delete?id=${id}`) as Observable<IEmployee[]>;
  }
  public updateEmployee(input: IEmployeeUpdate) : Observable<IEmployee> {
    return this.httpClient.put(`${this.apiServerUrl}update`, input) as Observable<IEmployee>;
  }
}
