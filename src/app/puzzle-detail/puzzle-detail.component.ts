import { Component, OnInit, Input } from '@angular/core';
import { Puzzle } from '../puzzle';

@Component({
  selector: 'app-puzzle-detail',
  templateUrl: './puzzle-detail.component.html',
  styleUrls: ['./puzzle-detail.component.css']
})
export class PuzzleDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  puzzle: Puzzle;
}
