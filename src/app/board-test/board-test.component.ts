import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-test',
  templateUrl: './board-test.component.html',
  styleUrls: ['./board-test.component.css']
})
export class BoardTestComponent implements OnInit {
  @ViewChild('canvasbg', { static: true })
  canvasbg: ElementRef<HTMLCanvasElement>;
  private render_ctx: CanvasRenderingContext2D;

  private cboard = [
    [null, { color: 'black', direction: 'down', walls: 2 }, null, null, null, null, null, { color: 'black', direction: 'left', walls: 2 }, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, { color: 'white', direction: 'up', walls: 1 }, null, null, { color: 'black', direction: 'up', walls: 1 }, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, { color: 'black', direction: 'right', walls: 3 }, null, { color: 'grey', direction: 'up', walls: 2 }, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null]
  ]

  private vboard = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null]
  ]

  private hboard = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null]
  ]

  constructor() {
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 8; j++) {
        if (this.cboard[i][j] || this.cboard[i][j + 1]) {
          this.hboard[i][j] = 'blocked';
        }

        if (this.cboard[j][i] || this.cboard[j + 1][i]) {
          this.vboard[i][j] = 'blocked';
        }
      }
    }
  }

  ngOnInit(): void {
    this.render_ctx = this.canvasbg.nativeElement.getContext('2d');
    this.canvasbg.nativeElement.addEventListener('mousedown', event => this.handleMousedown(event));
    requestAnimationFrame(() => this.render());
  }

  render(): void {
    this.render_ctx.fillStyle = 'red';
    this.render_ctx.fillRect(10, 10, 20, 20);

    for (let i = 0; i <= 10; i++) {
      this.render_ctx.beginPath();
      this.render_ctx.strokeStyle = 'black';
      this.render_ctx.lineWidth = 2;
      this.render_ctx.moveTo(20 + i * 20, 20);
      this.render_ctx.lineTo(20 + i * 20, 220);
      this.render_ctx.stroke();
      this.render_ctx.closePath();
    }
    for (let i = 0; i <= 10; i++) {
      this.render_ctx.beginPath();
      this.render_ctx.strokeStyle = 'black';
      this.render_ctx.lineWidth = 2;
      this.render_ctx.moveTo(20, 20 + i * 20);
      this.render_ctx.lineTo(220, 20 + i * 20);
      this.render_ctx.stroke();
      this.render_ctx.closePath();
    }

    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        if (this.cboard[i][j]) {
          this.render_ctx.fillStyle = this.cboard[i][j].color;
          this.render_ctx.fillRect(20 + j * 20, 20 + i * 20, 20, 20);
          if (this.cboard[i][j].direction) {
            if (this.cboard[i][j].color == 'black') {
              this.render_ctx.fillStyle = 'white';
            }
            else {
              this.render_ctx.fillStyle = 'black';
            }
            this.render_ctx.font = '10px Arial';
            this.render_ctx.fillText(`${this.cboard[i][j].walls}${this.cboard[i][j].direction[0]}`, 25 + j * 20, 35 + i * 20);
          }
          this.render_ctx.strokeStyle = 'black';
          this.render_ctx.lineWidth = 4;
          this.render_ctx.strokeRect(20 + j * 20, 20 + i * 20, 20, 20);
        }
      }
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

  checkBtn(): void {
    if (this.check_single_circle()) {
      console.log("Yay");
    }
    else {
      console.log("Nay");
    }
  }

  handleMousedown(event: MouseEvent): void {
    let px = Math.floor(event.offsetX / 20);
    let py = Math.floor(event.offsetY / 20);
    let dx = event.offsetX % 20;
    let dy = event.offsetY % 20;

    if ((px >= 1) && (px <= 10) && (py >= 1) && (py <= 10)) {
      if (dx > dy) {
        if ((dx > 20 - dy) && px <= 9) {
          if (!(this.hboard[py - 1][px - 1])) {
            this.hboard[py - 1][px - 1] = 'wall';
            this.connect(px, py, px + 1, py);
          }
          else if (this.hboard[py - 1][px - 1] == 'wall') {
            this.hboard[py - 1][px - 1] = null;
            this.disconnect(px, py, px + 1, py);
          }
        }
        else if ((dx < 20 - dy) && py >= 2) {
          if (!(this.vboard[px - 1][py - 2])) {
            this.vboard[px - 1][py - 2] = 'wall';
            this.connect(px, py - 1, px , py);
          }
          else if (this.vboard[px - 1][py - 2] == 'wall') {
            this.vboard[px - 1][py - 2] = null;
            this.disconnect(px, py - 1, px, py);
          }
        }
      }
      else {
        if ((dx > 20 - dy) && py <= 9) {
          if (!(this.vboard[px - 1][py - 1])) {
            this.vboard[px - 1][py - 1] = 'wall';
            this.connect(px, py, px, py + 1);
          }
          else if (this.vboard[px - 1][py - 1] == 'wall') {
            this.vboard[px - 1][py - 1] = null;
            this.disconnect(px, py, px, py + 1);
          }
        }
        else if ((dx < 20 - dy) && px >= 2) {
          if (!(this.hboard[py - 1][px - 2])) {
            this.hboard[py - 1][px - 2] = 'wall';
            this.connect(px - 1, py, px, py);
          }
          else if (this.hboard[py - 1][px - 2] == 'wall') {
            this.hboard[py - 1][px - 2] = null;
            this.disconnect(px - 1, py, px, py);
          }
        }
      }
    }
  }

  connect(x1: number, y1: number, x2: number, y2: number): void {
    this.render_ctx.beginPath();
    this.render_ctx.strokeStyle = 'green';
    this.render_ctx.lineWidth = 2;
    this.render_ctx.moveTo(10 + x1 * 20, 10 + y1 * 20);
    this.render_ctx.lineTo(10 + x2 * 20, 10 + y2 * 20);
    this.render_ctx.stroke();
    this.render_ctx.closePath();
  }

  disconnect(x1: number, y1: number, x2: number, y2: number): void {
    this.render_ctx.beginPath();
    this.render_ctx.strokeStyle = 'red';
    this.render_ctx.lineWidth = 2;
    this.render_ctx.moveTo(10 + x1 * 20, 10 + y1 * 20);
    this.render_ctx.lineTo(10 + x2 * 20, 10 + y2 * 20);
    this.render_ctx.stroke();
    this.render_ctx.closePath();
  }
}