import { Component } from '@angular/core';
import {IEmployee, IEmployeePost} from "./interfaces/IEmployee";
import {HttpService} from "./http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private httpService: HttpService) {}
  data: IEmployeePost = {
    name: "Dinh Lor",
    email: "Dinhlor122@gmail.com",
    jobTitle: "Software Engineer",
    phone: 1,
    imageUrl : "HelloWorld",
    code : 702292
  }
  add() {
    this.httpService.addEmployee(this.data).subscribe({
      next: value => {
        console.log(value);
      }, error: err => {
        console.log(err)
      }
    })
  }

  delete() {
    this.httpService.deleteById(1).subscribe({
      next: value => {
        console.log("Successful : ",value);
      }, error: err => {
        console.log(err);
      }
    })
  }
}
