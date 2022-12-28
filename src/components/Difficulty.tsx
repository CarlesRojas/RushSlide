import { LocalStorageKey, MAX_DIFFICULTY, MIN_DIFFICULTY } from "@context/constants"
import { difficultyAtom } from "@context/game"
import { motion, PanInfo, useAnimation } from "framer-motion"
import { useAtom } from "jotai"
import { useRef } from "react"
import { reactLocalStorage } from "reactjs-localstorage"

type PanEvent = MouseEvent | TouchEvent | PointerEvent

const Difficulty = () => {
  const [difficulty, setDifficulty] = useAtom(difficultyAtom)
  const { min, max } = difficulty

  const leftMovement = useAnimation()
  const rightMovement = useAnimation()
  const barMovement = useAnimation()

  const barRef = useRef<HTMLDivElement>(null)

  const left = useRef(((min - MIN_DIFFICULTY) / (MAX_DIFFICULTY - MIN_DIFFICULTY)) * 100)
  const right = useRef(((max - MIN_DIFFICULTY) / (MAX_DIFFICULTY - MIN_DIFFICULTY)) * 100)

  const movingLeft = useRef(false)
  const movingRight = useRef(false)

  const lastPercentage = useRef(0)

  const onLeftPanStart = () => {
    if (movingRight.current) return
    movingLeft.current = true
  }

  const onRightPanStart = () => {
    if (movingLeft.current) return
    movingRight.current = true
  }

  const onLeftPan = (_: PanEvent, info: PanInfo) => {
    if (!movingLeft.current) return
    const width = barRef.current?.clientWidth
    if (!width) return

    const leftPixels = (left.current / 100) * width
    const rightPixels = (right.current / 100) * width

    const totalOffset = leftPixels + info.offset.x
    const clamped = Math.max(Math.min(totalOffset, rightPixels), 0)

    lastPercentage.current = (clamped / width) * 100
    const newMinDifficulty = Math.round(
      (lastPercentage.current / 100) * (MAX_DIFFICULTY - MIN_DIFFICULTY) + MIN_DIFFICULTY,
    )

    reactLocalStorage.set(LocalStorageKey.MIN_DIFFICULTY, newMinDifficulty)
    setDifficulty((prev) => ({ ...prev, min: newMinDifficulty }))
    leftMovement.set({ left: `${lastPercentage.current}%` })
    barMovement.set({ marginLeft: `${lastPercentage.current}%`, width: `${right.current - lastPercentage.current}%` })
  }

  const onRightPan = (_: PanEvent, info: PanInfo) => {
    if (!movingRight.current) return
    const width = barRef.current?.clientWidth
    if (!width) return

    const leftPixels = (left.current / 100) * width
    const rightPixels = (right.current / 100) * width

    const totalOffset = rightPixels + info.offset.x
    const clamped = Math.max(Math.min(totalOffset, width), leftPixels)

    lastPercentage.current = (clamped / width) * 100
    const newMaxDifficulty = Math.round(
      (lastPercentage.current / 100) * (MAX_DIFFICULTY - MIN_DIFFICULTY) + MIN_DIFFICULTY,
    )
    reactLocalStorage.set(LocalStorageKey.MAX_DIFFICULTY, newMaxDifficulty)
    setDifficulty((prev) => ({ ...prev, max: newMaxDifficulty }))
    rightMovement.set({ left: `${lastPercentage.current}%` })
    barMovement.set({ marginLeft: `${left.current}%`, width: `${lastPercentage.current - left.current}%` })
  }

  const onLeftPanEnd = () => {
    if (!movingLeft.current) return

    movingLeft.current = false
    left.current = lastPercentage.current
  }

  const onRightPanEnd = () => {
    if (!movingRight.current) return

    movingRight.current = false
    right.current = lastPercentage.current
  }

  return (
    <div className="relative flex w-full flex-col gap-2  px-14">
      <div className="relative flex w-full items-baseline justify-center gap-2">
        <p>{"Minimum moves:"}</p>
        <h2 className="whitespace-nowrap text-2xl font-semibold">{`${min} - ${max}`}</h2>
      </div>

      <div className="h-5 w-full overflow-hidden rounded-[100vw] bg-neutral-200 dark:bg-neutral-800" ref={barRef}>
        <motion.div
          className="h-full min-w-[2px] bg-blue-500"
          initial={{ marginLeft: `${left.current}%`, width: `${right.current - left.current}%` }}
          animate={barMovement}
        />
      </div>

      <div className="relative h-11 w-full">
        <motion.div
          className="absolute left-0 aspect-square h-full -translate-x-full cursor-ew-resize touch-none rounded-[100vw] rounded-tr-none border-2 border-solid border-neutral-50 bg-blue-500 dark:border-neutral-900 mouse:hover:bg-blue-600"
          onPanStart={onLeftPanStart}
          onPan={onLeftPan}
          onPanEnd={onLeftPanEnd}
          initial={{ left: `${left.current}%` }}
          animate={leftMovement}
        />

        <motion.div
          className="absolute left-0 aspect-square h-full cursor-ew-resize touch-none rounded-[100vw] rounded-tl-none border-2 border-solid border-neutral-50 bg-blue-500 dark:border-neutral-900 mouse:hover:bg-blue-600"
          onPanStart={onRightPanStart}
          onPan={onRightPan}
          onPanEnd={onRightPanEnd}
          initial={{ left: `${right.current}%` }}
          animate={rightMovement}
        />
      </div>
    </div>
  )
}

export default Difficulty
