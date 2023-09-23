import type { FC } from "react"
import { useNavigate } from "@remix-run/react"

// styles
import styles from "./styles.css"

export const links = () => [{ rel: "stylesheet", href: styles }]

interface PaginationProps {
  total: number
  perPage: number
  current: number
  tag?: string | null
}

const Pagination: FC<PaginationProps> = ({
  total,
  perPage,
  current,
  tag,
}): JSX.Element => {
  const navigate = useNavigate()
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
    const tagQuery = tag ? `?tag=${tag}` : ""
    const path = num === 1 ? `./${tagQuery}` : `./${tagQuery}&p=${num}`
    navigate(path)
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
