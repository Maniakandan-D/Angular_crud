import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusRoutingModule } from './status-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StatusRoutingModule,
    Ng2SearchPipeModule
  ]
})
export class StatusModule { }
