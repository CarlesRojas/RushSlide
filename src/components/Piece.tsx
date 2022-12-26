import { cellSizeAtom } from "@context/game"
import { Piece } from "@context/types"
import { useAtom } from "jotai"
import { HiArrowRight } from "react-icons/hi"

interface Props {
  piece: Piece
}

const Piece = ({ piece }: Props) => {
  const [cellSize] = useAtom(cellSizeAtom)
  const { position, horizontal, length, movement, red } = piece

  return (
    <div
      className="absolute z-10"
      style={{
        top: position.row * cellSize,
        left: position.column * cellSize,
        width: cellSize * (horizontal ? length : 1),
        height: cellSize * (horizontal ? 1 : length),
        padding: cellSize * 0.075,
      }}
    >
      <div
        className={`relative grid h-full w-full grid-cols-2 rounded-md selection:items-center lg:rounded-lg xl:rounded-xl ${
          red ? "bg-red-500" : "bg-blue-500"
        }`}
      >
        <div />
        {red && <HiArrowRight className="h-full w-full p-[20%] text-red-700" />}
      </div>
    </div>
  )
}

export default Piece
