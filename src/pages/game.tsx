import Board from "@components/Board"
import GameInfo from "@components/GameInfo"
import { GRID_SIZE } from "@context/constants"
import { cellSizeAtom, landscapeAtom } from "@context/game"
import { useLocalStorageSettings } from "@hooks/useLocalStorageSettings"
import useResize from "@hooks/useResize"
import { useAtom } from "jotai"
import type { NextPage } from "next"

const Home: NextPage = () => {
  const loaded = useLocalStorageSettings()

  const [cellSize, setCellSize] = useAtom(cellSizeAtom)
  const [landscape, setLandscape] = useAtom(landscapeAtom)

  useResize(() => {
    const { width, height } = document.body.getBoundingClientRect()

    let newNumberTiles = GRID_SIZE * 2 + 1
    const shortSide = width > height ? height : width
    const longSide = width > height ? width : height

    let newTileWidth = shortSide / newNumberTiles
    const tileMaxWidth = (longSide * 0.6) / newNumberTiles

    while (newTileWidth > tileMaxWidth) {
      newNumberTiles++
      newTileWidth = shortSide / newNumberTiles
    }

    setLandscape(width > height)
    setCellSize(newTileWidth * 2)
  }, true)

  const boardWidth = cellSize * GRID_SIZE

  const infoStyle = {
    width: landscape ? "unset" : boardWidth,
    height: landscape ? boardWidth : "unset",
    marginTop: landscape ? 0 : `${cellSize * 0.5}px`,
    marginLeft: landscape ? `${cellSize * 0.5}px` : 0,
    padding: cellSize * 0.075,
  }

  const boardStyle = {
    width: boardWidth,
    height: boardWidth,
    minHeight: boardWidth,
    minWidth: boardWidth,
    marginBottom: landscape ? 0 : `${cellSize * 0.5}px`,
    marginTop: landscape ? 0 : `${cellSize * 0.5}px`,
    marginRight: landscape ? `${cellSize * 0.5}px` : 0,
    marginLeft: landscape ? `${cellSize * 0.5}px` : 0,
  }

  if (!loaded) return null

  return (
    <main className="relative flex h-full w-full flex-col items-center justify-end landscape:flex-row">
      <header className="relative grow" style={infoStyle}>
        <GameInfo />
      </header>

      <section className="relative" style={boardStyle}>
        <Board />
      </section>
    </main>
  )
}

export default Home
