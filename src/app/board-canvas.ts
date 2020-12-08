import { ElementRef } from '@angular/core';

import { Board } from './board';

export class BoardCanvas {

  private htmlCanvas: ElementRef<HTMLCanvasElement>;
  private render_ctx: CanvasRenderingContext2D;
  private cellSize: number = 40;
  private gridOffset: number = 20;
  private arrow_black: HTMLImageElement;
  private arrow_white: HTMLImageElement;

  constructor(canvas: ElementRef<HTMLCanvasElement>) {
    this.arrow_black = new Image();
    this.arrow_black.src = 'assets/arrow_black.svg';
    this.arrow_white = new Image();
    this.arrow_white.src = 'assets/arrow_white.svg';

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
            let arrow;
            if (board.cboard[i][j].color == 'black') {
              this.render_ctx.fillStyle = 'white';
              arrow = this.arrow_white;
            }
            else {
              this.render_ctx.fillStyle = 'black';
              arrow = this.arrow_black;
            }
            this.render_ctx.font = `${this.cellSize / 2}px Arial`;
            let textMeasures = this.render_ctx.measureText(`${board.cboard[i][j].walls}`);
            let textWidth = textMeasures.width;
            let textHeight = textMeasures.actualBoundingBoxAscent;
            let textX: number;
            let textY: number;
            if (board.cboard[i][j].direction == 'right') {
              let arrowWidth = this.cellSize / 2;
              let arrowHeight = this.cellSize / 4;
              let arrowX = Math.floor((this.cellSize - arrowWidth) / 2);
              let arrowY = Math.floor((this.cellSize - arrowHeight - textHeight) / 2);
              textX = Math.floor((this.cellSize - textWidth) / 2);
              textY = Math.floor((this.cellSize + arrowHeight + textHeight) / 2);
              this.drawRotated(arrow, this.gridOffset + j * this.cellSize + arrowX, this.gridOffset + i * this.cellSize + arrowY, arrowWidth, arrowHeight, 0);
            } else if (board.cboard[i][j].direction == 'left') {
              let arrowWidth = this.cellSize / 2;
              let arrowHeight = this.cellSize / 4;
              let arrowX = Math.floor((this.cellSize + arrowWidth) / 2);
              let arrowY = Math.floor((this.cellSize + arrowHeight - textHeight) / 2);
              textX = Math.floor((this.cellSize - textWidth) / 2);
              textY = Math.floor((this.cellSize + arrowHeight + textHeight) / 2);
              this.drawRotated(arrow, this.gridOffset + j * this.cellSize + arrowX, this.gridOffset + i * this.cellSize + arrowY, arrowWidth, arrowHeight, Math.PI);
            } else if (board.cboard[i][j].direction == 'up') {
              let arrowWidth = this.cellSize / 4;
              let arrowHeight = this.cellSize / 2;
              let arrowX = Math.floor((this.cellSize + textWidth - arrowWidth) / 2);
              let arrowY = Math.floor((this.cellSize + arrowHeight) / 2);
              textX = Math.floor((this.cellSize - arrowWidth - textWidth) / 2);
              textY = Math.floor((this.cellSize + textHeight) / 2);
              this.drawRotated(arrow, this.gridOffset + j * this.cellSize + arrowX, this.gridOffset + i * this.cellSize + arrowY, arrowHeight, arrowWidth, -Math.PI / 2);
            } else if (board.cboard[i][j].direction == 'down') {
              let arrowWidth = this.cellSize / 4;
              let arrowHeight = this.cellSize / 2;
              let arrowX = Math.floor((this.cellSize + textWidth + arrowWidth) / 2);
              let arrowY = Math.floor((this.cellSize - arrowHeight) / 2);
              textX = Math.floor((this.cellSize - arrowWidth - textWidth) / 2);
              textY = Math.floor((this.cellSize + textHeight) / 2);
              this.drawRotated(arrow, this.gridOffset + j * this.cellSize + arrowX, this.gridOffset + i * this.cellSize + arrowY, arrowHeight, arrowWidth, Math.PI / 2);
            }
            this.render_ctx.fillText(`${board.cboard[i][j].walls}`, this.gridOffset + j * this.cellSize + textX, this.gridOffset + i * this.cellSize + textY);
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

  drawRotated(image: HTMLImageElement, posX: number, posY: number, width: number, height: number, angle: number): void {
    this.render_ctx.save();
    this.render_ctx.translate(posX, posY);
    this.render_ctx.rotate(angle);
    this.render_ctx.drawImage(image, 0, 0, width, height);
    this.render_ctx.restore();
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