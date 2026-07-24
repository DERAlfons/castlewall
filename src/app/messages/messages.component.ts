import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { MessagesService } from '../messages.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class MessagesComponent implements OnInit {

  constructor(public messagesService: MessagesService) { }

  ngOnInit(): void {
  }

}
