import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Service/employee.service';
import { IEmployee } from '../Model/IEmployee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees!:IEmployee[];
  constructor(private service:EmployeeService,private route:Router){}

  ngOnInit(): void {
   this.service.getEmployees().subscribe(
      {
        next:(val)=>this.employees=val
      }
    )
  }
  onEditButtonClick(id:number){
this.route.navigate(['/reactiveEdit',id])
  }


}
