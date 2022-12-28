import Piece from "@components/Piece"
import Wall from "@components/Wall"
import { LocalStorageKey } from "@context/constants"
import { Event, useEvents } from "@context/events"
import { activeBoardTypesAtom, difficultyAtom, movesAtom, movingPieceAtom, victoryAtom } from "@context/game"
import { BoardState } from "@context/types"
import { getBoardStateFromLevel } from "@utils/boardTransformations"
import { getLevel } from "@utils/getLevel"
import { isVictory } from "@utils/isVictory"
import { useAtom } from "jotai"
import { useCallback, useEffect, useRef, useState } from "react"
import { reactLocalStorage } from "reactjs-localstorage"
import Cell from "./Cell"

const Board = () => {
  const { sub, unsub } = useEvents()

  const [difficulty] = useAtom(difficultyAtom)
  const [activeBoardTypes] = useAtom(activeBoardTypesAtom)
  const [, setMovingPiece] = useAtom(movingPieceAtom)
  const [, setMoves] = useAtom(movesAtom)
  const [, setVictory] = useAtom(victoryAtom)

  const history = useRef<BoardState[]>([])
  const [currentLevel, setCurrentLevel] = useState<string | null>(null)

  const updateBoard = useCallback(
    (boardState: BoardState) => {
      history.current.push(boardState)
      setCurrentLevel(boardState.board)
      setMoves((prev) => ({ ...prev, moves: history.current.length - 1 }))

      const victoryResult = isVictory(boardState, history.current.length - 1)
      setVictory(victoryResult)
    },
    [setMoves, setVictory],
  )
  const handleUndoClicked = useCallback(() => {
    if (history.current.length > 1) {
      const newCurrentBoard = history.current[history.current.length - 2]
      if (!newCurrentBoard) return

      history.current.pop()
      setCurrentLevel(newCurrentBoard.board)
      setMoves((prev) => ({ ...prev, moves: history.current.length - 1 }))

      const victoryResult = isVictory(newCurrentBoard, history.current.length - 1)
      setVictory(victoryResult)
    }
  }, [setMoves, setVictory])

  const initLevel = useCallback(async () => {
    const firstLevelDone = (reactLocalStorage.get(LocalStorageKey.FIRST_LEVEL_DONE, "false", true) as string) === "true"
    if (!firstLevelDone) reactLocalStorage.set(LocalStorageKey.FIRST_LEVEL_DONE, "true")

    const { level, minimumMoves } = await getLevel(activeBoardTypes, difficulty, !firstLevelDone)

    history.current = []
    setMoves((prev) => ({ ...prev, minimumMoves }))
    updateBoard(getBoardStateFromLevel(level, minimumMoves))
  }, [activeBoardTypes, difficulty, setMoves, updateBoard])

  useEffect(() => {
    initLevel()
  }, [initLevel, setMoves])

  useEffect(() => {
    setMovingPiece(false)
  }, [currentLevel, setMovingPiece])

  useEffect(() => {
    sub(Event.UNDO_MOVE, handleUndoClicked)

    return () => {
      unsub(Event.UNDO_MOVE, handleUndoClicked)
    }
  }, [handleUndoClicked, sub, unsub])

  const currentBoard = history.current[history.current.length - 1]

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
