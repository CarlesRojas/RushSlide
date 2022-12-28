import { LocalStorageKey } from "@context/constants"
import { activeBoardTypesAtom } from "@context/game"
import { BoardType } from "@context/types"
import { useAtom } from "jotai"
import { reactLocalStorage } from "reactjs-localstorage"

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

  const getOptionLocalStorageKey = (type: BoardType) => {
    switch (type) {
      case BoardType.NORMAL:
        return LocalStorageKey.NORMAL_BOARD_ACTIVE
      case BoardType.ONE_WALL:
        return LocalStorageKey.ONE_WALL_BOARD_ACTIVE
      case BoardType.TWO_WALLS:
        return LocalStorageKey.TWO_WALLS_BOARD_ACTIVE
    }
  }

  const handleOptionClicked = (type: BoardType, active: boolean, enabled: boolean) => {
    if (!enabled) return

    reactLocalStorage.set(getOptionLocalStorageKey(type), !active)
    setActiveBoardTypes((prev) => ({ ...prev, [type]: !active }))
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
            onClick={() => handleOptionClicked(type as BoardType, active, enabled)}
          >
            <p className="font-semibold">{getOptionName(type as BoardType)}</p>
          </button>
        )
      })}
    </div>
  )
}

export default BoardTypeSelector
