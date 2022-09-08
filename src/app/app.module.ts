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
import { FormsModule } from '@angular/forms';
import { EmployeeViewComponent } from './component/employees/employee-view/employee-view.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';


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
    EmployeeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EmployeeModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
