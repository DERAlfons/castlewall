import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Puzzle } from './puzzle';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const puzzles = [
      { id: 11, title: 'Roundabout', s_representation: '00n00'},
      { id: 12, title: 'Lush Forest', s_representation: '00n00'},
      { id: 13, title: 'Greenhouse', s_representation: '00n00'},
      { id: 14, title: 'Abyss', s_representation: '00n00'},
      { id: 15, title: 'Garden', s_representation: '00n00'},
      { id: 16, title: 'Chill Wind', s_representation: '00n00'},
      { id: 17, title: 'Distant Flame', s_representation: '00n00'},
      { id: 18, title: 'Spiral Architecture', s_representation: '00n00'}
    ];
    return { puzzles };
  }

  genId(puzzles: Puzzle[]): number {
    return puzzles.length > 0 ? Math.max(...puzzles.map(puzzle => puzzle.id)) + 1 : 11;
  }
}
