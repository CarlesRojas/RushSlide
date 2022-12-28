import { Route } from "@context/constants"
import Link from "next/link"

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  icon: JSX.Element
  text: string
  primary?: boolean
  route: Route
}

const Anchor = ({ icon, text, primary, route, ...rest }: Props) => {
  return (
    <Link href={route}>
      <a
        className={`${
          primary
            ? "flex-row gap-2 bg-red-500 text-white mouse:hover:bg-red-600"
            : "flex-col gap-1 bg-neutral-200 dark:bg-neutral-800 mouse:hover:bg-neutral-300 mouse:hover:dark:bg-neutral-700"
        } group flex w-full items-center justify-center  rounded-md py-3 lg:rounded-lg xl:rounded-xl `}
        {...rest}
      >
        <i className={`${primary ? "h-8 w-8" : "h-6 w-6"}`}>{icon}</i>
        <p className={`${primary ? "pr-2 text-lg" : "text-sm"} font-semibold`}>{text}</p>
      </a>
    </Link>
  )
}

export default Anchor
