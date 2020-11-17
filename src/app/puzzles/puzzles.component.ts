import { Component, OnInit } from '@angular/core';

import { Puzzle } from '../puzzle';
import { PuzzleService } from '../puzzle.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.css']
})
export class PuzzlesComponent implements OnInit {

  constructor(private puzzleService: PuzzleService, private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.getPuzzles();
  }

  getPuzzles(): void {
    this.puzzleService.getPuzzles()
      .subscribe(puzzles => this.puzzles = puzzles);
  }

  puzzles: Puzzle[];

  delete(puzzle: Puzzle): void {
    this.puzzles = this.puzzles.filter(p => p !== puzzle);
    this.puzzleService.deletePuzzle(puzzle).subscribe();
  }
}