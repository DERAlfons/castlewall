import { ElementRef } from '@angular/core';

import { Board } from './board';

export class BoardCanvas {

  private htmlCanvas: ElementRef<HTMLCanvasElement>;
  private render_ctx: CanvasRenderingContext2D;
  private cellSize: number = 40;
  private gridOffset: number = 20;

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
      this.render_ctx.moveTo(this.gridOffset + i * this.cellSize, this.gridOffset);
      this.render_ctx.lineTo(this.gridOffset + i * this.cellSize, this.gridOffset + board.height * this.cellSize);
      this.render_ctx.stroke();
      this.render_ctx.closePath();
    }
    for (let i = 0; i <= board.height; i++) {
      this.render_ctx.beginPath();
      this.render_ctx.strokeStyle = 'black';
      this.render_ctx.lineWidth = 2;
      this.render_ctx.moveTo(this.gridOffset, this.gridOffset + i * this.cellSize);
      this.render_ctx.lineTo(this.gridOffset + board.width * this.cellSize, this.gridOffset + i * this.cellSize);
      this.render_ctx.stroke();
      this.render_ctx.closePath();
    }

    for (let i = 0; i < board.height; i++) {
      for (let j = 0; j < board.width; j++) {
        if (board.cboard[i][j]) {
          this.render_ctx.fillStyle = board.cboard[i][j].color;
          this.render_ctx.fillRect(this.gridOffset + j * this.cellSize, this.gridOffset + i * this.cellSize, this.cellSize, this.cellSize);
          if (board.cboard[i][j].direction) {
            if (board.cboard[i][j].color == 'black') {
              this.render_ctx.fillStyle = 'white';
            }
            else {
              this.render_ctx.fillStyle = 'black';
            }
            this.render_ctx.font = `${this.cellSize / 2}px Arial`;
            this.render_ctx.fillText(`${board.cboard[i][j].walls}${board.cboard[i][j].direction[0]}`, this.gridOffset + j * this.cellSize + this.cellSize / 4, this.gridOffset + i * this.cellSize + 3 * this.cellSize / 4);
          }
          this.render_ctx.strokeStyle = 'black';
          this.render_ctx.lineWidth = 4;
          this.render_ctx.strokeRect(this.gridOffset + j * this.cellSize, this.gridOffset + i * this.cellSize, this.cellSize, this.cellSize);
        }
      }
    }

    for (let i = 0; i < board.width; i++) {
      for (let j = 0; j < board.height - 1; j++) {
        if (board.vboard[i][j] == 'wall') {
          this.connect(i, j, i, j + 1);
        }
      }
    }
    for (let i = 0; i < board.height; i++) {
      for (let j = 0; j < board.width - 1; j++) {
        if (board.hboard[i][j] == 'wall') {
          this.connect(j, i, j + 1, i);
        }
      }
    }
  }

  connect(x1: number, y1: number, x2: number, y2: number): void {
    this.render_ctx.beginPath();
    this.render_ctx.strokeStyle = 'green';
    this.render_ctx.lineWidth = 2;
    this.render_ctx.moveTo(this.gridOffset + x1 * this.cellSize + this.cellSize / 2, this.gridOffset + y1 * this.cellSize + this.cellSize / 2);
    this.render_ctx.lineTo(this.gridOffset + x2 * this.cellSize + this.cellSize / 2, this.gridOffset + y2 * this.cellSize + this.cellSize / 2);
    this.render_ctx.stroke();
    this.render_ctx.closePath();
  }
}