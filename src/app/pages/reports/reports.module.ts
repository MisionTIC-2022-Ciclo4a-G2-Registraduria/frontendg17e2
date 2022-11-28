import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { CandidatesComponent } from './candidates/candidates.component';
import { PoliticalPartyComponent } from './political-party/political-party.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlaysTableComponent } from './plays-table/plays-table.component';


@NgModule({
  declarations: [
    CandidatesComponent,
    PoliticalPartyComponent,
    DashboardComponent,
    PlaysTableComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
