import { LocalStorageKey } from "@context/constants"
import { activeBoardTypesAtom, difficultyAtom } from "@context/game"
import { BoardType } from "@context/types"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { reactLocalStorage } from "reactjs-localstorage"

export const useLocalStorageSettings = () => {
  const [, setDifficulty] = useAtom(difficultyAtom)
  const [, setActiveBoardTypes] = useAtom(activeBoardTypesAtom)

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const minDifficulty = reactLocalStorage.get(LocalStorageKey.MIN_DIFFICULTY, 10, true)
    const maxDifficulty = reactLocalStorage.get(LocalStorageKey.MAX_DIFFICULTY, 20, true)
    setDifficulty({ min: minDifficulty, max: maxDifficulty })

    const normalBoardActive =
      (reactLocalStorage.get(LocalStorageKey.NORMAL_BOARD_ACTIVE, "true", true) as string) === "true"
    const oneWallBoardActive =
      (reactLocalStorage.get(LocalStorageKey.ONE_WALL_BOARD_ACTIVE, "false", true) as string) === "true"
    const twoWallsBoardActive =
      (reactLocalStorage.get(LocalStorageKey.TWO_WALLS_BOARD_ACTIVE, "false", true) as string) === "true"
    setActiveBoardTypes({
      [BoardType.NORMAL]: normalBoardActive,
      [BoardType.ONE_WALL]: oneWallBoardActive,
      [BoardType.TWO_WALLS]: twoWallsBoardActive,
    })

    setLoaded(true)
  }, [setActiveBoardTypes, setDifficulty])

  return loaded
}
