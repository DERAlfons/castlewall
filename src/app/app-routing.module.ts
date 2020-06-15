import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AngularIntroComponent } from './angular-intro/angular-intro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';
import { PuzzleDetailComponent } from './puzzle-detail/puzzle-detail.component';
import { BoardTestComponent } from './board-test/board-test.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'intro', component: AngularIntroComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'puzzles', component: PuzzlesComponent },
  { path: 'detail/:id', component: PuzzleDetailComponent },
  { path: 'board', component: BoardTestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
