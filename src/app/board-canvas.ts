import { ElementRef } from '@angular/core';

import { Board } from './board';

export class BoardCanvas {

  private render_ctx: CanvasRenderingContext2D;
  private height: number;
  private width: number;

  constructor(canvas: ElementRef<HTMLCanvasElement>) {
    this.render_ctx = canvas.nativeElement.getContext('2d');
    this.height = canvas.nativeElement.height;
    this.width = canvas.nativeElement.width;
  }

  render(board: Board): void {
    this.render_ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i <= board.width; i++) {
      this.render_ctx.beginPath();
      this.render_ctx.strokeStyle = 'black';
      this.render_ctx.lineWidth = 2;
      this.render_ctx.moveTo(20 + i * 20, 20);
      this.render_ctx.lineTo(20 + i * 20, 20 + board.height * 20);
      this.render_ctx.stroke();
      this.render_ctx.closePath();
    }
    for (let i = 0; i <= board.height; i++) {
      this.render_ctx.beginPath();
      this.render_ctx.strokeStyle = 'black';
      this.render_ctx.lineWidth = 2;
      this.render_ctx.moveTo(20, 20 + i * 20);
      this.render_ctx.lineTo(20 + board.width * 20, 20 + i * 20);
      this.render_ctx.stroke();
      this.render_ctx.closePath();
    }

    for (let i = 0; i < board.height; i++) {
      for (let j = 0; j < board.width; j++) {
        if (board.cboard[i][j]) {
          this.render_ctx.fillStyle = board.cboard[i][j].color;
          this.render_ctx.fillRect(20 + j * 20, 20 + i * 20, 20, 20);
          if (board.cboard[i][j].direction) {
            if (board.cboard[i][j].color == 'black') {
              this.render_ctx.fillStyle = 'white';
            }
            else {
              this.render_ctx.fillStyle = 'black';
            }
            this.render_ctx.font = '10px Arial';
            this.render_ctx.fillText(`${board.cboard[i][j].walls}${board.cboard[i][j].direction[0]}`, 25 + j * 20, 35 + i * 20);
          }
          this.render_ctx.strokeStyle = 'black';
          this.render_ctx.lineWidth = 4;
          this.render_ctx.strokeRect(20 + j * 20, 20 + i * 20, 20, 20);
        }
      }
    }

    for (let i = 0; i < board.width; i++) {
      for (let j = 0; j < board.height - 1; j++) {
        if (board.vboard[i][j] == 'wall') {
          this.connect(i + 1, j + 1, i + 1, j + 2);
        }
      }
    }
    for (let i = 0; i < board.height; i++) {
      for (let j = 0; j < board.width - 1; j++) {
        if (board.hboard[i][j] == 'wall') {
          this.connect(j + 1, i + 1, j + 2, i + 1);
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
}