import { BoardType } from "@context/types"
import { atom } from "jotai"

// BOARD
export const cellSizeAtom = atom(0)

// SETTINGS
export const activeBoardTypesAtom = atom<{ [key in BoardType]: boolean }>({
  [BoardType.NORMAL]: true,
  [BoardType.ONE_WALL]: true,
  [BoardType.TWO_WALLS]: true,
})

export const difficultyAtom = atom({ min: 1, max: 60 })
