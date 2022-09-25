import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { EmployeeViewComponent } from '../employee-view/employee-view.component';


@NgModule({
  declarations: [
    EmployeeAddComponent,
    EmployeeEditComponent,
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
