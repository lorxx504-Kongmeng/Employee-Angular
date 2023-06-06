import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IEmployee} from "./interfaces/IEmployee";
import {BehaviorSubject} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpService: HttpService) {}
  $employees = new BehaviorSubject<IEmployee[] | null>(null);
  $employee = new BehaviorSubject<IEmployee | null>(null);

  public addEmployee(employee: IEmployee) {
    this.httpService.addEmployee(employee).subscribe({
      next: value => {

      }, error: err => {

      }
    })
  }
  public findAll() {
    this.httpService.findAll().subscribe({
      next: value => {
        this.$employees.next(value);
      }, error: error => {
        console.log(error);
      }
    })
  }
  public findById(id: number) {
    this.httpService.findById(id).subscribe({
      next: value => {
        this.$employee.next(value);
      }, error: error => {
        console.log(error);
      }
    })
  }
  public deleteById(id: number) {
    this.httpService.deleteById(id).subscribe({
      next: value => {
        this.$employees.next(value);
      }, error: error => {
        console.log(error);
      }
    })
  }
  public updateEmployee(data: IEmployee) {
    this.httpService.updateEmployee(data).subscribe({
      next: value => {
        this.$employee.next(value);
      }, error: error => {
        console.log(error);
      }
    })
  }

}
