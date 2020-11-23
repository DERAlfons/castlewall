import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PuzzleService } from '../puzzle.service';
import { Board } from '../board';
import { BoardCanvas } from '../board-canvas';

@Component({
  selector: 'app-board-test',
  templateUrl: './board-test.component.html',
  styleUrls: ['./board-test.component.css']
})
export class BoardTestComponent implements OnInit {
  @ViewChild('canvasbg', { static: true })
  canvasbg: ElementRef<HTMLCanvasElement>;
  private boardCanvas: BoardCanvas;

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
      this.boardCanvas.render(this.board);
      this.canvasbg.nativeElement.addEventListener('mousedown', event => this.handleMousedown(event));
    });
  }

  loadFile(puzzleFile: File): void {
    let reader = new FileReader();
    reader.onload = (_) => {
      this.board = new Board(JSON.parse(reader.result as string));
      this.boardCanvas.render(this.board);
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
          this.board.update_wall_h(i, j);
        }
      }
    }
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height - 1; j++) {
        if (walls[`v_r${j}_c${i}`]) {
          this.board.update_wall_v(i, j);
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
        this.boardCanvas.render(this.board);
      }
      else {
        this.board.update_wall_v(px - 1, py - 2);
        this.boardCanvas.render(this.board);
      }
    }
    else {
      if (dx > 20 - dy) {
        this.board.update_wall_v(px - 1, py - 1);
        this.boardCanvas.render(this.board);
      }
      else {
        this.board.update_wall_h(py - 1, px - 2);
        this.boardCanvas.render(this.board);
      }
    }
  }
}