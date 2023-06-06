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

  public onOpenModal(employee: IEmployee[] | null, mode: string) : void {
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    if (mode === 'update') {
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
  }

  ngOnDestroy() {
    this.accountService.$employees.unsubscribe();
  }
}

