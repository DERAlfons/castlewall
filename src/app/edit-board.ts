import { Board } from './board';
import { Puzzle } from './puzzle';
import { WallHint } from './wall-hint';
import { Indices } from './util';

export class EditBoard extends Board {

  constructor(puzzle: Puzzle) {
    super(puzzle);
  }

  updateHeight(height: number): void {
    console.log(`updateHeight: old: ${this.height} new: ${height}`);
    if (height < this.height) {
      for (let i = 0; i < this.height - height; i++) {
        this.cboard.pop();
        this.hboard.pop();
        for (let j = 0; j < this.width; j++) {
          this.vboard[j].pop();
        }
      }
    }
    else if (height > this.height) {
      for (let i = 0; i < height - this.height; i++) {
        this.cboard.push([]);
        for (let j = 0; j < this.width; j++) {
          this.cboard[this.height + i].push(null);
          this.vboard[j].push(null);
        }
        this.hboard.push([]);
        for (let j = 0; j < this.width - 1; j++) {
          this.hboard[this.height + i].push(null);
        }
      }
    }

    this.height = height;
  }

  updateWidth(width: number): void {
    console.log(`updateWidth: old: ${this.width} new: ${width}`);
    if (width < this.width) {
      for (let i = 0; i < this.width - width; i++) {
        for (let j = 0; j < this.height; j++) {
          this.cboard[j].pop();
          this.hboard[j].pop();
        }
        this.vboard.pop();
      }
    }
    else if (width > this.width) {
      for (let i = 0; i < width - this.width; i++) {
        for (let j = 0; j < this.height; j++) {
          this.cboard[j].push(null);
          this.hboard[j].push(null);
        }
        console.log(`Before push: i: ${i} vboard length: ${this.vboard.length} this.width: ${this.width} width: ${width}`);
        this.vboard.push([]);
        console.log(`After push: i: ${i} vboard length: ${this.vboard.length} this.width: ${this.width} width: ${width}`);
        for (let j = 0; j < this.height - 1; j++) {
          console.log(`vboard index: ${this.width + i}`);
          this.vboard[this.width + i].push(null);
        }
      }
    }

    this.width = width;
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