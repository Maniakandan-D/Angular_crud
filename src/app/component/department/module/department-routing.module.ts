import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentAddComponent } from '../department-add/department-add.component';
import { DepartmentComponent } from '../department.component';
import { DepartmentViewComponent } from '../department-view/department-view.component';

const routes: Routes = [
  {path:'department', component: DepartmentComponent},
  {path:'department/department-add', component: DepartmentAddComponent},
  {path:'department/department-view/:id', component: DepartmentViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
