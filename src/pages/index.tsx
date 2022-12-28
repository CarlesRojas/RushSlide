import Anchor from "@components/Anchor"
import BoardTypeSelector from "@components/BoardTypeSelector"
import Difficulty from "@components/Difficulty"
import { Route } from "@context/constants"
import type { NextPage } from "next"
import Image from "next/future/image"
import { RiPlayLine } from "react-icons/ri"

const Home: NextPage = () => {
  return (
    <main className="relative m-auto flex h-full w-full max-w-xl flex-col items-center justify-center gap-24 overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-6">
        <Image src={"/logo.png"} alt="rush slide logo" width={80} height={80} />
        <h1 className="text-6xl font-medium opacity-90">RUSH SLIDE</h1>
      </div>

      <div className="flex w-full flex-col gap-8 overflow-hidden">
        <BoardTypeSelector />
        <Difficulty />
      </div>

      <div className="h-fit w-fit min-w-[10rem]">
        <Anchor route={Route.GAME} icon={<RiPlayLine />} text="Play" primary />
      </div>
    </main>
  )
}

export default Home
