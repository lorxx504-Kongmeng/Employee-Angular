import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "../account.service";
import {IEmployee} from "../interfaces/IEmployee";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy{
  constructor(private accountService: AccountService) {
    this.accountService.findAll();
    this.accountService.$employees.subscribe({
      next: value => {
        if (value!=null) {
          this.employees = value;
        }
      }, error: err => {
        console.log(err);
      }
    });
  }
  employees: IEmployee[] = [];

  ngOnDestroy() {
  }
}

