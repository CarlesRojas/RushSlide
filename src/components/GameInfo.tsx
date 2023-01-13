import Button from "@components/Button"
import { Route } from "@context/constants"
import { Event, useEvents } from "@context/events"
import { movesAtom, victoryAtom } from "@context/game"
import { useAtom } from "jotai"
import { RiAddFill, RiDeleteBackLine, RiHomeLine, RiRestartLine } from "react-icons/ri"
import Anchor from "./Anchor"

const GameInfo = () => {
  const [{ moves, minimumMoves }] = useAtom(movesAtom)
  const [{ victory, perfect }] = useAtom(victoryAtom)
  const { emit } = useEvents()

  return (
    <div className="flex h-full w-full grow flex-col gap-3 overflow-hidden">
      <section className="relative grid w-full max-w-[30rem] grid-cols-4 gap-3 landscape:grid-cols-2 md:landscape:grid-cols-4">
        <Anchor route={Route.HOME} text={"Home"} icon={<RiHomeLine />} />
        <Button text={"New"} icon={<RiAddFill />} onClick={() => emit(Event.RANDOM)} />
        <Button text={"Restart"} icon={<RiRestartLine />} disabled={moves <= 0} onClick={() => emit(Event.RESTART)} />
        <Button text={"Undo"} icon={<RiDeleteBackLine />} disabled={moves <= 0} onClick={() => emit(Event.UNDO_MOVE)} />
      </section>

      <div className="flex w-full grow flex-col overflow-hidden">
        <section className="relative flex items-baseline gap-2">
          <p>Moves:</p>
          <h2 className="text-4xl font-bold">{moves}</h2>
          <p>{`/ ${minimumMoves}`}</p>
        </section>

        {victory && (
          <section className="relative flex grow flex-col justify-center gap-2">
            <h2 className="text-2xl font-semibold text-blue-500 md:text-4xl">
              {perfect ? "Victory! Perfect Game" : "Victory!"}
            </h2>
            <Button text={"New level"} icon={<RiAddFill />} onClick={() => emit(Event.RANDOM)} primary blue />
          </section>
        )}

        {!victory && minimumMoves > 0 && minimumMoves < 3 && (
          <section className="relative flex grow flex-col justify-center gap-2">
            <h2 className="text-2xl font-semibold text-blue-500">How to play:</h2>
            <p className="font-semibold md:text-lg">
              Make way for the red piece to escape to the right by moving the blue pieces out of the way
            </p>
          </section>
        )}
      </div>
    </div>
  )
}

export default GameInfo
