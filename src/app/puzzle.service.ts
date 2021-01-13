import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Puzzle } from './puzzle';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService
  ) { }

  private log(message: string) {
    this.messagesService.add(`PuzzleService: ${message}`);
  }

  private puzzlesUrl = 'api/puzzles';
  private testUrl = 'http://monolithicalstone.xyz:8000/sqltest';
  private readUrl = 'http://monolithicalstone.xyz:8000/read';
  private checkUrl = 'http://monolithicalstone.xyz:8000/check';

  getPuzzles(): Observable<Puzzle[]> {
    return this.http.get<Puzzle[]>(this.readUrl)
      .pipe(
        tap(_ => this.log('fetched puzzles')),
        catchError(this.handleError<Puzzle[]>('getPuzzles', []))
      );
  }

  getPuzzle(id: number): Observable<Puzzle> {
    const url = `${this.readUrl}/${id}`;
    return this.http.get<Puzzle>(url)
      .pipe(
        tap(_ => this.log(`fetched puzzle id=${id}`)),
        catchError(this.handleError<Puzzle>(`getPuzzle id=${id}`))
      )
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  updatePuzzle(puzzle: Puzzle): Observable<any> {
    return this.http.put(this.puzzlesUrl, puzzle, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated puzzle id=${puzzle.id}`)),
        catchError(this.handleError<any>('updatePuzzle'))
      );
  }

  addPuzzle(puzzle: Puzzle, accessCode: string): Observable<Puzzle> {
    return this.http.post<Puzzle>(this.testUrl, { puzzle: puzzle, accessCode: accessCode }, this.httpOptions)
      .pipe(
        tap((newPuzzle: Puzzle) => this.log(`added puzzle w/ id=${newPuzzle.id}`)),
        catchError(this.handleError<Puzzle>('addPuzzle'))
      );
  }

  checkPuzzle(id: number): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(`${this.checkUrl}/${id}`)
      .pipe(
        tap(response => this.log(`Status of check: ${response.status}`)),
        catchError(this.handleError<{ status: string }>('checkPuzzle'))
      );
  }

  deletePuzzle(puzzle: Puzzle | number): Observable<Puzzle> {
    const id = typeof puzzle === 'number' ? puzzle : puzzle.id;
    const url = `${this.puzzlesUrl}/${id}`;

    return this.http.delete<Puzzle>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted puzzle id=${id}`)),
        catchError(this.handleError<Puzzle>('deletePuzzle'))
      );
  }

  searchPuzzles(term: string): Observable<Puzzle[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Puzzle[]>(`${this.puzzlesUrl}/?title=${term}`)
      .pipe(
        tap(x => x.length ?
          this.log(`found puzzles matching "${term}"`) :
          this.log(`no puzzles matching "${term}"`)),
        catchError(this.handleError<Puzzle[]>('searchPuzzles', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // TODO: log error in logging framework

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}
