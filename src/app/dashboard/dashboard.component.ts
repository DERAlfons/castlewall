import { Component, OnInit } from '@angular/core';
import { Puzzle } from '../puzzle';
import { PuzzleService } from '../puzzle.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private puzzleService: PuzzleService) { }

  ngOnInit(): void {
    this.getPuzzles();
  }

  puzzles: Puzzle[] = [];

  getPuzzles(): void {
    this.puzzleService.getPuzzles()
      .subscribe(puzzles => this.puzzles = puzzles.slice(0, 4));
  }
}
