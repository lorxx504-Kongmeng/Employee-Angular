import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "../services/account.service";
import {IEmployee, IEmployeePost} from "../interfaces/IEmployee";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {environment} from "../../environments/environment";
import {Subject} from "rxjs";

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
    this.$error.subscribe({
      next: value => {
        this.error = value;
      }
    });
    this.currentImage = this.images[this.index];
  }

  searchInput: string = "";
  public onClickRight() {
    this.index += 1;
    if (this.index === 8) {
      this.index = 0;
    }
    this.currentImage = this.images[this.index];
  }

  change: boolean = false;
  addEmployeeData: IEmployeePost = {
    name: "",
    email: "",
    jobTitle: "",
    phone: NaN,
    imageUrl: "",
    code: NaN
  }
  footerDisplay: boolean = false;
  $error = new Subject<string>();
  error: string = "";
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
  deleteEmployeeData: IEmployee = {
    id: NaN,
    name: "",
    email: "",
    jobTitle: "",
    phone: NaN,
    imageUrl: "",
    code: NaN
  }
  onSaveProfile() {
    this.deleteEmployeeData.imageUrl = this.currentImage;
    this.change = false;
  }
  public updateEmployeeFunction() {
    this.accountService.updateEmployee(this.deleteEmployeeData);
  }
  public deleteEmployeeFunction() {
    this.accountService.deleteById(this.deleteEmployeeData.id);
  }
  public open(content: any, i?:number) {
    if (i != undefined) {
      this.deleteEmployeeData = this.employees[i];
    }
    this.index = 0;
    this.currentImage = this.images[this.index];
    this.modalService.open(content);
  }
  public addEmployeeFunction() {
    this.addEmployeeData.imageUrl = this.currentImage;
    this.verifyAddEmployeeFunction(this.addEmployeeData);
    this.accountService.addEmployee(this.addEmployeeData);
    if (this.footerDisplay === false) {
      this.clearAddEmployeeFunction();
    }
  }
  public clearAddEmployeeFunction() {
    this.addEmployeeData = {
      name: "",
      email: "",
      jobTitle: "",
      phone: NaN,
      imageUrl: "",
      code: NaN
    }
  }
  private verifyAddEmployeeFunction(data: IEmployeePost) {
    if (data.name ==="" || data.email ===""|| data.jobTitle==="") {
      this.footerDisplay = true;
      this.$error.next("Please make sure you do not anything empty, including name, email and jobTitle.");
      return;
    }
    if (data.phone.toString().length < 10) {
      this.footerDisplay = true;
      this.$error.next("Please make sure you enter 10 digits or more for the phone fill.");
      return;
    }
    if (data.code.toString().length < 6 || data.code.toString().length>6) {
      this.footerDisplay = true;
      this.$error.next("Please make sure you enter 6 digits only for the code fill.");
      return;
    }
    this.$error.next("");
    this.footerDisplay = false;
  }
  ngOnDestroy() {
    this.accountService.$employees.unsubscribe();
    this.$error.unsubscribe();
  }
}

