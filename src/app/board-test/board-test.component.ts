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

  constructor() { }

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
  }

  handleMousedown(event: MouseEvent) {
    let px = Math.floor(event.offsetX / 20);
    let py = Math.floor(event.offsetY / 20);
    let dx = event.offsetX % 20;
    let dy = event.offsetY % 20;

    if (dx > dy) {
      if (dx > 20 - dy) {
        this.connect(px, py, px + 1, py);
      }
      else {
        this.connect(px, py - 1, px , py);
      }
    }
    else {
      if (dx > 20 - dy) {
        this.connect(px, py, px, py + 1);
      }
      else {
        this.connect(px - 1, py, px, py);
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