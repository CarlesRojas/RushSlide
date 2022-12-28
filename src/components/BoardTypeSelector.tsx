import { activeBoardTypesAtom } from "@context/game"
import { BoardType } from "@context/types"
import { useAtom } from "jotai"

const BoardTypeSelector = () => {
  const [activeBoardTypes, setActiveBoardTypes] = useAtom(activeBoardTypesAtom)

  const getOptionName = (type: BoardType) => {
    switch (type) {
      case BoardType.NORMAL:
        return "Normal"
      case BoardType.ONE_WALL:
        return "One Wall"
      case BoardType.TWO_WALLS:
        return "Two Walls"
    }
  }

  return (
    <div className="group flex w-full flex-wrap items-center justify-center gap-3">
      {Object.entries(activeBoardTypes).map(([type, active], index) => {
        const enabled = !active || Object.values(activeBoardTypes).filter((active) => active).length > 1

        return (
          <button
            key={index}
            className={`flex-row gap-2 rounded-md px-4 py-3 lg:rounded-lg xl:rounded-xl ${
              active
                ? "bg-blue-500 text-white mouse:hover:bg-blue-600"
                : "bg-neutral-200 dark:bg-neutral-800 mouse:hover:bg-neutral-300"
            } ${enabled ? "cursor-pointer" : "pointer-events-none"}`}
            onClick={() => enabled && setActiveBoardTypes((prev) => ({ ...prev, [type]: !active }))}
          >
            <p className="font-semibold">{getOptionName(type as BoardType)}</p>
          </button>
        )
      })}
    </div>
  )
}

export default BoardTypeSelector
