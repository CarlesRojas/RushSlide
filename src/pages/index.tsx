import Button from "@components/Button"
import type { NextPage } from "next"
import Image from "next/future/image"
import Link from "next/link"
import { RiPlayLine } from "react-icons/ri"

const Home: NextPage = () => {
  return (
    <main className="relative m-auto flex h-full w-full max-w-xl flex-col items-center justify-center gap-8">
      <Image src={"/logo.png"} alt="rush slide logo" width={96} height={96} />
      <h1 className="text-5xl font-bold">Rush Slide</h1>

      <div className="h-16 w-full" />

      <div className="h-fit w-fit min-w-[10rem]">
        <Link href={"/game"}>
          <Button icon={<RiPlayLine />} text="Play" primary />
        </Link>
      </div>
    </main>
  )
}

export default Home
