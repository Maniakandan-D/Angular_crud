import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
