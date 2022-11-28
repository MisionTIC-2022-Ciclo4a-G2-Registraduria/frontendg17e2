import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './candidates/candidates.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlaysTableComponent } from './plays-table/plays-table.component';
import { PoliticalPartyComponent } from './political-party/political-party.component';

const routes: Routes = [
  {
    path: 'mesas',
    component: PlaysTableComponent,
  },
  {
    path: 'candidatos',
    component: CandidatesComponent,
  },
  {
    path: 'partidos',
    component: PoliticalPartyComponent,
  },
  {
    path: 'general',
    component: DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
