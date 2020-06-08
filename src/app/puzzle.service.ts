import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Puzzle } from './puzzle';
import { MessagesService } from './messages.service';

import { PUZZLES } from './mock-puzzles';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  constructor(private messagesService: MessagesService) { }

  getPuzzles(): Observable<Puzzle[]> {
    this.messagesService.add('PuzzleService: fetched puzzles');
    return of(PUZZLES);
  }

  getPuzzle(id: number): Observable<Puzzle> {
    this.messagesService.add(`PuzzleService: fetched puzzle id=${id}`);
    return of(PUZZLES.find(puzzle => puzzle.id === id));
  }
}
