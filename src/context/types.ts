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
}

export type BoardState = Piece[]

export type Levels = { [key: number]: string }
