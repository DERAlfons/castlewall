import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Puzzle } from './puzzle';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const puzzles: Puzzle[] = [
      { id:  1, title: 'Testpuzzle', s_representation: '?', width: 10, height: 10,
        hints: [
          { hint: { color: 'black', direction: 'down', walls: 2 },
            position: { i: 0, j: 1} },
          { hint: { color: 'black', direction: 'left', walls: 2 },
            position: { i: 0, j: 7 } },
          { hint: { color: 'white', direction: 'up', walls: 1 },
            position: { i: 4, j: 4 } },
          { hint: { color: 'black', direction: 'up', walls: 1 },
            position: { i: 4, j: 7 } },
          { hint: { color: 'black', direction: 'right', walls: 3 },
            position: { i: 7, j: 1 } },
          { hint: { color: 'grey', direction: 'up', walls: 2 },
            position: { i: 7, j: 3 } }
        ] },
      { id:  2, title: 'Trivial Example', s_representation: '0b00bl1n0000bl1', width: 5, height: 2,
        hints: [
          { hint: { color: 'black', direction: null, walls: null },
            position: { i: 0, j: 1 } },
          { hint: { color: 'black', direction: 'left', walls: 1 },
            position: { i: 0, j: 4 } },
          { hint: { color: 'black', direction: 'left', walls: 1 },
            position: { i: 1, j: 4 } }
        ] },
      { id: 11, title: 'Roundabout', s_representation: '00n00', width: 2, height: 2, hints: [] },
      { id: 12, title: 'Lush Forest', s_representation: '00n00', width: 2, height: 2, hints: [] },
      { id: 13, title: 'Greenhouse', s_representation: '00n00', width: 2, height: 2, hints: [] },
      { id: 14, title: 'Abyss', s_representation: '00n00', width: 2, height: 2, hints: [] },
      { id: 15, title: 'Garden', s_representation: '00n00', width: 2, height: 2, hints: [] },
      { id: 16, title: 'Chill Wind', s_representation: '00n00', width: 2, height: 2, hints: [] },
      { id: 17, title: 'Distant Flame', s_representation: '00n00', width: 2, height: 2, hints: [] },
      { id: 18, title: 'Spiral Architecture', s_representation: '00n00', width: 2, height: 2, hints: [] }
    ];
    return { puzzles };
  }

  genId(puzzles: Puzzle[]): number {
    return puzzles.length > 0 ? Math.max(...puzzles.map(puzzle => puzzle.id)) + 1 : 11;
  }
}
