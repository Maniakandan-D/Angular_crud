import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { DepartmentRoutingModule } from './department-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class DepartmentModule { }
