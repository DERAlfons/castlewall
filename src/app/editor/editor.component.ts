import { PuzzleService } from '../puzzle.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EditBoard } from '../edit-board';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @ViewChild('canvasbg', { static: true })
  canvasbg: ElementRef<HTMLCanvasElement>;
  menuActive: boolean = false;
  editPositionX: number;
  editPositionY: number;
  menuPositionX: string = '0px';
  menuPositionY: string = '0px';
  editWidth: string;
  editHeight: string;
  editColor: string;
  editDirection: string;
  board: EditBoard = new EditBoard({ id: null, title: 'Editor', s_representation: '?', width: 10, height: 10, hints: [] });
  puzzleDownload: SafeResourceUrl;

  private render_ctx: CanvasRenderingContext2D;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private puzzleService: PuzzleService)
  {
    this.updatePuzzleDownload();
  }

  ngOnInit(): void {
    this.render_ctx = this.canvasbg.nativeElement.getContext('2d');

    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
      this.editWidth = String(this.board.width);
      this.editHeight = String(this.board.height);
      this.render();
      this.canvasbg.nativeElement.addEventListener('mousedown', event => this.handleMousedown(event));
    }
    else {
      this.puzzleService.getPuzzle(+id).subscribe(puzzle => {
        this.board = new EditBoard(puzzle);
        this.updatePuzzleDownload();
        this.editWidth = String(this.board.width);
        this.editHeight = String(this.board.height);
        this.render();
        this.canvasbg.nativeElement.addEventListener('mousedown', event => this.handleMousedown(event));
      });
    }
  }

  updatePuzzleDownload(): void {
    this.puzzleDownload = this.sanitizer.bypassSecurityTrustUrl(`data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(this.board.toPuzzle()))}`);
  }

  updateWidth(): void {
    this.board.updateWidth(+this.editWidth);
    this.render();
    this.updatePuzzleDownload();
  }

  updateHeight(): void {
    this.board.updateHeight(+this.editHeight);
    this.render();
    this.updatePuzzleDownload();
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
      this.render_ctx.lineTo(20 + i * 20, 20 + this.board.height * 20);
      this.render_ctx.stroke();
      this.render_ctx.closePath();
    }
    for (let i = 0; i <= this.board.height; i++) {
      this.render_ctx.beginPath();
      this.render_ctx.strokeStyle = 'black';
      this.render_ctx.lineWidth = 2;
      this.render_ctx.moveTo(20, 20 + i * 20);
      this.render_ctx.lineTo(20 + this.board.width * 20, 20 + i * 20);
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

  connect(x1: number, y1: number, x2: number, y2: number): void {
    this.render_ctx.beginPath();
    this.render_ctx.strokeStyle = 'green';
    this.render_ctx.lineWidth = 2;
    this.render_ctx.moveTo(10 + x1 * 20, 10 + y1 * 20);
    this.render_ctx.lineTo(10 + x2 * 20, 10 + y2 * 20);
    this.render_ctx.stroke();
    this.render_ctx.closePath();
  }

  handleMousedown(event: MouseEvent): void {
    console.log('canvas mousedown');
    let px = Math.floor(event.offsetX / 20) - 1;
    let py = Math.floor(event.offsetY / 20) - 1;
    if (px >= 0 && px < this.board.width && py >= 0 && py < this.board.height) {
      this.editPositionX = px;
      this.editPositionY = py;
      this.menuPositionX = `${30 + 20 * px}px`;
      this.menuPositionY = `${30 + 20 * py}px`;
      this.menuActive = true;
    }
  }

  addHint(walls: number): void {
    console.log(`adding Hint: color=${this.editColor}, direction=${this.editDirection}, walls=${walls}`);

    if (this.editColor && this.editColor != 'nocolor') {
      if (this.editDirection && this.editDirection != 'nodirection') {
        this.board.cboard[this.editPositionY][this.editPositionX] = { color: this.editColor, direction: this.editDirection, walls: walls };
      }
      else {
        this.board.cboard[this.editPositionY][this.editPositionX] = { color: this.editColor, direction: null, walls: null };
      }
    }
    else {
      this.board.cboard[this.editPositionY][this.editPositionX] = null;
    }

    this.menuActive = false;

    this.render();

    this.updatePuzzleDownload();
  }

  closeHintMenu(): void {
    this.menuActive = false;
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    let puzzle = this.board.toPuzzle();
    puzzle.title = title;
    this.puzzleService.addPuzzle(puzzle).subscribe();
  }
}