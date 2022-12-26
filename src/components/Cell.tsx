import { cellSizeAtom } from "@context/game"
import { useAtom } from "jotai"

interface Props {
  position: { column: number; row: number }
}

const Cell = ({ position }: Props) => {
  const [cellSize] = useAtom(cellSizeAtom)

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        top: position.row * cellSize,
        left: position.column * cellSize,
        width: cellSize,
        height: cellSize,
        padding: cellSize * 0.075,
      }}
    >
      <div className="relative h-full w-full rounded-md bg-neutral-800 lg:rounded-lg xl:rounded-xl" />
    </div>
  )
}

export default Cell
