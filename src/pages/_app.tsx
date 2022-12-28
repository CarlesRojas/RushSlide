import { EventsProvider } from "@context/events"
import type { AppType } from "next/dist/shared/lib/utils"
import Head from "next/head"
import { useEffect } from "react"
import "../styles/globals.css"

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development" && "serviceWorker" in navigator)
      window.addEventListener("load", () => navigator.serviceWorker.register("/sw.mjs"))
  })

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover" />
        <title>{"Rush Slide"}</title>
      </Head>

      <EventsProvider>
        <Component {...pageProps} />
      </EventsProvider>
    </>
  )
}

export default MyApp
