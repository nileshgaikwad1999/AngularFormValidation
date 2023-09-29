import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Model/Employee';
import { EmployeeService } from '../Service/Employee.Service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  ngOnInit(): void {
    this.Employees=this.employeeService.getEmployee();
  }

  constructor(private employeeService:EmployeeService){
  
  }
  Employees:Employee[]=[];


}
