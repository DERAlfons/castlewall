import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AngularIntroComponent } from './angular-intro/angular-intro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';
import { BoardComponent } from './board/board.component';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'intro', component: AngularIntroComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'puzzles', component: PuzzlesComponent },
  { path: 'board/:id', component: BoardComponent },
  { path: 'editor', component: EditorComponent, pathMatch: 'full' },
  { path: 'editor/:id', component: EditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
