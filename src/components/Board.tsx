import { BOARD_TYPE_FOLDER, POSSIBLE_MOVES } from "@context/constants"
import { activeBoardTypesAtom, difficultyAtom } from "@context/game"
import { BoardState, BoardType } from "@context/types"
import { useAtom } from "jotai"
import { useCallback, useEffect, useRef, useState } from "react"

const Board = () => {
  const [difficulty] = useAtom(difficultyAtom)
  const [activeBoardTypes] = useAtom(activeBoardTypesAtom)

  const history = useRef<BoardState>([])
  const [currentLevel, setCurrentLevel] = useState<string | null>(null)

  const setNewLevel = useCallback(async () => {
    const boardTypes = []

    if (activeBoardTypes[BoardType.NORMAL]) boardTypes.push(BoardType.NORMAL)
    if (activeBoardTypes[BoardType.ONE_WALL]) boardTypes.push(BoardType.ONE_WALL)
    if (activeBoardTypes[BoardType.TWO_WALLS]) boardTypes.push(BoardType.TWO_WALLS)

    const randomBoardType = boardTypes[Math.floor(Math.random() * boardTypes.length)] ?? BoardType.NORMAL
    const possibleMoves = POSSIBLE_MOVES[randomBoardType]
    const difficultyMoves = Array.from({ length: difficulty.max - difficulty.min + 1 }, (_, i) => i + difficulty.min)

    const finalMoves = possibleMoves.filter((value) => difficultyMoves.includes(value))
    const randomMove = finalMoves[Math.floor(Math.random() * finalMoves.length)]

    const levels = (await import(`@assets/boards/${BOARD_TYPE_FOLDER[randomBoardType]}/${randomMove}.json`)) as string[]
    const randomLevel = levels[Math.floor(Math.random() * levels.length)]

    setCurrentLevel(randomLevel ?? null)
  }, [activeBoardTypes, difficulty.max, difficulty.min])

  useEffect(() => {
    setNewLevel()
  }, [setNewLevel])

  return <div></div>
}

export default Board
