import { cellSizeAtom } from "@context/game"
import { Wall } from "@context/types"
import { useAtom } from "jotai"

interface Props {
  wall: Wall
}

const Wall = ({ wall }: Props) => {
  const [cellSize] = useAtom(cellSizeAtom)
  const { position } = wall

  return (
    <div
      className="pointer-events-none absolute z-10"
      style={{
        top: position.row * cellSize,
        left: position.column * cellSize,
        width: cellSize,
        height: cellSize,
        padding: cellSize * 0.075,
      }}
    >
      <div
        className="relative h-full w-full rounded-md bg-neutral-500 dark:bg-neutral-400 lg:rounded-lg xl:rounded-xl"
        style={{ boxShadow: "inset 0 0 1rem 0 rgba(0, 0, 0, 0.15)" }}
      />
    </div>
  )
}

export default Wall
