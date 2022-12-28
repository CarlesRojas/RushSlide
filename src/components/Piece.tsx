import { cellSizeAtom, movingPieceAtom, victoryAtom } from "@context/game"
import { BoardState, Piece } from "@context/types"
import { movePiece } from "@utils/movePiece"
import { motion, PanInfo, useAnimation } from "framer-motion"
import { useAtom } from "jotai"
import { useRef } from "react"
import { HiArrowRight, HiCheck } from "react-icons/hi"

type PanEvent = MouseEvent | TouchEvent | PointerEvent

interface Props {
  piece: Piece
  boardState: BoardState
  updateBoard: (boardState: BoardState) => void
}

const Piece = ({ piece, boardState, updateBoard }: Props) => {
  const [cellSize] = useAtom(cellSizeAtom)
  const [movingPiece, setMovingPiece] = useAtom(movingPieceAtom)
  const [{ victory }] = useAtom(victoryAtom)

  const moving = useRef(false)
  const displacement = useRef(0)

  const { position, horizontal, length, movement, red } = piece
  const { backwards, forwards } = movement

  const onAnimationComplete = () => {
    moving.current = false

    if (displacement.current === 0) {
      setMovingPiece(false)
      return
    }

    const newBoardState = movePiece(boardState, piece, displacement.current)
    updateBoard(newBoardState)
  }

  const pieceMovement = useAnimation()

  const onPanStart = () => {
    if (movingPiece) return

    moving.current = true
    setMovingPiece(true)
  }

  const onPan = (_: PanEvent, info: PanInfo) => {
    if (!moving.current) return

    const offset = horizontal ? info.offset.x : info.offset.y
    const clamped = Math.max(Math.min(offset, forwards * cellSize), -backwards * cellSize)
    horizontal ? pieceMovement.set({ x: clamped }) : pieceMovement.set({ y: clamped })
  }

  const onPanEnd = (_: PanEvent, info: PanInfo) => {
    if (!moving.current) return

    const offset = horizontal ? info.offset.x : info.offset.y
    const clamped = Math.max(Math.min(offset, forwards * cellSize), -backwards * cellSize)
    const rounded = Math.round(clamped / cellSize)
    horizontal
      ? pieceMovement.start({ x: rounded * cellSize, transition: { bounce: 0, duration: 0.1 } })
      : pieceMovement.start({ y: rounded * cellSize, transition: { bounce: 0, duration: 0.1 } })

    displacement.current = rounded
  }

  return (
    <motion.div
      className={`absolute z-10 touch-none ${horizontal ? "mouse:cursor-ew-resize" : "mouse:cursor-ns-resize"}`}
      style={{
        top: position.row * cellSize,
        left: position.column * cellSize,
        width: cellSize * (horizontal ? length : 1),
        height: cellSize * (horizontal ? 1 : length),
        padding: cellSize * 0.075,
      }}
      onPanStart={onPanStart}
      onPan={onPan}
      onPanEnd={onPanEnd}
      onAnimationComplete={onAnimationComplete}
      animate={pieceMovement}
    >
      <div
        className={`pointer-events-none relative grid h-full w-full grid-cols-2 rounded-md selection:items-center lg:rounded-lg xl:rounded-xl ${
          red ? "bg-red-500" : "bg-blue-500"
        }`}
        style={{ boxShadow: "inset 0 0 1rem 0 rgba(0, 0, 0, 0.15)" }}
      >
        <div />
        {red && !victory && <HiArrowRight className="h-full w-full p-[20%] text-red-700" />}
        {red && victory && <HiCheck className="h-full w-full p-[20%] text-red-700" />}
      </div>
    </motion.div>
  )
}

export default Piece
