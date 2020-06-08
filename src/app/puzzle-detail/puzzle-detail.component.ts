import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Puzzle } from '../puzzle';
import { PuzzleService } from '../puzzle.service';

@Component({
  selector: 'app-puzzle-detail',
  templateUrl: './puzzle-detail.component.html',
  styleUrls: ['./puzzle-detail.component.css']
})
export class PuzzleDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private puzzleService: PuzzleService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPuzzle();
  }

  puzzle: Puzzle;

  getPuzzle(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.puzzleService.getPuzzle(id)
      .subscribe(puzzle => this.puzzle = puzzle);
  }

  goBack(): void {
    this.location.back();
  }
}
