import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IEmployee, IEmployeePost, IEmployeeUpdate} from "../interfaces/IEmployee";
import {BehaviorSubject, first, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpService: HttpService) {}
  $employees = new BehaviorSubject<IEmployee[] | null>(null);

  $employee = new BehaviorSubject<IEmployee | null>(null);
  $httpError = new Subject<string>();

  employeeReorders: IEmployee[] = [];

  public reorder() {
    this.$employees.subscribe({
      next: value => {
        if (value != null) {
          for (let i = 0; i < value.length; i++) {

          }
        }
      }
    })
  }

  public addEmployee(employee: IEmployeePost) {
    this.httpService.addEmployee(employee).pipe(first()).subscribe({
      next: value => {
        this.$employees.next(value);
      }, error: err => {

      }
    })
  }
  public findAll() {
    this.httpService.findAll().pipe(first()).subscribe({
      next: value => {
        this.$employees.next(value);
      }, error: error => {
        console.log(error);
      }
    })
  }
  public findById(id: number) {
    this.httpService.findById(id).pipe(first()).subscribe({
      next: value => {
        this.$employee.next(value);
      }, error: error => {
        console.log(error);
      }
    })
  }
  public deleteById(id: number) {
    this.httpService.deleteById(id).pipe(first()).subscribe({
      next: value => {
        this.$employees.next(value);
      }, error: error => {
        console.log(error);
      }
    })
  }
  public updateEmployee(data: IEmployeeUpdate) {
    this.httpService.updateEmployee(data).pipe(first()).subscribe({
      next: value => {
        this.$employee.next(value);
      }, error: error => {
        console.log(error);
      }
    })
  }

}
