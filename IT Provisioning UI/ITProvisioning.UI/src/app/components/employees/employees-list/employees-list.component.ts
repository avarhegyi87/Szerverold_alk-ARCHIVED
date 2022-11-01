import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  employees: Employee[] = [
    {
      id: 'H58687',
      firstName: 'Ádám',
      lastName: 'Várhegyi-Miłoś',
      department: 'CIO',
      email: 'adam.varhegyi@hu.ibm.com',
      phone: '+36203266674',
      device: 'MacBook Pro 16'
    },
    {
      id: 'H99999',
      firstName: 'Dániel',
      lastName: 'Dajka',
      department: 'BPO',
      email: 'daniel.dajka@hu.ibm.com',
      phone: '+36701234567',
      device: 'Lenovo ThinkPad T480'
    },
    {
      id: 'ZZ5555',
      firstName: 'Purvi',
      lastName: 'Thakkar',
      department: 'BPO',
      email: 'purvi.thakkar@hu.ibm.com',
      phone: '+36307777777',
      device: 'MacBook Air 13'
    }
  ];
  constructor() { }

  ngOnInit(): void {
    this.employees.push()
  }

}
