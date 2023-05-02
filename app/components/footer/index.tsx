import React from "react"
import type { FC } from "react"

// icons
import { BsFacebook } from "react-icons/bs"
import { BsTwitter } from "react-icons/bs"
import { BsLinkedin } from "react-icons/bs"
import { BsGithub } from "react-icons/bs"

// style
import styles from "./styles.css"

export const links = () => [
  { rel: "stylesheet", href: styles },
]

const Footer: FC = (): JSX.Element => {
  const year = new Date().getFullYear()

  return (
    <footer data-site-footer className="grid">
      <p className="text-center">Takayasu Nasu {year}. All rights reserved.</p>

      <ul className="social-media grid w-1/2 lg:w-1/3">
        <li>
          <a href="https://www.facebook.com/takayasu.nasu.1" target="_blank" rel="noopener noreferrer">
            <BsFacebook />
          </a>
        </li>

        <li>
          <a href="https://twitter.com/taka7beckham" target="_blank" rel="noopener noreferrer">
            <BsTwitter />
          </a>
        </li>

        <li>
          <a href="https://www.linkedin.com/in/takayasu-nasu-b8054413b/" target="_blank" rel="noopener noreferrer">
            <BsLinkedin />
          </a>
        </li>

        <li>
          <a href="https://github.com/TakayasuNasu" target="_blank" rel="noopener noreferrer">
            <BsGithub />
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
