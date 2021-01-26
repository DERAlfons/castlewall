import { Puzzle } from './puzzle';
import { WallHint } from './wall-hint';
import { Indices, is_even, is_odd, transpose, count } from './util';

export class Board {
  public width: number;
  public height: number;

  public cboard: WallHint[][];
  public vboard: string[][];
  public hboard: string[][];

  public selectV: Indices = null;
  public selectH: Indices = null;

  constructor(puzzle: Puzzle) {
    this.width = puzzle.width;
    this.height = puzzle.height;

    this.cboard = [];
    for (let i = 0; i < puzzle.height; i++) {
      this.cboard.push([]);
      for (let j = 0; j < puzzle.width; j++) {
        this.cboard[i].push(null);
      }
    }
    puzzle.hints.forEach(h => {
      this.cboard[h.position.i][h.position.j] = h.hint;
    });

    this.vboard = [];
    for (let i = 0; i < this.width; i++) {
      this.vboard.push([]);
      for (let j = 0; j < this.height - 1; j++) {
        if (this.cboard[j][i] || this.cboard[j + 1][i]) {
          this.vboard[i].push('impossible');
        }
        else {
          this.vboard[i].push('empty');
        }
      }
    }
    this.hboard = [];
    for (let i = 0; i < this.height; i++) {
      this.hboard.push([]);
      for (let j = 0; j < this.width - 1; j++) {
        if (this.cboard[i][j] || this.cboard[i][j + 1]) {
          this.hboard[i].push('impossible');
        }
        else {
          this.hboard[i].push('empty');
        }
      }
    }
  }

  update_wall_v(i: number, j: number, button: number): void {
    if (i < 0 || i >= this.width || j < 0 || j >= this.height - 1) {
      return;
    }

    if (button == 0) {
      if (this.vboard[i][j] == 'empty') {
        this.vboard[i][j] = 'wall';
      }
      else if (this.vboard[i][j] == 'wall') {
        this.vboard[i][j] = 'empty';
      }
    }
    else if (button == 2) {
      if (this.vboard[i][j] == 'blocked') {
        this.vboard[i][j] = 'empty';
      }
      else if (this.vboard[i][j] != 'impossible') {
        this.vboard[i][j] = 'blocked';
      }
    }

    return;
  }

  update_wall_h(i: number, j: number, button: number): void {
    if (i < 0 || i >= this.height || j < 0 || j >= this.width - 1) {
      return;
    }

    if (button == 0) {
      if (this.hboard[i][j] == 'empty') {
        this.hboard[i][j] = 'wall';
      }
      else if (this.hboard[i][j] == 'wall') {
        this.hboard[i][j] = 'empty';
      }
    }
    else if (button == 2) {
      if (this.hboard[i][j] == 'blocked') {
        this.hboard[i][j] = 'empty';
      }
      else if (this.hboard[i][j] != 'impossible') {
        this.hboard[i][j] = 'blocked';
      }
    }

    return;
  }

  setSelectV(i: number, j: number): void {
    this.selectH = null;
    this.selectV = null;

    if (i < 0 || i >= this.width || j < 0 || j >= this.height - 1) {
      return;
    }

    if (this.vboard[i][j] != 'impossible') {
      this.selectV = { i: i, j: j };
    }

    return;
  }

  setSelectH(i: number, j: number): void {
    this.selectV = null;
    this.selectH = null;

    if (i < 0 || i >= this.height || j < 0 || j >= this.width - 1) {
      return;
    }

    if (this.hboard[i][j] != 'impossible') {
      this.selectH = { i: i, j: j };
    }

    return;
  }

  check(): boolean {
    if (this.check_hints() && this.check_in_out() && this.check_single_circle()) {
      return true;
    }
    else {
      return false;
    }
  }

  check_single_circle(): boolean {
    let start_wall: Indices = { i: 0, j: 0 };
    while (this.hboard[start_wall.i][start_wall.j] != 'wall') {
      if (start_wall.i == this.height - 1 && start_wall.j == this.width - 2) {
        console.log('empty board');
        return false;
      }
      else if (start_wall.i == this.height - 1) {
        start_wall.i = 0;
        start_wall.j += 1;
      }
      else {
        start_wall.i += 1;
      }
    }

    let cpath: Indices[] = [];
    let vcircle: boolean[][] = [];
    for (let i = 0; i < this.width; i++) {
      vcircle.push([]);
    }
    let hcircle: boolean[][] = [];
    for (let i = 0; i < this.height; i++) {
      hcircle.push([]);
    }

    hcircle[start_wall.i][start_wall.j] = true;
    cpath.push({ i: start_wall.i, j: start_wall.j });
    cpath.push({ i: start_wall.i, j: start_wall.j + 1 });

    while (!(cpath[0].i == cpath[cpath.length - 1].i && cpath[0].j == cpath[cpath.length - 1].j)) {
      var nwp = this.next_wall_post(cpath[cpath.length - 2], cpath[cpath.length - 1]);
      if (!nwp) {
        console.log(`No valid continuation: pi: ${cpath[cpath.length - 2].i}, pj: ${cpath[cpath.length - 2].j}, ci: ${cpath[cpath.length - 1].i}, cj: ${cpath[cpath.length - 1].j}`);
        return false;
      }

      if (this.intersect(cpath, nwp)) {
        console.log(`Found intersection: i: ${nwp.i}, j: ${nwp.j}`);
        return false;
      }

      if (cpath[cpath.length - 1].i + 1 == nwp.i) {
        vcircle[nwp.j][nwp.i - 1] = true;
      }
      else if (cpath[cpath.length - 1].j + 1 == nwp.j) {
        hcircle[nwp.i][nwp.j - 1] = true;
      }
      else if (cpath[cpath.length - 1].i - 1 == nwp.i) {
        vcircle[nwp.j][nwp.i] = true;
      }
      else if (cpath[cpath.length - 1].j - 1 == nwp.j) {
        hcircle[nwp.i][nwp.j] = true;
      }

      cpath.push(nwp);
    }

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height - 1; j++) {
        if (this.vboard[i][j] == 'wall' && !vcircle[i][j]) {
          console.log('extra walls');
          return false;
        }
      }
    }
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width - 1; j++) {
        if (this.vboard[i][j] == 'wall' && !vcircle[i][j]) {
          console.log('extra walls');
          return false;
        }
      }
    }

    return true;
  }

  next_wall_post(p_post: Indices, c_post: Indices): Indices{
    if (c_post.i < this.height - 1 && c_post.i >= p_post.i && this.vboard[c_post.j][c_post.i] == 'wall') {
      return { i: c_post.i + 1, j: c_post.j };
    }
    else if (c_post.j < this.width - 1 && c_post.j >= p_post.j && this.hboard[c_post.i][c_post.j] == 'wall') {
      return { i: c_post.i, j: c_post.j + 1 };
    }
    else if (c_post.i >= 1 && c_post.i <= p_post.i && this.vboard[c_post.j][c_post.i - 1] == 'wall') {
      return { i: c_post.i - 1, j: c_post.j };
    }
    else if (c_post.j >= 1 && c_post.j <= p_post.j && this.hboard[c_post.i][c_post.j - 1] == 'wall') {
      return { i: c_post.i, j: c_post.j - 1 };
    }

    return null;
  }

  intersect(path: Indices[], point: Indices): boolean {
    for (let i = 1; i < path.length; i++) {
      if (path[i].i == point.i && path[i].j == point.j) {
        return true;
      }
    }

    return false;
  }

  check_in_out(): boolean {
    for (let i = 1; i < this.height - 1; i++) {
      for (let j = 1; j < this.width - 1; j++) {
        if (this.cboard[i][j] && this.cboard[i][j].color != 'grey') {

          var segment = transpose(this.hboard)[j - 1].slice(0, i);

          if (this.cboard[i][j].color == 'black' && is_odd(count(segment, 'wall'))) {
            return false;
          }
          else if (this.cboard[i][j].color == 'white' && is_even(count(segment, 'wall'))) {
            return false;
          }
        }
      }
    }

    return true;
  }

  check_hints(): boolean {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.cboard[i][j]) {
          switch (this.cboard[i][j].direction) {
            case 'up':
              var segment = this.vboard[j].slice(0, i - 1);
              break;
            case 'left':
              var segment = this.hboard[i].slice(0, j - 1);
              break;
            case 'down':
              var segment = this.vboard[j].slice(i + 1, this.height - 1);
              break;
            case 'right':
              var segment = this.hboard[i].slice(j + 1, this.width - 1);
              break;
       
            default:
              continue;
          }

          if (this.cboard[i][j].walls == count(segment, 'wall')) {
            continue;
          }
          else {
            return false;
          }
        }
      }
    }

    return true;
  }
}