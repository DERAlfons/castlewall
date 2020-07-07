import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @ViewChild('canvasbg', { static: true })
  canvasbg: ElementRef<HTMLCanvasElement>;
  menuActive: boolean = false;
  positionX: string = '0px';
  positionY: string = '0px';

  constructor() { }

  ngOnInit(): void {
    this.canvasbg.nativeElement.addEventListener('mousedown', event => this.handleMousedown(event));
  }

  handleMousedown(event: MouseEvent): void {
    console.log('canvas mousedown');
    this.positionX = `${event.offsetX}px`;
    this.positionY = `${event.offsetY}px`;
    this.menuActive = true;
  }

  addHint(color: string, direction: string, walls: number): void {
    console.log(`adding Hint: color=${color}, direction=${direction}, walls=${walls}`);
    this.menuActive = false;
  }

  closeHintMenu(): void {
    this.menuActive = false;
  }
}
