import React from "react"
import type { FC } from "react"
import { useNavigate } from "@remix-run/react"
import { HiOutlineArrowLeft } from "react-icons/hi"
import { Theme, useTheme } from "~/utils/theme-provider"

// context
import { useAppContext } from "~/context/store"

// assets
import face from "~/images/face.png"

// style
import styles from "./styles.css"

export const links = () => [{ rel: "stylesheet", href: styles }]

const Header: FC = (): JSX.Element => {
  const { toggle } = useAppContext()

  const navigate = useNavigate()

  return (
    <header data-header>
      <ul className="mobile">
        <li className="face" onClick={toggle}>
          <img src={face} alt="face" />
        </li>

        <li className="switcher">
          <Skewed id="toggle-theme-mobile" labelOn="Light" labelOff="Dark" />
        </li>
      </ul>

      <ul className="desktop">
        <li onClick={() => navigate(-1)} className="back-arrow">
          <HiOutlineArrowLeft />
        </li>
        <li>
          <Skewed id="toggle-theme" labelOn="Light" labelOff="Dark" />
        </li>
      </ul>
    </header>
  )
}

export default Header

type ComponentProps = {
  labelOn: string
  labelOff: string
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Skewed = React.forwardRef<HTMLInputElement, ComponentProps>(
  ({ id, labelOn, labelOff }, ref): JSX.Element => {
    const [theme, setTheme] = useTheme()

    const toggleTheme = () => {
      setTheme((prevTheme) =>
        prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
      )
    }

    const checkd = theme == Theme.LIGHT

    return (
      <>
        <input
          type="checkbox"
          id={id}
          ref={ref}
          checked={checkd}
          onChange={toggleTheme}
        />
        <label
          htmlFor={id}
          data-label-on={labelOn}
          data-label-off={labelOff}
        ></label>
      </>
    )
  }
)
Skewed.displayName = "Skewed"
