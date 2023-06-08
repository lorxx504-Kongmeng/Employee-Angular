import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { MatDialogModule } from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatDialogModule,
        FormsModule,
        Ng2SearchPipeModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
