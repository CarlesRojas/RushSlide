import { BOARD_TYPE_FOLDER, POSSIBLE_MOVES } from "@context/constants"
import { ActiveBoardTypes, BoardType, MinMax } from "@context/types"

export const getLevel = async (activeBoardTypes: ActiveBoardTypes, difficulty: MinMax) => {
  const boardTypes = []

  if (activeBoardTypes[BoardType.NORMAL]) boardTypes.push(BoardType.NORMAL)
  if (activeBoardTypes[BoardType.ONE_WALL]) boardTypes.push(BoardType.ONE_WALL)
  if (activeBoardTypes[BoardType.TWO_WALLS]) boardTypes.push(BoardType.TWO_WALLS)

  const randomBoardType = boardTypes[Math.floor(Math.random() * boardTypes.length)] ?? BoardType.NORMAL
  const possibleMoves = POSSIBLE_MOVES[randomBoardType]
  const difficultyMoves = Array.from({ length: difficulty.max - difficulty.min + 1 }, (_, i) => i + difficulty.min)

  const finalMoves = possibleMoves.filter((value) => difficultyMoves.includes(value))
  const randomMove = finalMoves[Math.floor(Math.random() * finalMoves.length)]
  if (!randomMove) throw new Error("No level found")

  const levels = (await import(`@assets/boards/${BOARD_TYPE_FOLDER[randomBoardType]}/${randomMove}.json`)) as string[]
  const randomLevel = levels[Math.floor(Math.random() * levels.length)]
  if (!randomLevel) throw new Error("No level found")

  return { level: randomLevel, minimumMoves: randomMove }
}
