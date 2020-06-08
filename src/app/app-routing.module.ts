import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PuzzlesComponent } from './puzzles/puzzles.component';

const routes: Routes = [
  { path: 'puzzles', component: PuzzlesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
