import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-angular-intro',
    templateUrl: './angular-intro.component.html',
    styleUrls: ['./angular-intro.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AngularIntroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title: 'Castlewall';
}
