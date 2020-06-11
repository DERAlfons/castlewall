import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Puzzle } from '../puzzle';
import { PuzzleService } from '../puzzle.service';

@Component({
  selector: 'app-puzzle-search',
  templateUrl: './puzzle-search.component.html',
  styleUrls: ['./puzzle-search.component.css']
})
export class PuzzleSearchComponent implements OnInit {
  puzzles$: Observable<Puzzle[]>;
  private searchTerms = new Subject<string>();

  constructor(private puzzleService: PuzzleService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.puzzles$ = this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.puzzleService.searchPuzzles(term)),
      );
  }

}
