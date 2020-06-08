import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AngularIntroComponent } from './angular-intro/angular-intro.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';

const routes: Routes = [
  { path: 'intro', component: AngularIntroComponent },
  { path: 'puzzles', component: PuzzlesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
