import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaysTableRoutingModule } from './plays-table-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    PlaysTableRoutingModule,
    NbCardModule, 
    FormsModule,
  ]
})
export class PlaysTableModule { }
