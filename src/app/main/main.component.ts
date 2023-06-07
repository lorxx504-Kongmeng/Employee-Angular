import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "../account.service";
import {IEmployee} from "../interfaces/IEmployee";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {environment} from "../../environments/environment";

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
    this.currentImage = this.images[this.index];
  }

  onClickRight() {
    this.index += 1;
    if (this.index === 8) {
      this.index = 0;
    }
    this.currentImage = this.images[this.index];
  }

  index: number = 0;
  currentImage: string = "";
  images: string[] = [
    `${environment.imageApiUrl}1.png`,
    `${environment.imageApiUrl}2.png`,
    `${environment.imageApiUrl}3.png`,
    `${environment.imageApiUrl}4.png`,
    `${environment.imageApiUrl}5.png`,
    `${environment.imageApiUrl}6.png`,
    `${environment.imageApiUrl}7.png`,
    `${environment.imageApiUrl}8.png`
  ]
  employees: IEmployee[] = [];

  public open(content: any) {
    this.index = 0;
    this.currentImage = this.images[this.index];
    this.modalService.open(content);
  }

  ngOnDestroy() {
    this.accountService.$employees.unsubscribe();
  }
}

