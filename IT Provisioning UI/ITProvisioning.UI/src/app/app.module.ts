import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FakeBackendInterceptor } from "./helpers";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditEmployeeComponent } from './components/employees/edit-employee/edit-employee.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorInterceptor, JwtInterceptor } from './helpers';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

    // provider used to create fake backend
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
