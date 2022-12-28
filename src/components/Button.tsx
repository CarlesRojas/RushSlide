interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element
  text: string
  primary?: boolean
}

const Button = ({ icon, text, primary, ...rest }: Props) => {
  return (
    <button
      className={`${
        primary
          ? "flex-row gap-2 bg-red-500 text-white mouse:hover:bg-red-600"
          : "flex-col gap-1 bg-neutral-200 dark:bg-neutral-800 mouse:hover:bg-neutral-300 mouse:hover:dark:bg-neutral-700"
      } group flex w-full items-center justify-center  rounded-md py-3 lg:rounded-lg xl:rounded-xl`}
      {...rest}
    >
      <i className={`${primary ? "h-8 w-8" : "h-6 w-6"}`}>{icon}</i>
      <p className={`${primary ? "pr-2 text-lg" : "text-sm"} font-semibold`}>{text}</p>
    </button>
  )
}

export default Button
