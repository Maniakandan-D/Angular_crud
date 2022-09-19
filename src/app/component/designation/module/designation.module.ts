import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DesignationRoutingModule } from './designation-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DesignationRoutingModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class DesignationModule { }
