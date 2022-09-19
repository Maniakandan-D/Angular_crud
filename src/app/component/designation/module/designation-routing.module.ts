import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignationAddComponent } from '../designation-add/designation-add.component';
import { DesignationViewComponent } from '../designation-view/designation-view.component';
import { DesignationComponent } from '../designation.component';

const routes: Routes = [
  {path:'designation', component: DesignationComponent},
  {path:'designation/designation-add', component: DesignationAddComponent},
  {path:'designation/designation-view/:id', component: DesignationViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationRoutingModule { }
