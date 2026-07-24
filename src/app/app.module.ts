import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularIntroComponent } from './angular-intro/angular-intro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InMemoryDataService } from './in-memory-data.service';
import { BoardComponent } from './board/board.component';
import { EditorComponent } from './editor/editor.component'

@NgModule({ declarations: [
        AppComponent,
        PuzzlesComponent,
        MessagesComponent,
        AngularIntroComponent,
        DashboardComponent,
        BoardComponent,
        EditorComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false, passThruUnknownUrl: true })], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
