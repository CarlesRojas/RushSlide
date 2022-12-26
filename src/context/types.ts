export enum BoardType {
  NORMAL = "normal",
  ONE_WALL = "one_wall",
  TWO_WALLS = "two_walls",
}

export interface Piece {
  horizontal: boolean
  length: 2 | 3
  position: {
    row: number
    column: number
  }
  red: boolean
  movement: Movement
}

export interface Wall {
  position: {
    row: number
    column: number
  }
}

export interface BoardState {
  pieces: Piece[]
  walls: Wall[]
  board: string
}

export interface Movement {
  backwards: number
  forwards: number
}

export type Levels = { [key: number]: string }

export type ActiveBoardTypes = { [key in BoardType]: boolean }

export type MinMax = { min: number; max: number }
