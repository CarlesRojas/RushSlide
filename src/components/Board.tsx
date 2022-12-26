import { activeBoardTypesAtom, difficultyAtom } from "@context/game"
import { BoardState } from "@context/types"
import { getBoardStateFromLevel } from "@utils/boardTransformations"
import { getLevel } from "@utils/getLevel"
import { useAtom } from "jotai"
import { useCallback, useEffect, useRef, useState } from "react"

const Board = () => {
  const [difficulty] = useAtom(difficultyAtom)
  const [activeBoardTypes] = useAtom(activeBoardTypesAtom)

  const history = useRef<BoardState[]>([])
  const [currentLevel, setCurrentLevel] = useState<string | null>(null)

  const setLevel = useCallback(async () => {
    const level = await getLevel(activeBoardTypes, difficulty)
    setCurrentLevel(level ?? null)
  }, [activeBoardTypes, difficulty])

  useEffect(() => {
    setLevel()
  }, [setLevel])

  useEffect(() => {
    if (currentLevel) history.current = [getBoardStateFromLevel(currentLevel)]
  }, [currentLevel])

  return <div></div>
}

export default Board
