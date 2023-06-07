import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "../account.service";
import {IEmployee} from "../interfaces/IEmployee";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy{
  constructor(private accountService: AccountService,config: NgbModalConfig, private modalService: NgbModal) {
    this.accountService.findAll();
    config.backdrop = 'static'
    config.keyboard = false;
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

  public open(content: any) {
    this.modalService.open(content);
  }

  ngOnDestroy() {
    this.accountService.$employees.unsubscribe();
  }
}

