import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/employees/edit-employee/edit-employee.component';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helpers';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'employees', component: EmployeesListComponent
  },
  {
    path: 'employees/add', component: AddEmployeeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'employees/edit/:id', component: EditEmployeeComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
