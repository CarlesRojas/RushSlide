import { movesAtom, movingPieceAtom, victoryAtom } from "@context/game"
import { useAtom } from "jotai"
import { useEffect } from "react"

export const useClearGameState = () => {
  const [, setMovingPiece] = useAtom(movingPieceAtom)
  const [, setMoves] = useAtom(movesAtom)
  const [, setVictory] = useAtom(victoryAtom)

  useEffect(() => {
    setMovingPiece(false)
    setVictory({ victory: false, perfect: false })
    setMoves({ moves: 0, minimumMoves: 0 })
  }, [setMoves, setMovingPiece, setVictory])
}
