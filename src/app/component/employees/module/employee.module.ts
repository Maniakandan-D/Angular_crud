import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    Ng2SearchPipeModule
  ]
})
export class EmployeeModule { }
