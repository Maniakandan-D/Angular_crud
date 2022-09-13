import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusAddComponent } from '../status-add/status-add.component';
import { StatusViewComponent } from '../status-view/status-view.component';
import { StatusComponent } from '../status.component';

const routes: Routes = [
  {path:'status', component: StatusComponent},
  {path:'status/status-add', component: StatusAddComponent},
  {path:'status/status-view/:id', component: StatusViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusRoutingModule { }
