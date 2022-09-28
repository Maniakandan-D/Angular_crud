import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { EmployeeViewComponent } from '../employee-view/employee-view.component';


@NgModule({
  declarations: [
    EmployeeViewComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
