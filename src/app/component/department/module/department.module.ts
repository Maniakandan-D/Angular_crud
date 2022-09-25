import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DepartmentRoutingModule } from './department-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DepartmentAddComponent } from '../department-add/department-add.component';
import { DepartmentViewComponent } from '../department-view/department-view.component';


@NgModule({
  declarations: [
    DepartmentAddComponent,
    DepartmentViewComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule
  ],
})
export class DepartmentModule { }
