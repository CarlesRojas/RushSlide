import Anchor from "@components/Anchor"
import BoardTypeSelector from "@components/BoardTypeSelector"
import Difficulty from "@components/Difficulty"
import { Route } from "@context/constants"
import { useClearGameState } from "@hooks/useClearGameState"
import { useLocalStorageSettings } from "@hooks/useLocalStorageSettings"
import type { NextPage } from "next"
import Image from "next/future/image"
import { RiPlayLine } from "react-icons/ri"

const Home: NextPage = () => {
  useClearGameState()
  const loaded = useLocalStorageSettings()
  if (!loaded) return null

  return (
    <main className="relative m-auto flex h-full w-full flex-col items-center justify-center gap-12 overflow-hidden lg:max-w-xl lg:gap-24 landscape:flex-row landscape:gap-4 landscape:lg:flex-col landscape:lg:gap-24">
      <div className="flex flex-col items-center justify-center gap-6">
        <Image src={"/logo.png"} alt="rush slide logo" width={80} height={80} />
        <h1 className="whitespace-nowrap text-6xl font-medium opacity-90 landscape:px-8 landscape:lg:px-0">
          RUSH SLIDE
        </h1>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-12 lg:gap-24">
        <div className="flex w-full flex-col gap-8 overflow-hidden">
          <BoardTypeSelector />
          <Difficulty />
        </div>

        <div className="h-fit w-fit min-w-[10rem]">
          <Anchor route={Route.GAME} icon={<RiPlayLine />} text="Play" primary />
        </div>
      </div>
    </main>
  )
}

export default Home
