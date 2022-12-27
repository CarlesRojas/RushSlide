import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content="Rush Slide" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Rush Slide" />
        <meta
          name="description"
          content="Rush Slide is a puzzle game where players must create a path for the red piece to exit a congested grid by maneuvering other pieces using logic and strategy."
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/appleIcon120.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/appleIcon180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/appleIcon152.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/appleIcon167.png" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Teko:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body className="bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
