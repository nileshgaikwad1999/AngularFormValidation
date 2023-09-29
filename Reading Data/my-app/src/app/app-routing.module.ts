import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeesComponent } from './Employee/list-employees/list-employees.component';
import { CreateEmployeeComponent } from './Employee/create-employee/create-employee.component';
import { EmployeeListComponent } from './reactiveForm/employee-list/employee-list.component';
import { EmployeeComponent } from './reactiveForm/employee/employee.component';
import { SampleformComponent } from './reactiveForm/Sample/sampleform/sampleform.component';

const routes: Routes = [
  {path:"", component:ListEmployeesComponent,pathMatch:"full"},
  {path:"create",component:CreateEmployeeComponent},
  {path:"reactiveList",component:EmployeeListComponent},
  {path:"reactiveCreate",component:EmployeeComponent},

  {path:"reactiveEdit/:id",component:EmployeeComponent},
  {path:"sampleForm",component:SampleformComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
