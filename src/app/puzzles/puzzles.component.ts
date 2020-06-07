import { Component, OnInit } from '@angular/core';
import { Puzzle } from '../puzzle';

@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.css']
})
export class PuzzlesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  puzzle: Puzzle = {
    id: 1,
    title: 'Trivial example',
    s_representation: '0b00bl2n0000bl2',
  }

}
