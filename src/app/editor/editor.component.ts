import { PuzzleService } from '../puzzle.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { EditBoard } from '../edit-board';
import { BoardCanvas } from '../board-canvas';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @ViewChild('canvasbg', { static: true })
  canvasbg: ElementRef<HTMLCanvasElement>;
  canvasWidth: number = 800;
  canvasHeight: number = 640;
  checkStatus: string = 'edit';
  accessCode: string;
  menuActive: boolean = false;
  editPositionX: number;
  editPositionY: number;
  menuPositionX: string = '0px';
  menuPositionY: string = '0px';
  editWidth: string;
  editHeight: string;
  editColor: string = 'black';
  editDirection: string = 'nodirection';
  editWalls: string = '0';
  board: EditBoard = new EditBoard({ id: null, title: 'Editor', s_representation: '?', width: 10, height: 10, hints: [] });
  puzzleDownload: SafeResourceUrl;

  private boardCanvas: BoardCanvas;
  private cellSize: number = 40;
  private gridOffset: number = 20;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private puzzleService: PuzzleService)
  {
    this.updatePuzzleDownload();
  }

  ngOnInit(): void {
    this.boardCanvas = new BoardCanvas(this.canvasbg);

    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
      this.editWidth = String(this.board.width);
      this.editHeight = String(this.board.height);
      this.canvasWidth = this.board.width * this.cellSize + 2 * this.gridOffset;
      this.canvasHeight = this.board.width * this.cellSize + 2 * this.gridOffset;
      requestAnimationFrame(() => this.boardCanvas.render(this.board));
      this.canvasbg.nativeElement.addEventListener('mousedown', event => this.handleMousedown(event));
    }
    else {
      this.puzzleService.getPuzzle(+id).subscribe(puzzle => {
        this.board = new EditBoard(puzzle);
        this.updatePuzzleDownload();
        this.editWidth = String(this.board.width);
        this.editHeight = String(this.board.height);
        this.canvasWidth = this.board.width * this.cellSize + 2 * this.gridOffset;
        this.canvasHeight = this.board.height * this.cellSize + 2 * this.gridOffset;
        requestAnimationFrame(() => this.boardCanvas.render(this.board));
        this.canvasbg.nativeElement.addEventListener('mousedown', event => this.handleMousedown(event));
      });
    }
  }

  updatePuzzleDownload(): void {
    this.puzzleDownload = this.sanitizer.bypassSecurityTrustUrl(`data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(this.board.toPuzzle()))}`);
  }

  updateWidth(): void {
    this.board.updateWidth(+this.editWidth);
    this.canvasWidth = this.board.width * this.cellSize + 2 * this.gridOffset;
    requestAnimationFrame(() => this.boardCanvas.render(this.board));
    this.updatePuzzleDownload();
  }

  updateHeight(): void {
    this.board.updateHeight(+this.editHeight);
    this.canvasHeight = this.board.height * this.cellSize + 2 * this.gridOffset;
    requestAnimationFrame(() => this.boardCanvas.render(this.board));
    this.updatePuzzleDownload();
  }

  handleMousedown(event: MouseEvent): void {
    console.log('canvas mousedown');
    let px = Math.floor((event.offsetX - this.gridOffset) / this.cellSize);
    let py = Math.floor((event.offsetY - this.gridOffset) / this.cellSize);
    if (px >= 0 && px < this.board.width && py >= 0 && py < this.board.height) {
      this.editPositionX = px;
      this.editPositionY = py;
      if (this.board.cboard[this.editPositionY][this.editPositionX]) {
        this.editColor = this.board.cboard[this.editPositionY][this.editPositionX].color;
        if (this.board.cboard[this.editPositionY][this.editPositionX].direction) {
          this.editDirection = this.board.cboard[this.editPositionY][this.editPositionX].direction;
          this.editWalls = String(this.board.cboard[this.editPositionY][this.editPositionX].walls);
        }
        else {
          this.editDirection = 'nodirection';
          this.editWalls = '0';
        }
      }
      else {
        this.editColor = 'black';
        this.editDirection = 'nodirection';
        this.editWalls = '0';
      }
      this.menuPositionX = `${this.gridOffset + this.cellSize * px + this.cellSize / 2}px`;
      this.menuPositionY = `${this.gridOffset + this.cellSize * py + this.cellSize / 2}px`;
      this.menuActive = true;
    }
  }

  addHint(): void {
    console.log(`adding Hint: color=${this.editColor}, direction=${this.editDirection}, walls=${this.editWalls}`);

    if (this.editDirection && this.editDirection != 'nodirection') {
      this.board.cboard[this.editPositionY][this.editPositionX] = { color: this.editColor, direction: this.editDirection, walls: +this.editWalls };
    }
    else {
      this.board.cboard[this.editPositionY][this.editPositionX] = { color: this.editColor, direction: null, walls: null };
    }

    this.menuActive = false;

    this.boardCanvas.render(this.board);

    this.updatePuzzleDownload();
  }

  deleteHint(): void {
    this.board.cboard[this.editPositionY][this.editPositionX] = null;

    this.menuActive = false;
    
    this.boardCanvas.render(this.board);

    this.updatePuzzleDownload();
  }

  closeHintMenu(): void {
    this.menuActive = false;
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { 
      alert('Title can not be empty');
      return;
    }

    let puzzle = this.board.toPuzzle();
    puzzle.title = title;

    this.checkStatus = 'progress';
    this.puzzleService.addPuzzle(puzzle, this.accessCode).subscribe(checkPuzzle => {
      this.pollCheck(checkPuzzle.id);
    });
  }

  pollCheck(id: number): void {
    this.puzzleService.checkPuzzleStatus(id).subscribe(response => {
      if (response.status == 'progress') {
        setTimeout(() => {
          this.pollCheck(id);
        }, 3000);
      }
      else {
        this.checkStatus = response.status;
      }
    });
  }
}