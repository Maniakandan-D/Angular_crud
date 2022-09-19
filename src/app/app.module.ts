import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { EmployeesComponent } from './component/employees/employees.component';
import { PayrollComponent } from './component/payroll/payroll.component';
import { DepartmentComponent } from './component/department/department.component';
import { EmployeeEditComponent } from './component/employees/employee-edit/employee-edit.component';
import { EmployeeAddComponent } from './component/employees/employee-add/employee-add.component';
import { EmployeeModule } from './component/employees/module/employee.module';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeViewComponent } from './component/employees/employee-view/employee-view.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { DesignationComponent } from './component/designation/designation.component';
import { StatusComponent } from './component/status/status.component';
import { DepartmentModule } from './component/department/module/department.module';
import { DesignationModule } from './component/designation/module/designation.module';
import { DepartmentAddComponent } from './component/department/department-add/department-add.component';
import { DesignationAddComponent } from './component/designation/designation-add/designation-add.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { StatusViewComponent } from './component/status/status-view/status-view.component';
import { DepartmentViewComponent } from './component/department/department-view/department-view.component';
import { DesignationViewComponent } from './component/designation/designation-view/designation-view.component';
import { StatusAddComponent } from './component/status/status-add/status-add.component';
import { StatusModule } from './component/status/module/status.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EmployeesComponent,
    PayrollComponent,
    DepartmentComponent,
    EmployeeEditComponent,
    EmployeeAddComponent,
    EmployeeViewComponent,
    DesignationComponent,
    StatusComponent,
    DesignationAddComponent,
    DepartmentAddComponent,
    StatusViewComponent,
    DepartmentViewComponent,
    DesignationViewComponent,
    StatusAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EmployeeModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    DepartmentModule,
    DesignationModule,
    StatusModule,
    Ng2OrderModule,
    ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
