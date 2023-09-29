import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './Employee/list-employees/list-employees.component';
import { CreateEmployeeComponent } from './Employee/create-employee/create-employee.component';
import { SelectRequiredValidatorDirective } from './shared/select.required.validator.directive';
import { conformPasswordValidators } from './shared/Conform.password.validator.directive';
import { EmployeeComponent } from './reactiveForm/employee/employee.component';
import { EmployeeListComponent } from './reactiveForm/employee-list/employee-list.component';
import { SampleformComponent } from './reactiveForm/Sample/sampleform/sampleform.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    conformPasswordValidators,
    EmployeeComponent,
    EmployeeListComponent,
    SampleformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
