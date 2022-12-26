import { PieceType } from "@context/constants"
import { BoardState, Piece, Wall } from "@context/types"
import { getPieceMovement } from "@utils/getPieceMovement"
import uuid from "react-uuid"

export const getBoardStateFromLevel = (level: string): BoardState => {
  const boardState: BoardState = {
    pieces: [],
    walls: [],
    board: level,
  }

  const board = getMatrixFromLevel(level)
  const ignoredCharacters: string[] = []

  for (let row = 0; row < board.length; row++) {
    const boardRow = board[row]
    if (!boardRow) throw new Error("Invalid board")

    for (let column = 0; column < boardRow.length; column++) {
      const cell = boardRow[column]
      if (!cell) throw new Error("Invalid board")

      if (cell === PieceType.EMPTY || ignoredCharacters.includes(cell)) continue

      if (cell === PieceType.WALL) {
        const wall: Wall = {
          position: { row, column },
        }
        boardState.walls.push(wall)
        continue
      }

      const horizontal = column + 1 < boardRow.length && boardRow[column + 1] === cell
      const triple = horizontal
        ? column + 2 < boardRow.length && boardRow[column + 2] === cell
        : row + 2 < board.length && board[row + 2] && (board[row + 2] as string[])[column] === cell

      const piece: Piece = {
        id: uuid(),
        horizontal,
        length: triple ? 3 : 2,
        position: { row, column },
        red: cell === PieceType.RED,
        movement: { backwards: 0, forwards: 0 },
      }

      const movement = getPieceMovement(level, piece)
      piece.movement = movement

      ignoredCharacters.push(cell)
      boardState.pieces.push(piece)
    }
  }

  return boardState
}

export const getLevelFromBoardState = (boardState: BoardState) => {
  const { pieces, walls } = boardState

  const board = Array.from({ length: 6 }, () => Array.from({ length: 6 }, () => "o"))
  const availableCharacters = "ZYXWVUTSRQPONMLKJIHGFEDCB".split("")

  pieces.forEach((piece) => {
    const { horizontal, length, position, red } = piece

    const letter = red ? PieceType.RED : (availableCharacters.pop() as string)

    if (horizontal)
      for (let i = 0; i < length; i++) {
        const row = board[position.row]
        if (!row) throw new Error("Invalid board")
        row[position.column + i] = letter
      }
    else
      for (let i = 0; i < length; i++) {
        const row = board[position.row + i]
        if (!row) throw new Error("Invalid board")
        row[position.column] = letter
      }
  })

  walls.forEach((wall) => {
    const { position } = wall
    const row = board[position.row]
    if (!row) throw new Error("Invalid board")
    row[position.column] = PieceType.WALL
  })

  return getLevelFromMatrix(board)
}

export const getLevelFromMatrix = (matrix: string[][]) => {
  return matrix.reduce((acc, row) => acc + row.join(""), "")
}

export const getMatrixFromLevel = (level: string) => {
  const levelArray = level.split("")
  const matrix = []
  for (let i = 0; i < levelArray.length; i += 6) matrix.push(levelArray.slice(i, i + 6))

  return matrix
}
