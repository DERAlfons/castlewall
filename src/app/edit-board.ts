import { Board } from './board';
import { Puzzle } from './puzzle';
import { WallHint } from './wall-hint';
import { Indices } from './util';

export class EditBoard extends Board {

  constructor(puzzle: Puzzle) {
    super(puzzle);
  }

  toPuzzle(): Puzzle {
    let hints: { hint: WallHint, position: Indices }[] = [];
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.cboard[i][j]) {
          if (this.cboard[i][j].direction) {
            hints.push({ hint: { color: this.cboard[i][j].color, direction: this.cboard[i][j].direction, walls: this.cboard[i][j].walls },
                         position: { i: i, j: j } });
          }
          else {
            hints.push({ hint: { color: this.cboard[i][j].color, direction: null, walls: null },
                         position: { i: i, j: j } });
          }
        }
      }
    }

    return { id: null, title: 'Editor Puzzle', s_representation: '?', width: this.width, height: this.height, hints: hints };
  }
}