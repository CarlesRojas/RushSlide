import { PieceType } from "@context/constants"
import { Movement, Piece } from "@context/types"
import { getMatrixFromLevel } from "@utils/boardTransformations"

export const getPieceMovement = (level: string, piece: Piece) => {
  const { horizontal, position, length } = piece
  const { row, column } = position

  const board = getMatrixFromLevel(level)
  const boardRow = board[row]
  if (!boardRow) throw new Error("Invalid board")

  let backwards = 0
  let forwards = 0

  let backIndex = (horizontal ? column : row) - 1
  while (true) {
    if (backIndex < 0) break
    const row = board[backIndex]
    if (!row) throw new Error("Invalid board")
    const backCell = horizontal ? boardRow[backIndex] : row[column]
    if (backCell === PieceType.EMPTY) backwards++
    else break

    backIndex--
  }

  let fordwardsIndex = (horizontal ? column : row) + (length === 3 ? 3 : 2)
  while (true) {
    if (fordwardsIndex >= (horizontal ? boardRow.length : board.length)) break
    const row = board[fordwardsIndex]
    if (!row) throw new Error("Invalid board")
    const fordwardsCell = horizontal ? boardRow[fordwardsIndex] : row[column]
    if (fordwardsCell === PieceType.EMPTY) forwards++
    else break

    fordwardsIndex++
  }

  const movement: Movement = {
    backwards,
    forwards,
  }

  return movement
}
