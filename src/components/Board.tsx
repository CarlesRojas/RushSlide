import { activeBoardTypesAtom, difficultyAtom } from "@context/game"
import { BoardState } from "@context/types"
import { getLevel } from "@utils/getLevel"
import { useAtom } from "jotai"
import { useCallback, useEffect, useRef, useState } from "react"

const Board = () => {
  const [difficulty] = useAtom(difficultyAtom)
  const [activeBoardTypes] = useAtom(activeBoardTypesAtom)

  const history = useRef<BoardState>([])
  const [currentLevel, setCurrentLevel] = useState<string | null>(null)

  const setLevel = useCallback(async () => {
    const level = await getLevel(activeBoardTypes, difficulty)
    console.log("CHANGE")
    setCurrentLevel(level ?? null)
  }, [activeBoardTypes, difficulty])

  useEffect(() => {
    setLevel()
  }, [setLevel])

  console.log(currentLevel)

  return <div></div>
}

export default Board
