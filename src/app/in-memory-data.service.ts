import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Puzzle } from './puzzle';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const puzzles: Puzzle[] = [
      { id:  1, title: 'Testpuzzle', s_representation: '?', width: 10, height: 10,
        hints: [
          { hint: { color: 'black', direction: 'down', walls: 2 },
            position: { i: 0, j: 1} },
          { hint: { color: 'black', direction: 'left', walls: 2 },
            position: { i: 0, j: 7 } },
          { hint: { color: 'white', direction: 'up', walls: 1 },
            position: { i: 4, j: 4 } },
          { hint: { color: 'black', direction: 'up', walls: 1 },
            position: { i: 4, j: 7 } },
          { hint: { color: 'black', direction: 'right', walls: 3 },
            position: { i: 7, j: 1 } },
          { hint: { color: 'grey', direction: 'up', walls: 2 },
            position: { i: 7, j: 3 } }
        ] },
      { id:  2, title: 'Trivial Example', s_representation: '0b00bl1n0000bl1', width: 5, height: 2,
        hints: [
          { hint: { color: 'black', direction: null, walls: null },
            position: { i: 0, j: 1 } },
          { hint: { color: 'black', direction: 'left', walls: 1 },
            position: { i: 0, j: 4 } },
          { hint: { color: 'black', direction: 'left', walls: 1 },
            position: { i: 1, j: 4 } }
        ] },
      {id: 3,title:'VanillaIce',s_representation:'?',width:13,height:13,hints:[{hint:{color:'black',direction:'left',walls:3},position:{i:0,j:8}},{hint:{color:'black',direction:null,walls:null},position:{i:0,j:12}},{hint:{color:'black',direction:'right',walls:2},position:{i:1,j:3}},{hint:{color:'black',direction:null,walls:null},position:{i:1,j:12}},{hint:{color:'white',direction:'left',walls:1},position:{i:2,j:5}},{hint:{color:'black',direction:'left',walls:2},position:{i:2,j:12}},{hint:{color:'white',direction:'up',walls:1},position:{i:3,j:5}},{hint:{color:'grey',direction:null,walls:null},position:{i:3,j:9}},{hint:{color:'black',direction:'left',walls:2},position:{i:3,j:12}},{hint:{color:'white',direction:'left',walls:1},position:{i:4,j:7}},{hint:{color:'black',direction:'left',walls:2},position:{i:4,j:12}},{hint:{color:'white',direction:'up',walls:1},position:{i:5,j:7}},{hint:{color:'black',direction:'left',walls:1},position:{i:6,j:9}},{hint:{color:'white',direction:'up',walls:4},position:{i:6,j:11}},{hint:{color:'black',direction:'up',walls:2},position:{i:7,j:9}},{hint:{color:'white',direction:'left',walls:3},position:{i:7,j:11}},{hint:{color:'white',direction:'left',walls:1},position:{i:8,j:11}},{hint:{color:'white',direction:'left',walls:3},position:{i:9,j:11}},{hint:{color:'white',direction:'up',walls:1},position:{i:10,j:1}},{hint:{color:'grey',direction:'up',walls:1},position:{i:10,j:3}},{hint:{color:'grey',direction:'up',walls:2},position:{i:10,j:5}},{hint:{color:'grey',direction:'up',walls:2},position:{i:10,j:7}},{hint:{color:'white',direction:'up',walls:3},position:{i:10,j:9}},{hint:{color:'white',direction:null,walls:null},position:{i:10,j:11}},{hint:{color:'black',direction:'up',walls:8},position:{i:12,j:0}},{hint:{color:'black',direction:null,walls:null},position:{i:12,j:1}},{hint:{color:'black',direction:'up',walls:5},position:{i:12,j:2}},{hint:{color:'black',direction:null,walls:null},position:{i:12,j:3}},{hint:{color:'black',direction:'up',walls:6},position:{i:12,j:4}},{hint:{color:'black',direction:null,walls:null},position:{i:12,j:5}},{hint:{color:'black',direction:'up',walls:4},position:{i:12,j:6}},{hint:{color:'black',direction:null,walls:null},position:{i:12,j:7}},{hint:{color:'black',direction:'up',walls:4},position:{i:12,j:8}},{hint:{color:'black',direction:null,walls:null},position:{i:12,j:9}},{hint:{color:'black',direction:null,walls:null},position:{i:12,j:10}},{hint:{color:'black',direction:null,walls:null},position:{i:12,j:11}},{hint:{color:'black',direction:null,walls:null},position:{i:12,j:12}}]},
      {id: 4,title:'Ken Endo',s_representation:'?',width:10,height:10,hints:[{hint:{color:'black',direction:null,walls:null},position:{i:0,j:0}},{hint:{color:'black',direction:'down',walls:1},position:{i:0,j:1}},{hint:{color:'black',direction:'down',walls:2},position:{i:0,j:2}},{hint:{color:'black',direction:'down',walls:4},position:{i:0,j:3}},{hint:{color:'black',direction:'down',walls:6},position:{i:0,j:4}},{hint:{color:'black',direction:'down',walls:1},position:{i:0,j:5}},{hint:{color:'black',direction:'down',walls:2},position:{i:0,j:6}},{hint:{color:'black',direction:'down',walls:5},position:{i:0,j:7}},{hint:{color:'black',direction:'down',walls:2},position:{i:0,j:8}},{hint:{color:'black',direction:'down',walls:3},position:{i:0,j:9}},{hint:{color:'black',direction:'right',walls:1},position:{i:1,j:0}},{hint:{color:'black',direction:'right',walls:4},position:{i:2,j:0}},{hint:{color:'black',direction:'right',walls:3},position:{i:3,j:0}},{hint:{color:'black',direction:'right',walls:6},position:{i:4,j:0}},{hint:{color:'black',direction:'right',walls:1},position:{i:5,j:0}},{hint:{color:'white',direction:null,walls:null},position:{i:5,j:5}},{hint:{color:'black',direction:'right',walls:2},position:{i:6,j:0}},{hint:{color:'black',direction:'right',walls:5},position:{i:7,j:0}},{hint:{color:'black',direction:'right',walls:2},position:{i:8,j:0}},{hint:{color:'black',direction:'right',walls:2},position:{i:9,j:0}}]},
    ];
    return { puzzles };
  }

  genId(puzzles: Puzzle[]): number {
    return puzzles.length > 0 ? Math.max(...puzzles.map(puzzle => puzzle.id)) + 1 : 1;
  }
}
