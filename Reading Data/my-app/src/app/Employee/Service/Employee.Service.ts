import { Injectable } from "@angular/core";
import { Employee } from "src/app/Model/Employee";

@Injectable({providedIn:"root"})
export class EmployeeService{

    Employees:Employee[]=[
        {
          id: 1,
          name: 'Mark',
          gender: 'Male',
          contactPreference: 'Email',
          email: 'mark@pragimtech.com',
          dateOfBirth: new Date('10/25/1988'),
          department: '3',
          isActive: true,
          photoPath: 'assets/images/mark.png'
        },
        {
          id: 2,
          name: 'Mary',
          gender: 'Female',
          contactPreference: 'Phone',
          phoneNumber: 2345978640,
          dateOfBirth: new Date('11/20/1979'),
          department: '2',
          isActive: true,
          photoPath: 'assets/images/mary.png'
        },
        {
          id: 3,
          name: 'John',
          gender: 'Male',
          contactPreference: 'Phone',
          phoneNumber: 5432978640,
          dateOfBirth: new Date('3/25/1976'),
          department: '1',
          isActive: false,
          photoPath: 'assets/images/john.png'
        },
      ];
    
      getEmployee(){
        return this.Employees;
      }

      save(emp:Employee){
        this.Employees.push(emp)
      }
}