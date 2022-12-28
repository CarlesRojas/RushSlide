import { ActiveBoardTypes, BoardType, MinMax } from "@context/types"
import { atom } from "jotai"

// BOARD
export const cellSizeAtom = atom(0)
export const landscapeAtom = atom(false)

// SETTINGS
export const activeBoardTypesAtom = atom<ActiveBoardTypes>({
  [BoardType.NORMAL]: true,
  [BoardType.ONE_WALL]: false,
  [BoardType.TWO_WALLS]: false,
})
export const difficultyAtom = atom<MinMax>({ min: 10, max: 20 })

// GAME
export const movingPieceAtom = atom(false)
export const movesAtom = atom({ moves: 0, minimumMoves: 0 })
export const victoryAtom = atom({
  victory: false,
  perfect: false,
})
