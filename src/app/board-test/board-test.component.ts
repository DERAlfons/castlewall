import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { PuzzleService } from '../puzzle.service';
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

  constructor(private puzzleService: PuzzleService) { }

  ngOnInit(): void {
    this.render_ctx = this.canvasbg.nativeElement.getContext('2d');
    this.puzzleService.getPuzzle(2).subscribe(puzzle => {
      this.board = new Board(puzzle);
      this.render();
      this.canvasbg.nativeElement.addEventListener('mousedown', event => this.handleMousedown(event));
    });
  }

  render(): void {
    this.render_ctx.clearRect(0, 0, this.canvasbg.nativeElement.width, this.canvasbg.nativeElement.height);

    this.render_ctx.fillStyle = 'red';
    this.render_ctx.fillRect(10, 10, 20, 20);

    for (let i = 0; i <= this.board.width; i++) {
      this.render_ctx.beginPath();
      this.render_ctx.strokeStyle = 'black';
      this.render_ctx.lineWidth = 2;
      this.render_ctx.moveTo(20 + i * 20, 20);
      this.render_ctx.lineTo(20 + i * 20, 220);
      this.render_ctx.stroke();
      this.render_ctx.closePath();
    }
    for (let i = 0; i <= this.board.height; i++) {
      this.render_ctx.beginPath();
      this.render_ctx.strokeStyle = 'black';
      this.render_ctx.lineWidth = 2;
      this.render_ctx.moveTo(20, 20 + i * 20);
      this.render_ctx.lineTo(220, 20 + i * 20);
      this.render_ctx.stroke();
      this.render_ctx.closePath();
    }

    for (let i = 0; i < this.board.height; i++) {
      for (let j = 0; j < this.board.width; j++) {
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

    for (let i = 0; i < this.board.width; i++) {
      for (let j = 0; j < this.board.height - 1; j++) {
        if (this.board.vboard[i][j] == 'wall') {
          this.connect(i + 1, j + 1, i + 1, j + 2);
        }
      }
    }
    for (let i = 0; i < this.board.height; i++) {
      for (let j = 0; j < this.board.width - 1; j++) {
        if (this.board.hboard[i][j] == 'wall') {
          this.connect(j + 1, i + 1, j + 2, i + 1);
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

    if (dx > dy) {
      if (dx > 20 - dy) {
        this.board.update_wall_h(py - 1, px - 1);
        this.render();
      }
      else {
        this.board.update_wall_v(px - 1, py - 2);
        this.render();
      }
    }
    else {
      if (dx > 20 - dy) {
        this.board.update_wall_v(px - 1, py - 1);
        this.render();
      }
      else {
        this.board.update_wall_h(py - 1, px - 2);
        this.render();
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