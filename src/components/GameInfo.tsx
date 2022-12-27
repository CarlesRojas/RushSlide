import Button from "@components/Button"
import { Route } from "@context/constants"
import { movesAtom } from "@context/game"
import { useAtom } from "jotai"
import { RiDeleteBackLine, RiHomeLine, RiRestartLine, RiShuffleLine } from "react-icons/ri"
import Anchor from "./Anchor"

const GameInfo = () => {
  const [{ moves, minimumMoves }] = useAtom(movesAtom)
  return (
    <div className="flex h-full w-full grow flex-col gap-8">
      <section className="relative grid w-full max-w-sm grid-cols-4 gap-3">
        <Anchor route={Route.HOME} text={"Home"} icon={<RiHomeLine />} />
        <Button text={"Random"} icon={<RiShuffleLine />} />
        <Button text={"Restart"} icon={<RiRestartLine />} />
        <Button text={"Undo"} icon={<RiDeleteBackLine />} />
      </section>

      <section className="relative flex items-baseline gap-2">
        <p>Moves:</p>
        <h2 className="text-4xl font-bold">{moves}</h2>
        <p>{`/ ${minimumMoves}`}</p>
      </section>
    </div>
  )
}

export default GameInfo
