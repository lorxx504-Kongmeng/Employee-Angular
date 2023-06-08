import {Component, Input} from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent {
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static'
    config.keyboard = false;
  }

  lists: string[] = [
    "Kongmeng",
    "Dinh",
    "Lor"
  ];


  searchKey(data: any) {
    this.inputValue = data;
    console.log(data);

  }


  inputValue: any;



  open(content: any) {
    this.modalService.open(content);
  }

}
