import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './component/department/department.component';
import { EmployeesComponent } from './component/employees/employees.component';
import { PayrollComponent } from './component/payroll/payroll.component';

const routes: Routes = [
  {path:'employees' ,component: EmployeesComponent},
  {path:'department' ,component: DepartmentComponent},
  {path:'payroll' ,component: PayrollComponent},
  {path: '', redirectTo: 'component/employees', pathMatch: 'full',},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
