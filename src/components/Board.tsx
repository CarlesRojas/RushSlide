import Piece from "@components/Piece"
import Wall from "@components/Wall"
import { activeBoardTypesAtom, difficultyAtom, movingPieceAtom } from "@context/game"
import { BoardState } from "@context/types"
import { getBoardStateFromLevel } from "@utils/boardTransformations"
import { getLevel } from "@utils/getLevel"
import { useAtom } from "jotai"
import { useCallback, useEffect, useRef, useState } from "react"
import Cell from "./Cell"

const Board = () => {
  const [difficulty] = useAtom(difficultyAtom)
  const [activeBoardTypes] = useAtom(activeBoardTypesAtom)
  const [, setMovingPiece] = useAtom(movingPieceAtom)

  const history = useRef<BoardState[]>([])
  const [currentLevel, setCurrentLevel] = useState<string | null>(null)

  const initLevel = useCallback(async () => {
    const level = await getLevel(activeBoardTypes, difficulty)
    if (!level) return
    history.current = [getBoardStateFromLevel(level)]
    setCurrentLevel(level)
  }, [activeBoardTypes, difficulty])

  useEffect(() => {
    initLevel()
  }, [initLevel])

  const currentBoard = history.current[history.current.length - 1]

  const updateBoard = (boardState: BoardState) => {
    history.current.push(boardState)
    setCurrentLevel(boardState.board)
  }

  useEffect(() => {
    setMovingPiece(false)
  }, [currentLevel, setMovingPiece])

  return (
    <div className="relative h-full w-full touch-none">
      {currentBoard && currentBoard.walls.map((wall, i) => <Wall key={i} wall={wall} />)}

      {currentBoard &&
        currentBoard.pieces.map((piece) => (
          <Piece key={piece.id} piece={piece} boardState={currentBoard} updateBoard={updateBoard} />
        ))}

      {Array.from({ length: 6 }, (_, row) =>
        Array.from({ length: 6 }, (_, column) => <Cell key={`${row}-${column}`} position={{ row, column }} />),
      )}
    </div>
  )
}

export default Board
