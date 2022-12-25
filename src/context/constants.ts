import { BoardType } from "./types"

export const GRID_SIZE = 6

export const MIN_DIFFICULTY = 1
export const MAX_DIFFICULTY = 60

export const POSSIBLE_MOVES: { [key in BoardType]: number[] } = {
  [BoardType.NORMAL]: Array.from(Array(52).keys()).slice(1),
  [BoardType.ONE_WALL]: [...Array.from(Array(51).keys()).slice(3), 52, 53, 54, 55, 60],
  [BoardType.TWO_WALLS]: [...Array.from(Array(56).keys()).slice(4), 58],
}

export const BOARD_TYPE_FOLDER: { [key in BoardType]: string } = {
  [BoardType.NORMAL]: "normal",
  [BoardType.ONE_WALL]: "oneWall",
  [BoardType.TWO_WALLS]: "twoWalls",
}
