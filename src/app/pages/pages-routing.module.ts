import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    // Application modules
    {
      path: 'candidatos',
      loadChildren: () => import('./candidates/candidate.module')
        .then(m => m.CandidatesModule),
    },
    {
      path: 'partidospoliticos',
      loadChildren: () => import('./political_party/political-party.module')
        .then(m => m.Political_partyModule),
    },
    {
      path: 'reportes',
      loadChildren: () => import('./reports/reports.module')
        .then(m => m.ReportsModule),
    },
    {
      path: 'roles',
      loadChildren: () => import('./roles/roles.module')
        .then(m => m.RolesModule),
    },
    {
      path: 'seguridad',
      loadChildren: () => import('./security/security.module')
        .then(m => m.SecurityModule),
    },
    {
      path: 'mesas',
      loadChildren: () => import('./plays-table/plays-table.module')
        .then(m => m.PlaysTableModule),
    },    {
      path: 'usuarios',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'inscripciones',
      loadChildren: () => import('./votes/votes.module')
        .then(m => m.VotesModule),
    },
    
    {
      path: '',
      redirectTo: 'mesas/listar',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
