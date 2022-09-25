import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { EmployeesComponent } from './component/employees/employees.component';
import { PayrollComponent } from './component/payroll/payroll.component';
import { DepartmentComponent } from './component/department/department.component';
import { EmployeeModule } from './component/employees/module/employee.module';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { DesignationComponent } from './component/designation/designation.component';
import { StatusComponent } from './component/status/status.component';
import { DepartmentModule } from './component/department/module/department.module';
import { DesignationModule } from './component/designation/module/designation.module';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { StatusModule } from './component/status/module/status.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EmployeesComponent,
    PayrollComponent,
    DepartmentComponent,
    DesignationComponent,
    StatusComponent,
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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-right',
    })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
