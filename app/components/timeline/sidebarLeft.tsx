import type { FC } from "react"
import { Link } from "@remix-run/react"

// assets
import face from "~/images/face.webp"

const SidebarLeft: FC = (): JSX.Element => {
  return (
    <Link to="/taka7beckham" className="flex-shrink-0">
      <figure className="overflow-hidden rounded-full">
        <img src={face} alt="face photo" width={46} height={46} />
      </figure>
    </Link>
  )
}

export default SidebarLeft
