export class Board {
  public width: number;
  public height: number;

  public vboard = [];
  public hboard = [];

  constructor(public cboard) {
    for (let i = 0; i <= 9; i++) {
      this.vboard.push([]);
      this.hboard.push([]);
      for (let j = 0; j <= 8; j++) {
        if (this.cboard[i][j] || this.cboard[i][j + 1]) {
          this.hboard[i].push('blocked');
        }
        else {
          this.hboard[i].push(null);
        }

        if (this.cboard[j][i] || this.cboard[j + 1][i]) {
          this.vboard[i].push('blocked');
        }
        else {
          this.vboard[i].push(null);
        }
      }
    }
  }

  update_wall_v(i: number, j: number): void {
    if (!this.vboard[i][j]) {
      this.vboard[i][j] = 'wall';
    }
    else if (this.vboard[i][j] == 'wall') {
      this.vboard[i][j] = null;
    }
  }

  update_wall_h(i: number, j: number): void {
    if (!this.hboard[i][j]) {
      this.hboard[i][j] = 'wall';
    }
    else if (this.hboard[i][j] == 'wall') {
      this.hboard[i][j] = null;
    }
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
    let start_wall = { i: 0, j: 0 };
    while (this.hboard[start_wall.i][start_wall.j] != 'wall') {
      if (start_wall.i == 9 && start_wall.j == 8) {
        console.log('empty board');
        return false;
      }
      else if (start_wall.i == 9) {
        start_wall.i = 0;
        start_wall.j += 1;
      }
      else {
        start_wall.i += 1;
      }
    }

    let vcircle = [[],[],[],[],[],[],[],[],[],[]];
    let hcircle = [[],[],[],[],[],[],[],[],[],[]];
    let cpath = [];

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

    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 8; j++) {
        if (this.vboard[i][j] == 'wall' && !vcircle[i][j]) {
          console.log('extra walls');
          return false;
        }

        if (this.hboard[i][j] == 'wall' && !hcircle[i][j]) {
          console.log('extra walls');
          return false;
        }
      }
    }

    return true;
  }

  next_wall_post(p_post, c_post) {
    if (c_post.i <= 8 && c_post.i >= p_post.i && this.vboard[c_post.j][c_post.i] == 'wall') {
      return { i: c_post.i + 1, j: c_post.j };
    }
    else if (c_post.j <= 8 && c_post.j >= p_post.j && this.hboard[c_post.i][c_post.j] == 'wall') {
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

  intersect(path, point): boolean {
    for (let i = 1; i < path.length; i++) {
      if (path[i].i == point.i && path[i].j == point.j) {
        return true;
      }
    }

    return false;
  }

  check_in_out(): boolean {
    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
        if (this.cboard[i][j] && this.cboard[i][j].color != 'grey') {

          var segment = this.transpose(this.hboard)[j - 1].slice(0, i);

          if (this.cboard[i][j].color == 'black' && this.is_odd(this.count(segment, 'wall'))) {
            return false;
          }
          else if (this.cboard[i][j].color == 'white' && this.is_even(this.count(segment, 'wall'))) {
            return false;
          }
        }
      }
    }

    return true;
  }

  check_hints(): boolean {
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        if (this.cboard[i][j]) {
          switch (this.cboard[i][j].direction) {
            case 'up':
              var segment = this.vboard[j].slice(0, i - 1);
              break;
            case 'left':
              var segment = this.hboard[i].slice(0, j - 1);
              break;
            case 'down':
              var segment = this.vboard[j].slice(i + 1, 9);
              break;
            case 'right':
              var segment = this.hboard[i].slice(j + 1, 9);
              break;
       
            default:
              continue;
          }

          if (this.cboard[i][j].walls == this.count(segment, 'wall')) {
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

  transpose<T>(matrix: T[][]): T[][] {
    let result = [];
    for (let i = 0; i < matrix[0].length; i++) {
      result.push([]);
      for (let j = 0; j < matrix.length; j++) {
        result[i].push(matrix[j][i]);
      }
    }

    return result;
  }

  is_odd(n: number): boolean {
    return !this.is_even(n);
  }

  is_even(n: number): boolean {
    if (n % 2 == 0) {
      return true;
    }
    else {
      return false;
    }
  }

  count<T>(array: T[], value: T): number {
    let count = 0;
    array.forEach(element => {
      if (element == value) {
        count += 1;
      }
    });

    return count;
  }
}