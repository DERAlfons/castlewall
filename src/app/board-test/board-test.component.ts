import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { Board } from '../board';

@Component({
  selector: 'app-board-test',
  templateUrl: './board-test.component.html',
  styleUrls: ['./board-test.component.css']
})
export class BoardTestComponent implements OnInit {
  @ViewChild('canvasbg', { static: true })
  canvasbg: ElementRef<HTMLCanvasElement>;
  private render_ctx: CanvasRenderingContext2D;

  private board: Board;

  constructor() {
    let cboard = [
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

    this.board = new Board(cboard);
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
        if (this.board.cboard[i][j]) {
          this.render_ctx.fillStyle = this.board.cboard[i][j].color;
          this.render_ctx.fillRect(20 + j * 20, 20 + i * 20, 20, 20);
          if (this.board.cboard[i][j].direction) {
            if (this.board.cboard[i][j].color == 'black') {
              this.render_ctx.fillStyle = 'white';
            }
            else {
              this.render_ctx.fillStyle = 'black';
            }
            this.render_ctx.font = '10px Arial';
            this.render_ctx.fillText(`${this.board.cboard[i][j].walls}${this.board.cboard[i][j].direction[0]}`, 25 + j * 20, 35 + i * 20);
          }
          this.render_ctx.strokeStyle = 'black';
          this.render_ctx.lineWidth = 4;
          this.render_ctx.strokeRect(20 + j * 20, 20 + i * 20, 20, 20);
        }
      }
    }
  }

  checkBtn(): void {
    if (this.board.check()) {
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
          if (!(this.board.hboard[py - 1][px - 1])) {
            this.board.hboard[py - 1][px - 1] = 'wall';
            this.connect(px, py, px + 1, py);
          }
          else if (this.board.hboard[py - 1][px - 1] == 'wall') {
            this.board.hboard[py - 1][px - 1] = null;
            this.disconnect(px, py, px + 1, py);
          }
        }
        else if ((dx < 20 - dy) && py >= 2) {
          if (!(this.board.vboard[px - 1][py - 2])) {
            this.board.vboard[px - 1][py - 2] = 'wall';
            this.connect(px, py - 1, px , py);
          }
          else if (this.board.vboard[px - 1][py - 2] == 'wall') {
            this.board.vboard[px - 1][py - 2] = null;
            this.disconnect(px, py - 1, px, py);
          }
        }
      }
      else {
        if ((dx > 20 - dy) && py <= 9) {
          if (!(this.board.vboard[px - 1][py - 1])) {
            this.board.vboard[px - 1][py - 1] = 'wall';
            this.connect(px, py, px, py + 1);
          }
          else if (this.board.vboard[px - 1][py - 1] == 'wall') {
            this.board.vboard[px - 1][py - 1] = null;
            this.disconnect(px, py, px, py + 1);
          }
        }
        else if ((dx < 20 - dy) && px >= 2) {
          if (!(this.board.hboard[py - 1][px - 2])) {
            this.board.hboard[py - 1][px - 2] = 'wall';
            this.connect(px - 1, py, px, py);
          }
          else if (this.board.hboard[py - 1][px - 2] == 'wall') {
            this.board.hboard[py - 1][px - 2] = null;
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