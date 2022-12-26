import Board from "@components/Board"
import { GRID_SIZE } from "@context/constants"
import { cellSizeAtom } from "@context/game"
import useResize from "@hooks/useResize"
import { useAtom } from "jotai"
import type { NextPage } from "next"
import { useRef } from "react"

const Home: NextPage = () => {
  const [, setCellSize] = useAtom(cellSizeAtom)
  const boardContainer = useRef<HTMLDivElement>(null)

  useResize(() => {
    const boardContainerWidth = boardContainer.current?.clientWidth ?? 0
    setCellSize(boardContainerWidth / GRID_SIZE)
  }, true)

  return (
    <main className="relative grid h-full w-full grid-cols-portrait grid-rows-portrait grid-areas-portrait landscape:grid-cols-landscape landscape:grid-rows-landscape landscape:grid-areas-landscape">
      <header className="relative h-full w-full grid-in-header"></header>

      <section className="relative h-full w-full content-center grid-in-game">
        <div className="m-auto aspect-square max-h-full max-w-full" ref={boardContainer}>
          <Board />
        </div>
      </section>

      <footer className="relative h-full w-full grid-in-footer"></footer>
    </main>
  )
}

export default Home
