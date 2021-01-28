import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Puzzle } from './puzzle';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  private apiUrl = 'https://monolithicalstone.xyz';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService
  ) { }

  getPuzzles(): Observable<Puzzle[]> {
    const url = `${this.apiUrl}/read`;
    return this.http.get<Puzzle[]>(url)
      .pipe(
        tap(_ => this.log('fetched puzzles')),
        catchError(this.handleError<Puzzle[]>('getPuzzles', []))
      );
  }

  getPuzzle(id: number): Observable<Puzzle> {
    const url = `${this.apiUrl}/read/${id}`;
    return this.http.get<Puzzle>(url)
      .pipe(
        tap(_ => this.log(`fetched puzzle id=${id}`)),
        catchError(this.handleError<Puzzle>(`getPuzzle id=${id}`))
      )
  }

  addPuzzle(puzzle: Puzzle, accessCode: string): Observable<Puzzle> {
    const url = `${this.apiUrl}/add`;
    return this.http.post<Puzzle>(url, { puzzle: puzzle, accessCode: accessCode }, this.httpOptions)
      .pipe(
        tap((newPuzzle: Puzzle) => this.log(`added puzzle w/ id=${newPuzzle.id}`)),
        catchError(this.handleError<Puzzle>('addPuzzle'))
      );
  }

  checkPuzzleStatus(id: number): Observable<{ status: string }> {
    const url = `${this.apiUrl}/checkstatus/${id}`;
    return this.http.get<{ status: string }>(url)
      .pipe(
        tap(response => this.log(`Status of check: ${response.status}`)),
        catchError(this.handleError<{ status: string }>('checkPuzzleStatus'))
      );
  }

  private log(message: string): void {
    this.messagesService.add(`PuzzleService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error); // TODO: log error in logging framework

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}
