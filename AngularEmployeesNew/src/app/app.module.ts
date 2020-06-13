import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeComponent } from './employee/employee/employee.component';
import {EmployeeService,} from './Employee.Service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './helper-modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeePouchDB } from './EmployeePouchDB.Service';
@NgModule({
  entryComponents:[EmployeeComponent],
  declarations: [
    AppComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    EmployeeService,
    EmployeePouchDB
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
