import { ElementRef } from '@angular/core';

import { Board } from './board';

export class BoardCanvas {

  private htmlCanvas: ElementRef<HTMLCanvasElement>;
  private render_ctx: CanvasRenderingContext2D;
  private cellSize: number = 40;

  constructor(canvas: ElementRef<HTMLCanvasElement>) {
    this.htmlCanvas = canvas;
    this.render_ctx = canvas.nativeElement.getContext('2d');
  }

  render(board: Board): void {
    this.render_ctx.clearRect(0, 0, this.htmlCanvas.nativeElement.width, this.htmlCanvas.nativeElement.height);

    for (let i = 0; i <= board.width; i++) {
      this.render_ctx.beginPath();
      this.render_ctx.strokeStyle = 'black';
      this.render_ctx.lineWidth = 2;
      this.render_ctx.moveTo(this.cellSize + i * this.cellSize, this.cellSize);
      this.render_ctx.lineTo(this.cellSize + i * this.cellSize, this.cellSize + board.height * this.cellSize);
      this.render_ctx.stroke();
      this.render_ctx.closePath();
    }
    for (let i = 0; i <= board.height; i++) {
      this.render_ctx.beginPath();
      this.render_ctx.strokeStyle = 'black';
      this.render_ctx.lineWidth = 2;
      this.render_ctx.moveTo(this.cellSize, this.cellSize + i * this.cellSize);
      this.render_ctx.lineTo(this.cellSize + board.width * this.cellSize, this.cellSize + i * this.cellSize);
      this.render_ctx.stroke();
      this.render_ctx.closePath();
    }

    for (let i = 0; i < board.height; i++) {
      for (let j = 0; j < board.width; j++) {
        if (board.cboard[i][j]) {
          this.render_ctx.fillStyle = board.cboard[i][j].color;
          this.render_ctx.fillRect(this.cellSize + j * this.cellSize, this.cellSize + i * this.cellSize, this.cellSize, this.cellSize);
          if (board.cboard[i][j].direction) {
            if (board.cboard[i][j].color == 'black') {
              this.render_ctx.fillStyle = 'white';
            }
            else {
              this.render_ctx.fillStyle = 'black';
            }
            this.render_ctx.font = `${this.cellSize / 2}px Arial`;
            this.render_ctx.fillText(`${board.cboard[i][j].walls}${board.cboard[i][j].direction[0]}`, this.cellSize + this.cellSize / 4 + j * this.cellSize, 2 * this.cellSize - this.cellSize / 4 + i * this.cellSize);
          }
          this.render_ctx.strokeStyle = 'black';
          this.render_ctx.lineWidth = 4;
          this.render_ctx.strokeRect(this.cellSize + j * this.cellSize, this.cellSize + i * this.cellSize, this.cellSize, this.cellSize);
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
    this.render_ctx.moveTo(this.cellSize / 2 + x1 * this.cellSize, this.cellSize / 2 + y1 * this.cellSize);
    this.render_ctx.lineTo(this.cellSize / 2 + x2 * this.cellSize, this.cellSize / 2 + y2 * this.cellSize);
    this.render_ctx.stroke();
    this.render_ctx.closePath();
  }
}