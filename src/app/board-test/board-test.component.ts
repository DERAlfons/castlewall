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
    this.canvasbg.nativeElement.addEventListener('mousedown', _ => this.render());
    //requestAnimationFrame(() => this.render());
  }

  render(): void {
    this.render_ctx.fillStyle = 'red';
    this.render_ctx.fillRect(10, 10, 20, 20);
  }
}
