import { Component, ChangeDetectionStrategy } from '@angular/core';

import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent {
  public title: string = 'Castle Wall';
  public production: boolean = environment.production;
}
