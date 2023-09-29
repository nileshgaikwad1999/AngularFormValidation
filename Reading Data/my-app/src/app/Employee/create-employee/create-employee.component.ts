import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Model/Employee';
import { department } from 'src/app/Model/department.model';
import { EmployeeService } from '../Service/Employee.Service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {

  employee:Employee=
  {
    id:0,
    name:"",
    dateOfBirth:new Date(),
    gender:"",
    isActive:true,
    email:"",
    phoneNumber:undefined,
    photoPath:"",
    department:"-11",
    contactPreference:"",
    password:"",
    conformPassword:""
  }
  constructor(private Route:Router,private employeeService:EmployeeService){}
  IsPreviewPhoto:boolean=false;
  BtnPhotoText="show preview"
  togglePhotoPreview(){
   this.BtnPhotoText=this.IsPreviewPhoto?"show preview":"hide preview";
      this.IsPreviewPhoto=!this.IsPreviewPhoto;
    
  }
  departments:department[]=[
    {id:1,name:"HR"},
    {id:2,name:"IT"},
    {id:3,name:"paroller"},
    {id:4,name:"Hr Desk"}
  ]
  onSubmit(employee:Employee){
    console.log(employee);
    this.employeeService.save(employee);
    this.Route.navigate([""]);
    
  }
}
