import Piece from "@components/Piece"
import Wall from "@components/Wall"
import { activeBoardTypesAtom, cellSizeAtom, difficultyAtom } from "@context/game"
import { BoardState } from "@context/types"
import { getBoardStateFromLevel } from "@utils/boardTransformations"
import { getLevel } from "@utils/getLevel"
import { useAtom } from "jotai"
import { useCallback, useEffect, useRef, useState } from "react"
import Cell from "./Cell"

const Board = () => {
  const [cellSize] = useAtom(cellSizeAtom)
  const [difficulty] = useAtom(difficultyAtom)
  const [activeBoardTypes] = useAtom(activeBoardTypesAtom)

  const history = useRef<BoardState[]>([])
  const [currentLevel, setCurrentLevel] = useState<string | null>(null)

  const initLevel = useCallback(async () => {
    const level = await getLevel(activeBoardTypes, difficulty)
    if (!level) return
    history.current = [getBoardStateFromLevel(level)]
    console.log(level)
    setCurrentLevel(level)
  }, [activeBoardTypes, difficulty])

  useEffect(() => {
    initLevel()
  }, [initLevel])

  const currentBoard = history.current[history.current.length - 1]

  return (
    <div className="relative h-full w-full">
      {currentBoard && currentBoard.walls.map((wall, i) => <Wall key={i} wall={wall} />)}

      {currentBoard && currentBoard.pieces.map((piece, i) => <Piece key={i} piece={piece} />)}

      {Array.from({ length: 6 }, (_, row) =>
        Array.from({ length: 6 }, (_, column) => <Cell key={`${row}-${column}`} position={{ row, column }} />),
      )}
    </div>
  )
}

export default Board
