import React from "react"
import type { FC } from "react"

// style
import styles from "~/components/reusable/buttonStyle.css"

export const links = () => [{ rel: "stylesheet", href: styles }]

type ButtonLinkProps = {
  to: string
} & Omit<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
  "href"
>

const Fancy: FC<ButtonLinkProps> = ({
  to,
  children,
  ...props
}): JSX.Element => {
  return (
    <a href={to} {...props} data-fancy>
      <span>{children}</span>
    </a>
  )
}

export default Fancy
