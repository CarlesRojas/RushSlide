import { BoardState, Piece } from "@context/types"
import { getLevelFromBoardState } from "@utils/boardTransformations"
import { getPieceMovement } from "@utils/getPieceMovement"
import cloneDeep from "lodash/cloneDeep"
import uuid from "react-uuid"

export const movePiece = (boardState: BoardState, piece: Piece, ammount: number) => {
  if (
    ammount === 0 ||
    (ammount > 0 && ammount > piece.movement.forwards) ||
    (ammount < 0 && ammount < -piece.movement.backwards)
  )
    throw new Error("Invalid movement")

  const newBoardState = cloneDeep(boardState)
  for (const piece of newBoardState.pieces) piece.id = uuid()

  const newPiece = newBoardState.pieces.find(
    (p) => p.position.row === piece.position.row && p.position.column === piece.position.column,
  )

  if (!newPiece) throw new Error("Invalid piece")

  if (newPiece.horizontal) newPiece.position.column += ammount
  else newPiece.position.row += ammount

  newBoardState.board = getLevelFromBoardState(newBoardState)

  for (const piece of newBoardState.pieces) {
    const movement = getPieceMovement(newBoardState.board, piece)
    piece.movement = movement
  }

  return newBoardState
}
