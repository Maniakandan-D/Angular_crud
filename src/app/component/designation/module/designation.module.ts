import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DesignationRoutingModule } from './designation-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DesignationAddComponent } from '../designation-add/designation-add.component';
import { DesignationViewComponent } from '../designation-view/designation-view.component';


@NgModule({
  declarations: [
    DesignationAddComponent,
    DesignationViewComponent
  ],
  imports: [
    CommonModule,
    DesignationRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule
  ]
})
export class DesignationModule { }
