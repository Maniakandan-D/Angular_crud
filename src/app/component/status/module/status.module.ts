import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusRoutingModule } from './status-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StatusAddComponent } from '../status-add/status-add.component';
import { StatusViewComponent } from '../status-view/status-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StatusAddComponent,
    StatusViewComponent
  ],
  imports: [
    CommonModule,
    StatusRoutingModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class StatusModule { }
