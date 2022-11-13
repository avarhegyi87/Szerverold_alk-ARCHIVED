import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { Employee } from 'src/app/models/employee.model';
import { AuthenticationService } from 'src/app/services';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  employees: Employee[] = [];
  currentUser: User | undefined;
  constructor(private employeesService: EmployeesService, private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.getCurrentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit(): void {
    this.employeesService.getAllEmployees()
    .subscribe({
      next: (employees) => {
        this.employees = employees;
        
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

}
