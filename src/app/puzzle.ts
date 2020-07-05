import { Indices } from './util';
import { WallHint } from './wall-hint';

export interface Puzzle {
    id: number;
    title: string;

    width: number;
    height: number;

    hints: { hint: WallHint, position: Indices }[];

    s_representation: string;
}