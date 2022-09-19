import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeViewComponent } from '../employee-view/employee-view.component';
import { EmployeesComponent } from '../employees.component';

const routes: Routes = [
  {path:'employees', component: EmployeesComponent},
  {path:'employees/emplyee-add', component: EmployeeAddComponent},
  {path: 'employees/employee-edit/:id', component: EmployeeEditComponent},
  {path: 'employees/employee-view/:id', component: EmployeeViewComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
