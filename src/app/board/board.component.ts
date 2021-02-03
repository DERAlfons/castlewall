import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PuzzleService } from '../puzzle.service';
import { Board } from '../board';
import { BoardCanvas } from '../board-canvas';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @ViewChild('canvasbg', { static: true })
  canvasbg: ElementRef<HTMLCanvasElement>;
  canvasWidth: number = 800;
  canvasHeight: number = 640;
  private boardCanvas: BoardCanvas;
  private cellSize: number = 40;
  private gridOffset: number = 20;

  private board: Board;
  public puzzleId: number;
  public puzzleTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private puzzleService: PuzzleService
  ) { }

  ngOnInit(): void {
    this.boardCanvas = new BoardCanvas(this.canvasbg);

    const id = +this.route.snapshot.paramMap.get('id');
    this.puzzleId = id;
    this.puzzleService.getPuzzle(id).subscribe(puzzle => {
      this.puzzleTitle = puzzle.title;
      this.board = new Board(puzzle);
      this.canvasWidth = this.board.width * this.cellSize + 2 * this.gridOffset;
      this.canvasHeight = this.board.height * this.cellSize + 2 * this.gridOffset;
      requestAnimationFrame(() => this.boardCanvas.render(this.board));
      this.canvasbg.nativeElement.addEventListener('contextmenu', event => event.preventDefault());
      this.canvasbg.nativeElement.addEventListener('mousedown', event => this.handleMousedown(event));
      this.canvasbg.nativeElement.addEventListener('mousemove', event => this.handleMousemove(event));
      this.canvasbg.nativeElement.addEventListener('mouseleave', event => this.handleMouseleave(event));
    });
  }

  loadFile(puzzleFile: File): void {
    let reader = new FileReader();
    reader.onload = (_) => {
      this.board = new Board(JSON.parse(reader.result as string));
      this.canvasWidth = this.board.width * this.cellSize + 2 * this.gridOffset;
      this.canvasHeight = this.board.height * this.cellSize + 2 * this.gridOffset;
      requestAnimationFrame(() => this.boardCanvas.render(this.board));
    };
    reader.readAsText(puzzleFile);
  }

  loadWalls(wallsFile: File): void {
    let reader = new FileReader();
    reader.onload = (_) => {
      this.createWalls(JSON.parse(reader.result as string));
      this.boardCanvas.render(this.board);
    };
    reader.readAsText(wallsFile);
  }

  createWalls(walls: any): void {
    let height = 0;
    while (walls[`h_r${height}_c0`] !== undefined) {
      height += 1;
    }
    let width = 0;
    while (walls[`v_r0_c${width}`] !== undefined) {
      width += 1;
    }

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width - 1; j++) {
        if (walls[`h_r${i}_c${j}`]) {
          this.board.update_wall_h(i, j, 0);
        }
      }
    }
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height - 1; j++) {
        if (walls[`v_r${j}_c${i}`]) {
          this.board.update_wall_v(i, j, 0);
        }
      }
    }
  }

  checkBtn(): void {
    if (this.board.check()) {
      alert('Your solution is correct :)');
    }
    else {
      alert('WRONG!');
    }
  }

  handleMousedown(event: MouseEvent): void {
    let px = Math.floor((event.offsetX - this.gridOffset) / this.cellSize);
    let py = Math.floor((event.offsetY - this.gridOffset) / this.cellSize);
    let dx = (event.offsetX - this.gridOffset) % this.cellSize;
    let dy = (event.offsetY - this.gridOffset) % this.cellSize;

    if (dx > dy) {
      if (dx > this.cellSize - dy) {
        this.board.update_wall_h(py, px, event.button);
      }
      else {
        this.board.update_wall_v(px, py - 1, event.button);
      }
    }
    else {
      if (dx > this.cellSize - dy) {
        this.board.update_wall_v(px, py, event.button);
      }
      else {
        this.board.update_wall_h(py, px - 1, event.button);
      }
    }

    this.boardCanvas.render(this.board);
  }

  handleMousemove(event: MouseEvent): void {
    let px = Math.floor((event.offsetX - this.gridOffset) / this.cellSize);
    let py = Math.floor((event.offsetY - this.gridOffset) / this.cellSize);
    let dx = (event.offsetX - this.gridOffset) % this.cellSize;
    let dy = (event.offsetY - this.gridOffset) % this.cellSize;

    if (dx > dy) {
      if (dx > this.cellSize - dy) {
        this.board.setSelectH(py, px);
        this.boardCanvas.render(this.board);
      }
      else {
        this.board.setSelectV(px, py - 1);
        this.boardCanvas.render(this.board);
      }
    }
    else {
      if (dx > this.cellSize - dy) {
        this.board.setSelectV(px, py);
        this.boardCanvas.render(this.board);
      }
      else {
        this.board.setSelectH(py, px - 1);
        this.boardCanvas.render(this.board);
      }
    }
  }

  handleMouseleave(event: MouseEvent): void {
    this.board.setSelectV(-1, -1);
    this.boardCanvas.render(this.board);
  }
}