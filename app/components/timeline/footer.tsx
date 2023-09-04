import type { FC } from "react"

// icons
import { BsFacebook } from "react-icons/bs"
import { BsTwitter } from "react-icons/bs"

const Footer: FC<{ slug: string }> = ({ slug }): JSX.Element => {
  const url = `https://weblog.i-nasu.com/taka7beckham/${slug}`

  return (
    <footer data-status-footer>
      <ul className="grid grid-cols-2 mr-auto w-1/5">
        <li>
          <a
            href={`http://www.facebook.com/share.php?u=${url}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <BsFacebook />
          </a>
        </li>

        <li>
          <a
            href={`https://twitter.com/share?url=${url}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <BsTwitter />
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
