import Button from "@components/Button"
import { Route } from "@context/constants"
import { movesAtom, victoryAtom } from "@context/game"
import { useAtom } from "jotai"
import { RiDeleteBackLine, RiHomeLine, RiRestartLine, RiShuffleLine } from "react-icons/ri"
import Anchor from "./Anchor"

const GameInfo = () => {
  const [{ moves, minimumMoves }] = useAtom(movesAtom)
  const [{ victory, perfect }] = useAtom(victoryAtom)

  return (
    <div className="flex h-full w-full grow flex-col gap-3 overflow-hidden">
      <section className="relative grid w-full max-w-sm grid-cols-4 gap-3 landscape:grid-cols-2 md:landscape:grid-cols-4">
        <Anchor route={Route.HOME} text={"Home"} icon={<RiHomeLine />} />
        <Button text={"Random"} icon={<RiShuffleLine />} />
        <Button text={"Restart"} icon={<RiRestartLine />} />
        <Button text={"Undo"} icon={<RiDeleteBackLine />} />
      </section>

      <div className="flex w-full grow flex-col overflow-hidden">
        <section className="relative flex items-baseline gap-2">
          <p>Moves:</p>
          <h2 className="text-4xl font-bold">{moves}</h2>
          <p>{`/ ${minimumMoves}`}</p>
        </section>

        <section className="relative flex grow flex-col items-center justify-center">
          {victory && <h2 className="text-2xl font-semibold text-blue-500 md:text-4xl">Victory!</h2>}
          {perfect && <p className="font-semibold md:text-lg">Perfect Game</p>}
        </section>
      </div>
    </div>
  )
}

export default GameInfo
