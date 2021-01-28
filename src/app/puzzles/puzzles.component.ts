import { Component, OnInit } from '@angular/core';

import { Puzzle } from '../puzzle';
import { PuzzleService } from '../puzzle.service';

@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.css']
})
export class PuzzlesComponent implements OnInit {

  puzzles: Puzzle[];

  constructor(private puzzleService: PuzzleService) { }

  ngOnInit(): void {
    this.getPuzzles();
  }

  getPuzzles(): void {
    this.puzzleService.getPuzzles()
      .subscribe(puzzles => this.puzzles = puzzles);
  }
}