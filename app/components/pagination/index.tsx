import { Dispatch, SetStateAction } from "react"
import type { FC } from "react"

// styles
import styles from "./styles.css"

export const links = () => [{ rel: "stylesheet", href: styles }]

interface PaginationProps {
  total: number
  perPage: number
  current: number
  setCurrent: Dispatch<SetStateAction<number>>
}

const Pagination: FC<PaginationProps> = ({
  total,
  perPage,
  current,
  setCurrent,
}): JSX.Element => {
  const totalPages = Math.ceil(total / perPage)

  const pageNumbers = [...Array(totalPages)].map((_, i) => {
    return (
      <li
        key={i}
        className={i + 1 == current ? `current` : ``}
        onClick={() => handleClick(i + 1)}
      >
        <p>{i + 1}</p>
      </li>
    )
  })

  const handleClick = (num: number) => {
    setCurrent(num)
    if (typeof document !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  if (pageNumbers.length < 2) {
    return <></>
  }

  return (
    <section data-pagination>
      <p className="pre" onClick={() => handleClick(current - 1)}>
        &lt;
      </p>
      <ul className="number">{pageNumbers}</ul>
      <p className="next" onClick={() => handleClick(current + 1)}>
        &gt;
      </p>
    </section>
  )
}

export default Pagination
