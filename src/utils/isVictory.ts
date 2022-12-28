import { BoardState } from "@context/types"

export const isVictory = (boardState: BoardState, numberOfMovesMade: number) => {
  const { pieces } = boardState

  for (const piece of pieces) {
    const { red, position } = piece
    if (red && position.column === 4) return { victory: true, perfect: numberOfMovesMade <= boardState.minimumMoves }
    if (red) break
  }

  return { victory: false, perfect: false }
}
