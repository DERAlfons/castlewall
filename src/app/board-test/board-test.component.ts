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
    [null, 'black', null, null, null, null, null, 'black', null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, 'white', null, null, 'black', null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, 'black', null, 'grey', null, null, null, null, null, null],
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
          this.hboard[i][j + 1] = 'blocked';
        }

        if (this.cboard[j][i] || this.cboard[j + 1][i]) {
          this.vboard[i][j + 1] = 'blocked';
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
          this.render_ctx.fillStyle = this.cboard[i][j];
          this.render_ctx.fillRect(20 + j * 20, 20 + i * 20, 20, 20);
          this.render_ctx.strokeStyle = 'black';
          this.render_ctx.lineWidth = 4;
          this.render_ctx.strokeRect(20 + j * 20, 20 + i * 20, 20, 20);
        }
      }
    }
  }

  handleMousedown(event: MouseEvent): void {
    let px = Math.floor(event.offsetX / 20);
    let py = Math.floor(event.offsetY / 20);
    let dx = event.offsetX % 20;
    let dy = event.offsetY % 20;

    if (dx > dy) {
      if (dx > 20 - dy) {
        if (!(this.hboard[py - 1][px])) {
          this.hboard[py - 1][px] = 'wall';
          this.connect(px, py, px + 1, py);
        }
        else if (this.hboard[py - 1][px] == 'wall') {
          this.hboard[py - 1][px] = null;
          this.disconnect(px, py, px + 1, py);
        }
      }
      else {
        if (!(this.vboard[px - 1][py - 1])) {
          this.vboard[px - 1][py - 1] = 'wall';
          this.connect(px, py - 1, px , py);
        }
        else if (this.vboard[px - 1][py - 1] == 'wall') {
          this.vboard[px - 1][py - 1] = null;
          this.disconnect(px, py - 1, px, py);
        }
      }
    }
    else {
      if (dx > 20 - dy) {
        if (!(this.vboard[px - 1][py])) {
          this.vboard[px - 1][py] = 'wall';
          this.connect(px, py, px, py + 1);
        }
        else if (this.vboard[px - 1][py] == 'wall') {
          this.vboard[px - 1][py] = null;
          this.disconnect(px, py, px, py + 1);
        }
      }
      else {
        if (!(this.hboard[py - 1][px - 1])) {
          this.hboard[py - 1][px - 1] = 'wall';
          this.connect(px - 1, py, px, py);
        }
        else if (this.hboard[py - 1][px - 1] == 'wall') {
          this.hboard[py - 1][px - 1] = null;
          this.disconnect(px - 1, py, px, py);
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