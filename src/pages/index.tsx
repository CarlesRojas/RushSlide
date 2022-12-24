import { GRID_SIZE } from "@context/constants"
import { cellSizeAtom } from "@context/game"
import useResize from "@hooks/useResize"
import { useAtom } from "jotai"
import type { NextPage } from "next"

const Home: NextPage = () => {
  const [cellSize, setCellSize] = useAtom(cellSizeAtom)

  useResize(() => {
    setCellSize(window.innerWidth / GRID_SIZE)
  }, true)

  console.log(cellSize)

  return (
    <main className="relative grid h-full w-full grid-cols-portrait grid-rows-portrait grid-areas-portrait landscape:grid-cols-landscape landscape:grid-rows-landscape landscape:grid-areas-landscape">
      <header className="relative h-full w-full bg-green-800 grid-in-header"></header>

      <section className="relative h-full w-full content-center grid-in-game">
        <div className="m-auto aspect-square max-h-full max-w-full bg-red-800"></div>
      </section>

      <footer className="relative h-full w-full bg-blue-800 grid-in-footer"></footer>
    </main>
  )
}

export default Home
